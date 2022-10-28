import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import './currseason.css';
import Anime from '../Animebox/Animebox';

const Currseason = () => {
  const [current, setCurrent] = useState([]);
  const [paginate, setPaginate] = useState({
    pages: 1,
    currentPage: 1,
  });

  //Only set pages on first load
  const firstLoad = useRef(true);

  useEffect(() => {
    axios
      .get(
        `https://api.jikan.moe/v4/seasons/now?page=${paginate.currentPage}&limit=20`
      )
      .then((res) => {
        setCurrent(res.data.data);
        if (firstLoad.current) {
          const page = {
            pages: res.data.pagination.last_visible_page,
            currentPage: 1,
          };
          setPaginate(page);
          setCurrent(res.data.data);
          firstLoad.current = false;
        }
      });
  }, [paginate]);

  //PAGINATE COMPONENT
  const handlePageChange = (page) => {
    if (page < 1 || page > paginate.pages) return;
    setPaginate({ ...paginate, currentPage: page });
  };

  return (
    <div className='currseason-container'>
      <div className='currseason'>
        {current.map((anime) => (
          <Anime anime={anime} key={anime.mal_id} />
        ))}
      </div>
      {paginate.pages > 1 && (
        <Pagination
          handlePageChange={handlePageChange}
          pages={paginate.pages}
          currentPage={paginate.currentPage}
        />
      )}
    </div>
  );
};

export default Currseason;
