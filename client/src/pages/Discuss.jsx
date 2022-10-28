import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { convertToRaw, EditorState } from 'draft-js';
import {
  discussReset,
  getSinglePost,
  newComment,
} from '../reducers/discussReducer';
import draftToHtml from 'draftjs-to-html';
import Texteditor from '../components/Texteditor/Texteditor';
import Pagination from '../components/Pagination/Pagination';
import Loading from '../components/Loading/Loading';
import authService from '../services/authService';
import { logout } from '../reducers/authReducer';
import { getDate } from '../services/jikan';
import '../css/discuss.css';

const Discuss = () => {
  const [paginate, setPaginate] = useState({
    pages: 1,
    currentPage: 1,
  });
  const { discid } = useParams();
  const editorContent = EditorState.createEmpty();
  const [editorState, setEditorState] = useState({
    editorState: editorContent,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { discuss, isError } = useSelector((state) => state.discuss);
  const { user } = useSelector((state) => state.auth);
  const MAX_LENGTH = 250;

  useEffect(() => {
    if (isError) {
      navigate('/404');
    }
    dispatch(getSinglePost({ id: discid, page: paginate.currentPage }));
    return () => {
      dispatch(discussReset());
    };
  }, [discid, dispatch, paginate, isError, navigate]);

  //Prevent submit if:
  //User is not logged in
  //token has expired
  //If there is not text
  const handleSubmit = (e) => {
    e.preventDefault();
    const isUser = authService.checkToken();
    if (!isUser) {
      return dispatch(logout());
    }
    if (editorState.editorState.getCurrentContent().getPlainText().length <= 0)
      return;
    const comment = {
      id: discid,
      comment: JSON.stringify(
        convertToRaw(editorState.editorState.getCurrentContent())
      ),
    };
    dispatch(newComment(comment));
    setEditorState({ editorState: editorContent });
  };

  //Pagination
  const handlePageChange = (page) => {
    if (page < 1 || page > discuss.comments.totalPages) return;
    setPaginate({ ...paginate, currentPage: page });
  };

  return (
    <div className='discuss-container'>
      {Object.keys(discuss).length === 0 ? (
        <Loading />
      ) : (
        <div className='discuss-wrapper'>
          <div className='discuss-post'>
            <div className='discuss-post-user'>
              <img src={`http://localhost:3001${discuss.findpost.author.profilePic}`} alt='' />
              <div>
                <Link to={`/user/${discuss.findpost.author.username}`}>
                  <span>User/{discuss.findpost.author.username}</span>
                </Link>{' '}
                · Posted: {getDate(discuss.findpost.createdAt)}
              </div>
            </div>
            <h1>{discuss.findpost.title}</h1>
            {discuss.findpost.image !== '' && (
              <div className='discuss-post-img'>
                <img src={`http://localhost:3001${discuss.findpost.image}`} alt='' />
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: draftToHtml(JSON.parse(discuss.findpost.description)),
              }}
            ></div>
          </div>
          {!user ? (
            <div className='discuss-login'>
              <Link to='/login'>Log in</Link> to comment
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p>Comment</p>
              <Texteditor
                editorState={editorState}
                setEditorState={setEditorState}
                MAX_LENGTH={MAX_LENGTH}
                placeholder='Comment...'
              />
              <div className='discuss-form-submit'>
                <div>
                  {
                    editorState.editorState.getCurrentContent().getPlainText()
                      .length
                  }
                  /250
                </div>
                <button type='submit'>Submit</button>
              </div>
            </form>
          )}
          <div className='discuss-comment-sec'>
            {discuss.comments.docs &&
              discuss.comments.docs.map((comment, index) => (
                <div
                  className={
                    discuss.comments.docs.length - 1 !== index
                      ? 'discuss-comment not-last'
                      : 'discuss-comment'
                  }
                  key={comment._id}
                >
                  <img src={`http://localhost:3001${comment.author.profilePic}`} alt='' />
                  <div>
                    <div className='discuss-comment-user'>
                      <Link to={`/user/${comment.author.username}`}>
                        <span>User/{comment.author.username}</span>
                      </Link>{' '}
                      · Posted:{getDate(comment.createdAt)}
                    </div>
                    <div
                      className='discuss-comment-text'
                      dangerouslySetInnerHTML={{
                        __html: draftToHtml(JSON.parse(comment.comment)),
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            {discuss?.comments?.docs.length <= 0 && (
              <div className='no-post'>
                <h2>No Comments Yet</h2>
                <p>Be the first to Comment</p>
              </div>
            )}
            {discuss?.comments?.totalPages > 1 && (
              <Pagination
                handlePageChange={handlePageChange}
                pages={
                  discuss.comments.totalPages
                    ? discuss.comments.totalPages
                    : paginate.pages
                }
                currentPage={paginate.currentPage}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discuss;
