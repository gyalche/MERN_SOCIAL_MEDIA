import React, {useState, useRef} from 'react';
import "./PostShare.css";
import ProfileImage from "../../img/profileImg.jpg"
import {UilScenery} from "@iconscout/react-unicons";
import {UilPlayCircle} from "@iconscout/react-unicons";
import {UilLocationPoint} from "@iconscout/react-unicons";
import {UilSchedule} from "@iconscout/react-unicons";
import {UilTimes} from "@iconscout/react-unicons";



const PostShare = () => {

    const [image, setImage] = useState(null);
    const ref=useRef();

    const onImageChange=(e)=>{
        if(e.target.files && e.target.files[0]){
            let img=e.target.files[0];
            setImage({
                image:URL.createObjectURL(img)
            })
        }
    }
  return (
    <div className="PostShare">
        <img src={ProfileImage} alt="profile" />
        <div>
            <input type="text" placeholder="What is in your mind" />

            <div className="postOptions">
            <div className="option" style={{color: "var(--photo)"}}
                onClick={()=>ref.current.click()}

            >
                <UilScenery />
                Photo
            </div>

            <div className="option" style={{color: "var(--video)"}}>
                <UilPlayCircle />
                Video
            </div>
             <div className="option" style={{color: "var(--location)"}}>
                <UilLocationPoint />
                Location
            </div>
            <div className="option" style={{color: "var(--schedule)"}}>
                <UilSchedule />
                Schedule
            </div>

            <button className="button ps-button">Share</button>
            <div style={{display:"none"}}>
                <input type="file" name="myImage" ref={ref} onChange={onImageChange} />
            </div>
            
        </div>

        {image && (
            <div className="previewImage">
                <UilTimes onClick={()=>setImage(null)}/>
                <img src={image.image} alt="image" />
            </div>
        )}
        </div>
        
    </div>
    
  )
}

export default PostShare