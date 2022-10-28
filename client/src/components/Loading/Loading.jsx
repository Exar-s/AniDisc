import spinner from '../../imgs/spinner.gif';
import './loading.css';

const Loading = () => {
  return (
    <div className='loader'>
      <img src={spinner} alt='' />
    </div>
  );
};

export default Loading;
