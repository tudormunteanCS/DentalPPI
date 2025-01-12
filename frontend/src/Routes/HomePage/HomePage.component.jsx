import React, { Fragment, useEffect, useState } from "react";

import { uploadFile } from "../../ApiCalls/DentureCalls";

import dentureImage from "../../Assets/denture.png";
import dentureIconTop from "../../Assets/Denture Icon Top.png";
import dentureIconBottom from "../../Assets/Denture Icon Bottom.png";
import dentalTopDemo from "../../Assets/Denture top demo.png";
import dentalBottomDemo from "../../Assets/Denture bottom demo.png";
import logo from "../../Assets/logo.png";

import "./HomePage.styles.scss";
import "../../Utils/general.scss";
import { useFilesystem } from "../../useFilesystem.jsx";
import { usePreferences } from "../../usePreferences.jsx";
import { getHistory } from "../../ApiCalls/DentureCalls";

const PHOTOS = 'photos';

const HomePage = ({fileUpload, setFileUpload, historyDisplayed, setHistoryDisplayed}) => {
    const [encodedImage,setEncodedImage] = useState(null)
    const [photos, setPhotos] = useState([]);
    const [images,setImages] = useState([])
    const [loading,setLoading] = useState(false)
    const {writeFile} = useFilesystem()
    
    const handleUpload = async (e) => {
        console.log("sending file to sv")
        const file = e.target.files[0];
        console.log(file);
        const response = await uploadFile(file);
        setEncodedImage(response.image)
        setFileUpload(true);
        const filePath = new Date().getTime() + `YOLO_${file.name}`;
        await writeFile(filePath,response.image)
        const webviewPath = `data:image/jpeg;base64,${response.image}`
        const newPhoto = { filePath, webviewPath };
        
        const newPhotos = [newPhoto, ...photos];
        console.log(newPhotos)
        setPhotos(newPhotos);
    };

    const fetchImages = async () =>{
        try{
            setLoading(true)
            const response = await getHistory()
            setImages(response.files)
        }
        catch(error){
            console.log("Error: " + error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(historyDisplayed){
            fetchImages()
        }
    },[historyDisplayed])
    
 
    return (
        <div className="HomePage">
            <img src={logo} className="logo"></img>

            <label className={fileUpload ? "delete":"card upload"} for="file-upload">
                
                <div className="icon">
                    <img src={dentureIconTop} alt="denture" />
                    <img src={dentureIconBottom} alt="denture" />
                </div>
                <div className="button">
                    <p>UPLOAD</p>
                </div>
                <input type="file" id="file-upload" name="file" onChange={handleUpload}/>
            </label>
            {console.log("history: " + historyDisplayed)}
            {console.log("fileUpload: " + fileUpload)}
            {fileUpload && !historyDisplayed &&
            <div className="processed-image-container">
                <img src={`data:image/jpeg;base64,${encodedImage}`} alt="Processed" />
            </div>
            }
            {historyDisplayed && !loading &&
            <div className="images-container">
                {images.map((imageData, index) => (
                <div key={index} className="image-item">
                    <p>Name of file: {imageData.filename}</p>
                    <img src={`data:image/jpeg;base64,${imageData.image}`} alt={imageData.filename} />
                </div>
                ))}
            </div>
            }          
        </div>
    )
}

export default HomePage;

// <Fragment>
            // <div className="card dental_image top">
            //     <h2>Summary Top</h2>
            //     <div className="summary-content">
            //         <img src={dentalTopDemo} alt="" />
            //     </div>
            // </div>
            // <div className="card informations top">
            //     <h2>Informations Top</h2>
            //     <table>
            //         <tr>
            //             <th>Position</th>
            //             <th>Height</th>
            //             <th>Diameter</th>
            //         </tr>
            //         <tr>
            //             <td>5</td>
            //             <td>3</td>
            //             <td>0.8</td>
            //         </tr>
            //     </table>
            // </div>
            // <div className="card dental_image bottom">
            //     <h2>Summary Bottom</h2>
            //     <div className="summary-content">
            //         <img src={dentalBottomDemo} alt="" />
            //     </div>
            // </div>
            // <div className="card informations bottom">
            //     <h2>Informations Bottom</h2>
            //     <table>
            //         <tr>
            //             <th>Position</th>
            //             <th>Height</th>
            //             <th>Diameter</th>
            //         </tr>
            //         <tr>
            //             <td>2</td>
            //             <td>4</td>
            //             <td>1</td>
            //         </tr>
            //     </table>
            // </div>
            // </Fragment>