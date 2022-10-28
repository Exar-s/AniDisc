import { useEffect, useState, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearch } from '../services/jikan';
import { genre, types, status } from '../services/genretypes';
import Select from '../components/Select/Select';
import Pagination from '../components/Pagination/Pagination';
import Anime from '../components/Animebox/Animebox';
import Loading from '../components/Loading/Loading';
import nodata from '../imgs/nodata.png';
import '../css/filter.css';

const Filter = () => {
  const [filter, setFilter] = useState({
    genres: [],
    type: [],
    status: []
  });
  const [paginate, setPaginate] = useState({
    got: false,
    pages: 1,
    currentPage: 1,
  });
  const [filterAnime, setFilterAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  //Check if first load on page
  const firstUpdate = useRef(true);
  
  //Check if user is clicking filter option from header dropdown
  //firstUpdate will be left as false and select options wont be updated
  const firstLocation = location.state?.first; 
  const first = useRef(firstLocation ? true : false);

  useEffect(() => {
    //change searchParam into object
    const params = Object.fromEntries([...searchParams]);
    if (first || firstUpdate.current) {
      const newObj = {
        genres: [],
        type: [],
        status: []
      };
      for (const key in params) {
        const arr = params[key].split(',');
        newObj[key] = arr;
      }
      setFilter(newObj);
      firstUpdate.current = false;
      first.current = false;
      // navigate(`/filter?${searchParams}`, { replace: true });
    }
    getSearch(params, paginate.currentPage).then((res) => {
      if (!paginate.got) { setPaginate({ ...paginate, got: true, pages: res.pagination.last_visible_page }); }
      setFilterAnime(res.data);
      setLoading(false);
    });
  }, [searchParams, paginate]);

  //change state arrays into string for query
  const handleFilter = () => {
    let categories = {};
    for (let key in filter) {
      let categoryString = '';
      if (filter[key].length > 0) {
        filter[key].forEach((item, index) => {
          if (index === 0) {
            categoryString = categoryString.concat(item);
          } else {
            categoryString = categoryString.concat(',', item);
          }
        });
        categories[key] = categoryString;
      }
    }
    setPaginate({...paginate, got: false, currentPage: 1})
    setSearchParams(categories);
  };

  //set search params to empty
  const handleReset = () => {
    const reset = {
      genres: [],
      type: [],
      status: []
    };
    setFilter(reset);
    setPaginate({
      got: false,
      pages: 1,
      currentPage: 1
    });
    setSearchParams({});
  };

  //Pagination
  const handlePageChange = (page) => {
    if (page < 1 || page > paginate.pages) return;
    setLoading(true);
    setPaginate({ ...paginate, currentPage: page });
  };

  return (
    <div className='filter-container'>
      <div className='category-select'>
        <Select
          list={genre}
          number={true}
          category='genres'
          setFilter={setFilter}
          filter={filter}
        />
        <Select
          list={types}
          number={false}
          category='type'
          setFilter={setFilter}
          filter={filter}
        />
        <Select
          list={status}
          number={false}
          category='status'
          setFilter={setFilter}
          filter={filter}
        />
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {loading ? <Loading /> : <div className='filter-list'>
        {
          filterAnime.map((anime) => {
            if (anime.titles[0]?.title && anime.approved) {
              return (<Anime anime={anime} key={anime.mal_id} />);
            } else {
              return (
                <div className='anime' key={anime.mal_id}>
                  <div className='anime-poster'>
                    <img src={nodata} alt="" />
                    <div className='anime-epitype'>
                      <p className='episodes'>Episodes: {anime.episodes ? anime.episodes : '?'}</p>
                      <p>{anime.type}</p>
                    </div>
                  </div>
                  <div className='anime-title'>{anime.title}</div>
                </div>
              );
            }
          })
        }
      </div>}
      {paginate.pages > 1 && <Pagination
        handlePageChange={handlePageChange}
        pages={paginate.pages}
        currentPage={paginate.currentPage}
      />}
    </div>
  );
};

export default Filter;
