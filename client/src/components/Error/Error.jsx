import PropTypes from 'prop-types';
import './error.css';
import errorPic from '../../imgs/error.png';

const Error = ({ resetFunc, msg }) => {
  const handleCloseError = () => {
    const reset = {
      hasError: false,
      msg: '',
    };
    resetFunc(reset);
  };

  return (
    <div className='error-container'>
      <div className='error'>
        <img src={errorPic} alt='' />
        <div className='error-msg'>{msg}</div>
        <button className='close-error' onClick={handleCloseError}>
          x
        </button>
      </div>
    </div>
  );
};

Error.propTypes = {
  resetFunc: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
};

export default Error;
