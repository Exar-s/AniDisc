import './topbar.css';
import topten from '../../services/top.json';
import { Link } from 'react-router-dom';
import { getUrl } from '../../services/jikan';

const Topbar = () => {
  return (
    <div className='topten-list'>
      {topten.map((anime) => (
        <Link
          to={getUrl(anime.titles[0].title)}
          state={{ mal_id: anime.mal_id }}
          key={anime.titles[0].title}
        >
          <div key={anime.title} className='topten'>
            <img src={anime.images.jpg['large_image_url']} alt='' />
            <div className='topten-maininfo'>
              <p className='topten-title'>{anime.title}</p>
              <div className='topten-epitype'>
                <p className='topten-episodes'>
                  Episodes: {anime.episodes ? anime.episodes : 'Unknown'}
                </p>
                <p className='topten-type'>{anime.type}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Topbar;
