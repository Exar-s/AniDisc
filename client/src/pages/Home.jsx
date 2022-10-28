import Carousel from '../components/Carousel/Carousel';
import Currseason from '../components/Currseason/Currseason';
import Topbar from '../components/Topbar/Topbar';
import '../css/home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <Carousel />
      <div className='home-list'>
        <div className='home-current'>
          <h2>Current Season</h2>
          <Currseason />
        </div>
        <div className='home-top'>
          <h2>Top Rated</h2>
          <Topbar />
        </div>
      </div>
    </div>
  );
};

export default Home;