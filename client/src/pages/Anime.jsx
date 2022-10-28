import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AnimeInfo from "../components/AnimeInfo/AnimeInfo";
import DiscList from "../components/DiscList/DiscList";
import '../css/anime.css';

const Anime = () => {
  //Get anime id of page to get api and post data
  const malID = useLocation().state?.["mal_id"];
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);

  return (
    <div className="anime-container">
      <AnimeInfo id={malID} />
      <div className="anime-login">
        {user !== null ?
          <button onClick={() => navigate('/newpost', { state: { malID } })}>New Post</button> :
          <div className="anime-login-relog">
            <Link
              to={'/login'}
            >
              Log in
            </Link> to make new post
          </div>
        }
      </div>
      <DiscList id={malID} />
    </div>
  );
};

export default Anime;