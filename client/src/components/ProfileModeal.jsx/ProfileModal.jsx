import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../actions/userAction';
import { uploadImage } from '../../api/uploadRequest';

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.file && e.target.file[0]) {
      let img = e.target.files[0];
      e.target.name === 'profileImage'
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = formData;
    if (profileImage) {
      const data = FormData();
      const fileName = Date.now() + profileImage.name;
      data.append('name', fileName);
      data.append('file', profileImage);
      userData.profilePicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = FormData();
      const fileName = Date.now() + coverImage.name;
      data.append('name', fileName);
      data.append('file', coverImage);
      userData.coverPicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser(param.id, userData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpened}
      onClose={() => setModalOpened(false)}>
      <form className='infoForm'>
        <h3>Your info</h3>
        <div>
          <input
            type='text'
            className='infoInput'
            name='firstname'
            placeholder='First Name'
            onChange={handleChange}
            value={formData.firstname}
          />

          <input
            type='text'
            className='infoInput'
            name='lastname'
            placeholder='Last Name'
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            type='text'
            className='infoInput'
            name='worksAt'
            placeholder='Works at'
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>

        <div>
          <input
            type='text'
            className='infoInput'
            name='livesin'
            placeholder='Lives in'
            onChange={handleChange}
            value={formData.livesin}
          />

          <input
            type='text'
            className='infoInput'
            name='country'
            placeholder='Country'
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type='text'
            className='infoInput'
            name='relationship'
            placeholder='RelationShip status'
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>
        <div>
          Profile Image
          <input type='file' name='profileImgage' onChange={onImageChange} />
          Cover Image
          <input type='file' name='coverImgage' onChange={onImageChange} />
        </div>

        <button
          className='button infoButton'
          type='submit'
          onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
}
export default ProfileModal;
