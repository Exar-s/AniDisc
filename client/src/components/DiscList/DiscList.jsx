import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPost, postReset } from '../../reducers/postReducer';
import { Link, useLocation } from 'react-router-dom';
import { getDate } from '../../services/jikan';
// import draftToHtml from 'draftjs-to-html';
import Pagination from '../Pagination/Pagination';
import Loading from '../Loading/Loading';
import './disclist.css';

const DiscList = ({ id }) => {
  const [paginate, setPaginate] = useState({
    pages: 0,
    currentPage: 1,
  });
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);
  const location = useLocation().pathname;

  useEffect(() => {
    dispatch(getAllPost({ id, page: paginate.currentPage }));
    return () => {
      dispatch(postReset());
    };
  }, [dispatch, id, paginate]);

  //PAGINATION COMPONENT
  const handlePageChange = (page) => {
    if (page < 1 || page > posts.totalPages) return;
    setPaginate({ ...paginate, currentPage: page });
  };

  return (
    <div className='disclist-container'>
      {isLoading ? (
        <Loading />
      ) : (
        posts.docs?.map((post) => (
          <div className='disclist-post' key={post._id}>
            <div className='disclist-date'>
              <div className='disclist-date-user'>
                <img src={`http://localhost:3001${post.author.profilePic}`} alt='' />
                <p>User/{post.author.username}</p>
              </div>
              <p>{getDate(post.createdAt)}</p>
            </div>
            <div className='disclist-main'>
              <div className='disclist-main-user'>
                <Link to={`/user/${post.author.username}`}>
                  <p>{post.author.username}</p>
                  <img src={`http://localhost:3001${post.author.profilePic}`} alt='' />
                  <p className='disclist-joined'>
                    Joined: {getDate(post.author.createdAt)}
                  </p>
                </Link>
              </div>
              <div className='disclist-main-post'>
                <Link to={location + `/${post._id}`} key={post._id}>
                  <h1>{post.title}</h1>
                  {/* <div
                    dangerouslySetInnerHTML={{
                      __html: draftToHtml(JSON.parse(post.description)),
                    }}
                  ></div> */}
                  {post.image !== '' && (
                    <div className='disclist-main-img'>
                      <img src={`http://localhost:3001${post.image}`} alt=''></img>
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
      {posts?.docs?.length <= 0 && (
        <div className='no-post'>
          <h2>No Posts Yet</h2>
          <p>Be the first to Post</p>
        </div>
      )}
      {posts?.totalPages > 1 && (
        <Pagination
          handlePageChange={handlePageChange}
          pages={posts.totalPages ? posts.totalPages : paginate.pages}
          currentPage={paginate.currentPage}
        />
      )}
    </div>
  );
};

export default DiscList;
