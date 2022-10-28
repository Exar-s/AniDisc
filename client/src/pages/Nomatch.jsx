import { useNavigate } from 'react-router-dom';
import '../css/nomatch.css';
import missing from '../imgs/404.png';

const Nomatch = () => {
  const navigate = useNavigate();

  return (
    <div className='nomatch-container'>
      <img src={missing} alt='404' />
      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
};

export default Nomatch;
