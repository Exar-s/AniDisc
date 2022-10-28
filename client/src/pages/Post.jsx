import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertToRaw, EditorState } from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import { newPost, postReset } from '../reducers/postReducer';
import authService from '../services/authService';
import { logout } from '../reducers/authReducer';
import { getAnimeById } from '../services/jikan';
import Texteditor from '../components/Texteditor/Texteditor';
import '../css/post.css';

const Post = () => {
  const editorContent = EditorState.createEmpty();
  const [editorState, setEditorState] = useState({ editorState: editorContent });
  const [image, setImage] = useState({
    file: null,
    preview: null
  });
  const [title, setTitle] = useState('');
  const [anime, setAnime] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MAX_LENGTH = 1000;
  const { user } = useSelector(state => state.auth);
  const { isError, isSuccess, isLoading, message } = useSelector(state => state.post);

  const malID = useLocation().state?.["malID"];

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
    dispatch(postReset());
  }, [isError, isLoading, isSuccess, message, dispatch, navigate]);

  //Send to login if not logged in
  //Return to prev page if not provided with an Anime ID
  useEffect(() => {
    if (!user) {
      return navigate('/login');
    }
    if (!malID) { navigate(-1); }
    else {
      getAnimeById(malID).then(res => {
        console.log(res.data);
        setAnime(res.data);
      });
    }
  }, [navigate, user, malID]);

  //Limit title word count
  const handleTitle = (e) => {
    let newVal = e.target.value;
    if (e.target.value.length > 100) {
      newVal = e.target.value.slice(0, 100);
    }
    setTitle(newVal);
  };

  //Create a blob to show preview of image
  const handleImage = (e) => {
    const newimage = {
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0])
    };
    setImage(newimage);
  };

  const handleRemoveImage = () => {
    return setImage({
      ...image,
      file: null,
      preview: null
    });
  };

  //Multi part form data
  //submit titel, id, image, and editorstate
  const handleSubmit = (e) => {
    e.preventDefault();
    const isUser = authService.checkToken();
    if (!isUser) {
      return dispatch(logout());
    }
    const formdata = new FormData();
    const desc = JSON.stringify(convertToRaw(editorState.editorState.getCurrentContent()));
    formdata.append('animeID', malID);
    formdata.append('title', title);
    formdata.append('image', image.file);
    formdata.append('description', desc);
    dispatch(newPost(formdata));
  };

  return (
    <div className='post-container'>
      {isError && <div>{message}</div>}
      <h2>Post to: <span>{anime.title}</span></h2>
      <form onSubmit={handleSubmit}>
        <div className='post-container-text'>
          <div className='post-container-titleandlimit'>
            <input type="text" onChange={handleTitle} value={title} placeholder='Title' required />
            <div>{title.length}/100</div>
          </div>
          <Texteditor editorState={editorState} setEditorState={setEditorState} MAX_LENGTH={MAX_LENGTH} placeholder="Details (Optional)"/>
          <div className='post-container-length'>Remaining: {editorState.editorState.getCurrentContent().getPlainText().length}/1000</div>
        </div>
        <div className='post-container-img'>
          {image.preview && <img src={image.preview} alt="" />}
          <input type="file" id="post-img" onChange={handleImage} accept="image/png, image/jpg, image/jpeg"/>
          <label htmlFor="post-img">Choose Image</label>
          {image.file && <button onClick={handleRemoveImage}>Remove Image</button>}
        </div>
        <button type="submit" className='post-container-submit'>SUBMIT</button>
      </form>
    </div>
  );
};

export default Post;
