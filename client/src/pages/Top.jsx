import { useEffect, useState } from 'react';
import { getTop, getDate} from '../services/jikan';
import Loading from '../components/Loading/Loading';
import Pagination from '../components/Pagination/Pagination';
import '../css/top.css';

const Top = () => {
  const [topList, setTopList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState({
    pages: 50,
    currentPage: 1,
  });

  useEffect(() => {
    getTop(paginate.currentPage, 25).then((res) => {
      setTopList(res.data);
      setLoading(false);
    });
  }, [paginate]);

  //Pagination
  const handlePageChange = (page) => {
    if (page < 1 || page > paginate.pages) return;
    setLoading(true);
    setPaginate({ ...paginate, currentPage: page });
  };

  return (
    <>
      <table className='top-table'>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {loading ?
            <tr>
              <td></td>
              <td>
                <Loading />
              </td>
              <td></td>
            </tr>
            :
            topList.map((anime) => (
              <tr key={anime.mal_id}>
                <td className='top-table-rank'>{anime.rank}</td>
                <td>
                  <div className='top-table-name'>
                    <img src={anime.images.webp['large_image_url']} alt='' />
                    <div className='top-table-info'>
                      <h3>{anime.titles[0].title}</h3>
                      <p>{anime.rating}</p>
                      <p>{getDate(anime.aired.from)}</p>
                      <p>Episodes: {anime.episodes ? anime.episodes : '?'}</p>
                      <p>{anime.type}</p>
                    </div>
                  </div>
                </td>
                <td >
                  <div className='top-table-synopsis'>{anime.synopsis}</div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination
        handlePageChange={handlePageChange}
        pages={paginate.pages}
        currentPage={paginate.currentPage}
      />
    </>
  );
};

export default Top;
