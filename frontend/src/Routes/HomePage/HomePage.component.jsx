import React, { Fragment, useState } from "react";

import { uploadFile } from "../../ApiCalls/DentureCalls";

import dentureImage from "../../Assets/denture.png";
import dentureIconTop from "../../Assets/Denture Icon Top.png";
import dentureIconBottom from "../../Assets/Denture Icon Bottom.png";
import dentalTopDemo from "../../Assets/Denture top demo.png";
import dentalBottomDemo from "../../Assets/Denture bottom demo.png";
import logo from "../../Assets/logo.png";

import "./HomePage.styles.scss";
import "../../Utils/general.scss";

const HomePage = () => {
    const [fileUpload, setFileUpload] = useState(false);
    const [encodedImage,setEncodedImage] = useState(null)

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        const response = await uploadFile(file);
        setEncodedImage(response.image)
        setFileUpload(true);
    };

    return (
        <div className="HomePage">
            <img src={logo} className="logo"></img>

            <label className={fileUpload ? "delete":"card upload"} for="file-upload">
                
                {/* <img src={dentureImage} alt="denture" /> */}
                <div className="icon">
                    <img src={dentureIconTop} alt="denture" />
                    <img src={dentureIconBottom} alt="denture" />
                </div>
                <div className="button">
                    <p>UPLOAD</p>
                </div>
                <input type="file" id="file-upload" name="file" onChange={handleUpload}/>
            </label>
            {fileUpload &&

            <div className="processed-image-container">
                <img src={`data:image/jpeg;base64,${encodedImage}`} alt="Processed" />
            </div>
            
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

            }
            

        </div>
    )
}

export default HomePage;