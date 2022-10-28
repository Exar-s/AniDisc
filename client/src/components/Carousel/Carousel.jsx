import { useEffect, useState, useRef } from 'react';
import { getRandPopular, getDate } from '../../services/jikan';
import { Link } from 'react-router-dom';
import { getUrl } from '../../services/jikan';
import arrowBack from '../../imgs/arrow_back.svg';
import arrowForward from '../../imgs/arrow_forward.svg';
import * as poster from '../../services/poster';
import './carousel.css';

const Carousel = () => {
  const [randomAnime, setRandomAnime] = useState([]);
  const [counter, setCounter] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const carouselRef = useRef(null);
  const stateRef = useRef(1);

  //check if window is in view
  const changeVisible = () => {
    if (document.visibilityState === 'visible') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    getRandPopular().then((res) => {
      setRandomAnime(res);
    });
    document.addEventListener('visibilitychange', changeVisible);
    return () => {
      document.removeEventListener('visibilitychange', changeVisible);
    };
  }, []);

  useEffect(() => {
    stateRef.current = counter;

    //Check if  carousel is on last or first page for transitionEnd
    const handleTransition = () => {
      if (stateRef.current <= 0) {
        carouselRef.current.style.transition = 'none';
        setCounter(counter + 5);
      }
      if (stateRef.current >= 6) {
        carouselRef.current.style.transition = 'none';
        setCounter(counter - 5);
      }
    };

    //auto slider
    //stop slider if window is not in view
    let carID = setInterval(() => {
      if (!isVisible) {
        return clearInterval(carID);
      }
      if (counter < 0 || counter > 6) return setCounter(0);
      carousel.style.transition = 'transform 0.3s ease-in';
      setCounter(counter + 1);
    }, 8000);

    //Turn off transition when rotating carousel to beginning or end
    //Make it a full circular rotation
    const carousel = carouselRef.current;
    carousel.addEventListener('transitionend', handleTransition);
    carousel.style.transform = `translateX(${-counter * 100}%)`;
    return () => {
      carousel.removeEventListener('transitionend', handleTransition);
      clearInterval(carID);
    };
  }, [counter, isVisible]);

  //Carousels left and right click
  const handlePrev = () => {
    if (counter === 0) return;
    carouselRef.current.style.transition = 'transform 0.3s ease-in';
    setCounter(counter - 1);
  };

  const handleNext = () => {
    if (counter === 6) return;
    carouselRef.current.style.transition = 'transform 0.3s ease-in';
    setCounter(counter + 1);
  };

  return (
    <div className='carousel-container'>
      <div className='carousel-prev' onClick={handlePrev}>
        <img src={arrowBack} alt='' />
      </div>
      <div className='carousel-next' onClick={handleNext}>
        <img src={arrowForward} alt='' />
      </div>
      <div className='pages'>
        <div className={`dot ${counter === 1 ? 'pages-active' : ''}`}></div>
        <div className={`dot ${counter === 2 ? 'pages-active' : ''}`}></div>
        <div className={`dot ${counter === 3 ? 'pages-active' : ''}`}></div>
        <div className={`dot ${counter === 4 ? 'pages-active' : ''}`}></div>
        <div className={`dot ${counter === 5 ? 'pages-active' : ''}`}></div>
      </div>
      <div className='carousel-slider' ref={carouselRef}>
        {randomAnime.length > 0 ? (
          <div
            key={'FirstRandom'}
            className='carousel-anime'
            style={{
              backgroundImage: `url(${
                poster[`img_${randomAnime[4].data.mal_id}`]
              })`,
            }}
          >
            <div className='carousel-data'>
              {randomAnime[4].data.title}: {randomAnime[4].data.mal_id}
            </div>
          </div>
        ) : (
          <></>
        )}
        {randomAnime.map((anime) => (
          <div
            key={anime.data.title}
            className='carousel-anime'
            style={{
              backgroundImage: `url(${poster[`img_${anime.data.mal_id}`]})`,
            }}
          >
            <div className='carousel-data'>
              <h1 className='carousel-data-title'>{anime.data.title}</h1>
              <div className='carousel-data-ratingaired'>
                <p className='carousel-data-blue'>{anime.data.rating}</p>
                <p>{getDate(anime.data.aired.from)}</p>
              </div>
              <div className='carousel-data-epitype'>
                <p className='carousel-data-blue'>
                  Episodes:{' '}
                  {anime.data.episodes ? anime.data.episodes : 'Unknown'}
                </p>
                <p>{anime.data.type}</p>
              </div>
              <p className='carousel-data-synopsis'>{anime.data.synopsis}</p>
              <Link
                to={getUrl(anime.data.titles[0].title)}
                state={{ mal_id: anime.data.mal_id }}
                key={anime.data.titles[0].title}
              >
                <button className='carousel-checkout'>View</button>
              </Link>
            </div>
          </div>
        ))}
        {randomAnime.length > 0 ? (
          <div
            key={'LastRandom'}
            className='carousel-anime'
            style={{
              backgroundImage: `url(${
                poster[`img_${randomAnime[0].data.mal_id}`]
              })`,
            }}
          >
            <div className='carousel-data'>
              {randomAnime[0].data.title}: {randomAnime[0].data.mal_id}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Carousel;
