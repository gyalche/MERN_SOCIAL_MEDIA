import React from 'react'
import "./FollowersCard.css";
import { Followers } from '../../Data/FollowersData';
const FollowersCard = () => {
  return (
    <div className="FollowersCard">
        <h3>Who is following you</h3>

        {Followers.map((follow, id)=>{
            return(
                <div key={id} className="follower">
                    <div>
                        <img src={follow.img} alt={follow.name} 
                            className="followersImg"
                        />
                        <div className="name">
                            <span>{follow.name}</span>
                            <span>{follow.username}</span>
                        </div>
                    </div>
                    <button className="button fc-button">Follow</button>
                </div>
            )
        })}
    </div>
  )
}

export default FollowersCard