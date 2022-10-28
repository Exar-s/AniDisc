import React from 'react';
import { Link } from 'react-router-dom';
import { getUrl } from '../../services/jikan';
import './animebox.css';

const Anime = ({ anime }) => {
  return (
    <Link
      to={getUrl(anime.titles[0].title)}
      state={{ mal_id: anime.mal_id }}
      key={anime.titles[0].title}
      className='ani-link'
    >
      <div className='anime'>
        <div className='anime-poster'>
          <img src={anime.images.webp['large_image_url']} alt='' />
          <div className='anime-epitype'>
            <p className='episodes'>
              Episodes: {anime.episodes ? anime.episodes : '?'}
            </p>
            <p>{anime.type}</p>
          </div>
        </div>
        <div className='anime-title'>{anime.titles[0].title}</div>
      </div>
    </Link>
  );
};

export default Anime;
