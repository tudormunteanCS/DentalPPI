import os
from datetime import datetime

from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import base64

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

model_path = "model/best.pt "

@app.route('/upload', methods=['POST'])
def uploadFileRoute():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        image = cv2.imread(file_path)
        model = YOLO(model_path)


        
        colors = {
            "low": (0, 255, 0),  # Green for low risk
            "medium": (0, 255, 255),  # Yellow for medium risk
            "high": (0, 0, 255)  # Red for high risk
        }

        curent_time = datetime.now()

        results = model(file_path)
        print("Time taken to load model: ", datetime.now() - curent_time)
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls)
                x1, y1, x2, y2 = box.xyxy[0].tolist()  # Get coordinates

                # Determine risk level based on class_id
                if class_id in [0, 1, 2, 3, 12, 13]:
                    risk_level = "low"  # Green for low risk
                elif class_id in [4, 5, 6, 10]:
                    risk_level = "medium"  # Yellow for medium risk
                else:
                    risk_level = "high"  # Red for high risk

                # Assign color based on the risk level
                color = colors[risk_level]

                # Draw the bounding box and label on the image
                cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), color, 2)
                cv2.putText(image, f"Class {class_id}", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color,2)

        output_file_path = os.path.join("output", "YOLO_" + os.path.basename(file_path))
        cv2.imwrite(output_file_path, image)

        #send image to client
        _, buffer = cv2.imencode('.jpg', image)
        encoded_image = base64.b64encode(buffer).decode('utf-8')


        return jsonify({"message": "File uploaded successfully", "image": encoded_image}), 200






if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
