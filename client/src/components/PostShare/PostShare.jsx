import React, { useState, useRef } from 'react';
import './PostShare.css';
import ProfileImage from '../../img/profileImg.jpg';
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import { useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction';
import { useDispatch } from 'react-redux';

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const ref = useRef();
  const desc = useRef();

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = null;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append('name', filename);
      data.append('file', image);
      newPost.image = filename;
      console.log(newPost);

      try {
        dispatch(uploadImage(data));
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };
  return (
    <div className="PostShare">
      <img
        src={
          user?.profilePicture
            ? serverPublic + user.profilePicture
            : ProfileImage
        }
        alt="profile"
      />
      <div>
        <input
          ref={desc}
          required
          type="text"
          placeholder="What is in your mind"
        />

        <div className="postOptions">
          <div
            className="option"
            style={{ color: 'var(--photo)' }}
            onClick={() => ref.current.click()}>
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: 'var(--video)' }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: 'var(--location)' }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: 'var(--schedule)' }}>
            <UilSchedule />
            Schedule
          </div>

          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}>
            {loading ? 'uploading' : 'Share'}
          </button>
          <div style={{ display: 'none' }}>
            <input
              type="file"
              name="myImage"
              ref={ref}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
