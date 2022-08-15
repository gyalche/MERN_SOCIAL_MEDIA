import React from 'react'
import "./ProfileCard.css"
import Cover from '../../img/cover.jpg';
import Profile from "../../img/profileImg.jpg"
const ProfileCard = () => {

    const ProfilePage=true;
  return (
    <div className="ProfileCard">
        <div className="ProfileImages">
            <img src={Cover} alt="" />
            <img src={Profile} alt="" />

        </div>
        <div className="ProfileName">
            <span>Dawa Sherpa</span>
            <span>Senior software Engineer</span>
        </div>

        <div className="followStatus">
            <hr />
            <div>
                <div className="follow">
                    <span>23,234</span>
                    <span>Followings</span>
                </div>
                <div className="vl">

                </div>

                <div className="follow">
                    <span>2</span>
                    <span>Followers</span>
                </div>

                {ProfilePage && (
                    <>
                        <div className="vl">
                        
                        </div>

                        <div className="follow">
                            <span>3</span>
                            <span>Posts</span>
                        </div>
                    </>
                )}
            </div>
            <hr />
        </div>

        {ProfilePage? '':(
            <span>My Profile</span>
        )}
    </div>
  )
}

export default ProfileCard