import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnimeById, getDate } from '../../services/jikan';
import './animeinfo.css';

const AnimeInfo = ({ id }) => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //if no anime id provided go to 404
  useEffect(() => {
    if (!id) {
      navigate('/404');
    } else {
      getAnimeById(id).then((res) => {
        setAnime(res.data);
        setLoading(false);
      });
    }
  }, [navigate, id]);

  return !loading ? (
    <div className='anime-info-container'>
      <img src={anime.images.webp['image_url']} alt='' />
      <div className='anime-info-data'>
        <h3>{anime.titles[0].title}</h3>
        <div className='anime-info-small'>
          <div>
            <p>{anime.rating}</p>
            <p>{getDate(anime.aired.from)}</p>
          </div>
          <div>
            <p>Episodes: {anime.episodes ? anime.episodes : '?'}</p>
            <p>{anime.type}</p>
          </div>
        </div>
        <div>{anime.synopsis}</div>
      </div>
    </div>
  ) : (
    <div>
      Loading... If it takes too long to load, limit might've been reached,
      Please refresh
    </div>
  );
};

export default AnimeInfo;
