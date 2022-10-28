import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import '../css/profile.css';
import authService from '../services/authService';
import { logout, profilePic } from '../reducers/authReducer';
import ProfileModal from '../components/profileModal/ProfileModal';

const User = () => {
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState({
    file: null,
    preview: null,
  });
  const [picModal, setPicModal] = useState(false);
  const [sigModal, setSigModal] = useState(false);
  const [signature, setSignature] = useState('');
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    userService
      .getUser(username)
      .then((res) => {
        setProfile(res);
      })
      .catch((error) => {
        console.log(error);
        navigate('/404');
      });
  }, [username, navigate]);

  //Submit and change profile pic
  const handleProfilePic = async (e) => {
    e.preventDefault();
    const isUser = authService.checkToken();
    if (!isUser) {
      return dispatch(logout());
    }
    const formdata = new FormData();
    formdata.append('image', image.file);
    try {
      const img = await userService.updateProfilePic(formdata, user.token);
      setImage({
        ...image,
        file: null,
        preview: null,
      });
      setProfile({
        ...profile,
        profilePic: img,
      });
      dispatch(profilePic(img));
      setPicModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Change Image for preview
  const handleImage = (e) => {
    console.log(e);
    if (e.target.files.length < 1)
      return setImage({
        ...image,
        file: null,
        preview: null,
      });
    const newimage = {
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    };
    setImage(newimage);
  };

  //Submit and change Signature
  const handleSignature = async (e) => {
    e.preventDefault();
    const isUser = authService.checkToken();
    if (!isUser) {
      return dispatch(logout());
    }
    const signatureData = {
      signature,
    };
    try {
      const newSignature = await userService.updateSignature(
        signatureData,
        user.token
      );
      setSignature('');
      setProfile({
        ...profile,
        signature: newSignature,
      });
      setSigModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  //change signature input
  const handleSigChange = (e) => {
    let newVal = e.target.value;
    if (e.target.value.length > 500) {
      newVal = e.target.value.slice(0, 500);
    }
    setSignature(newVal);
  };

  const removeImage = () => {
    return setImage({
      ...image,
      file: null,
      preview: null,
    });
  };

  return (
    <div className='profile-container'>
      <div className='profile-wrapper'>
        {profile.username && (
          <div className='profile-info'>
            <div className='profile-pic'>
              <img src={`http://localhost:3001${profile.profilePic}`} alt='' />
              {user?.user.username === profile.username && (
                <button onClick={() => setPicModal(!picModal)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    height='24'
                    width='24'
                    fill='#FFFFFF'
                  >
                    <path d='M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412-.588.588-1.413.588Zm7-9Zm4.175-8.425 1.425 1.4-6.6 6.6V15.7h1.4l6.625-6.625 1.425 1.4-7.2 7.225H9v-4.25Zm4.275 4.2-4.275-4.2 2.5-2.5q.6-.6 1.438-.6.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z' />
                  </svg>
                </button>
              )}
            </div>
            <div className='profile-username'>
              <h1>{profile.username}</h1>
            </div>
            <div className='profile-signature'>
              {profile.signature}
              {user?.user.username === profile.username && (
                <button onClick={() => setSigModal(!sigModal)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    height='24'
                    width='24'
                    fill='#FFFFFF'
                  >
                    <path d='M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412-.588.588-1.413.588Zm7-9Zm4.175-8.425 1.425 1.4-6.6 6.6V15.7h1.4l6.625-6.625 1.425 1.4-7.2 7.225H9v-4.25Zm4.275 4.2-4.275-4.2 2.5-2.5q.6-.6 1.438-.6.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z' />
                  </svg>
                </button>
              )}
            </div>
            <div className='profile-postCom'>
              <div>
                <div className='profile-num'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    height='24'
                    width='24'
                    fill='#ffffff'
                  >
                    <path d='M2 17V3q0-.425.288-.713Q2.575 2 3 2h13q.425 0 .712.287Q17 2.575 17 3v9q0 .425-.288.712Q16.425 13 16 13H6Zm5 1q-.425 0-.713-.288Q6 17.425 6 17v-2h13V6h2q.425 0 .712.287Q22 6.575 22 7v15l-4-4Zm8-14H4v8.175L5.175 11H15ZM4 4v8.175Z' />
                  </svg>
                  Posts:
                </div>
                {profile.posts.length}
              </div>
              <div>
                <div className='profile-num'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    height='24'
                    width='24'
                    fill='#ffffff'
                  >
                    <path d='M6 14h12v-2H6Zm0-3h12V9H6Zm0-3h12V6H6Zm16 14-4-4H4q-.825 0-1.412-.587Q2 16.825 2 16V4q0-.825.588-1.413Q3.175 2 4 2h16q.825 0 1.413.587Q22 3.175 22 4ZM4 4v12h14.825L20 17.175V4H4Zm0 0v13.175V4Z' />
                  </svg>
                  Comments:
                </div>
                {profile.comments.length}
              </div>
            </div>
          </div>
        )}
      </div>
      {picModal && (
        <ProfileModal
          handler={handleProfilePic}
          onchange={handleImage}
          type={'img'}
          value={image}
          close={setPicModal}
          remove={removeImage}
        />
      )}
      {sigModal && (
        <ProfileModal
          handler={handleSignature}
          onchange={handleSigChange}
          type={'sig'}
          value={signature}
          close={setSigModal}
        />
      )}
    </div>
  );
};

export default User;
