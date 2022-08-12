import React, {useState} from 'react'
import "./InfoCard.css"
import {UilPen} from "@iconscout/react-unicons";
import ProfileModal from '../ProfileModeal.jsx/ProfileModal';
const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="InfoCard">
      <div className="infoHead">
          <h4>Your info</h4>
          <div>
            <UilPen  onClick={() =>setModalOpened(true)} />
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} />

          </div>

      </div>

      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span> in Relationship</span>
      </div>

       <div className="info">
        <span>
          <b>Lives in</b>
        </span>
        <span> Kathmandu</span>
      </div>

       <div className="info">
        <span>
          <b>Works at</b>
        </span>
        <span> Self developer</span>
      </div>

      <button className="button logout-button">Logout</button>

    </div>
  )
}

export default InfoCard