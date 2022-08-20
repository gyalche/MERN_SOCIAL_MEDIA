import React, { useState, useEffect } from 'react';
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../ProfileModeal.jsx/ProfileModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserApi from '../../api/UserRequest';
const InfoCard = () => {
  const navigate = useNavigate();
  const [modalOpened, setModalOpened] = useState(false);
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const logoutCLick = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/logout');
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user?._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [profileUserId, user]);
  return (
    <div className='InfoCard'>
      <div className='infoHead'>
        <h4>Profile info</h4>
        {user?._id === profileUserId ? (
          <div>
            <UilPen onClick={() => setModalOpened(true)} />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ''
        )}
      </div>

      <div className='info'>
        <span>
          <b>Status</b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className='info'>
        <span>
          <b>Lives in</b>
        </span>
        <span> {profileUser.livesin}</span>
      </div>

      <div className='info'>
        <span>
          <b>Works at</b>
        </span>
        <span> {profileUser.worksAt}</span>
      </div>

      {profileUserId === user._id ? (
        <button className='button logout-button' onClick={logoutCLick}>
          Logout
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default InfoCard;
