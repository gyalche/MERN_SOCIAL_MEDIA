import React from 'react';
const User = ({ person, id }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleFollow = (e) => {
    e.preventDefault();
    
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
      <button className='button fc-button' onClick={handleFollow}>
        Follow
      </button>
    </div>
  );
};

export default User;
