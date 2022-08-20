import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../api/UserRequest';
const User = ({ person, id }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    person.following.includes(user._id)
  );
  const dispatch = useDispatch();
  const handleFollow = (e) => {
    e.preventDefault();
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  };
  return (
    <div key={id} className='follower'>
      <div>
        <img
          src={
            person.coverPicture ? serverPublic + person.img : serverPublic + ''
          }
          alt={person.name}
          className='followersImg'
        />
        <div className='name'>
          <span>{person.firstname}</span>
          <span>{person.lastname}</span>
        </div>
      </div>
      <button
        className={
          following ? 'button fc-button UnfollowButton' : 'button fc-button'
        }
        onClick={handleFollow}>
        {following ? 'unfollow' : 'follow'}
      </button>
    </div>
  );
};

export default User;
