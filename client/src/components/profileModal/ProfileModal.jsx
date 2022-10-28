import React from 'react';
import './profileModal.css';
import add from '../../imgs/add.png';

const ProfileModal = ({ handler, onchange, type, value, close, remove }) => {
  //Set label for file input as image preview
  const labelBG = () => {
    return value.preview
      ? { backgroundImage: `url(${value.preview})` }
      : { backgroundImage: `url(${add})` };
  };

  //Remove image preview
  const handleRemove = (e) => {
    e.preventDefault();
    remove();
  };

  return (
    <div className='profile-modal' onClick={() => close(false)}>
      <div className='profile-modal-form' onClick={(e) => e.stopPropagation()}>
        <button className='profile-modal-close' onClick={() => close(false)}>
          X
        </button>
        <form onSubmit={handler}>
          {type === 'img' ? (
            <div className='profile-modal-container'>
              <input
                type='file'
                onChange={onchange}
                id='profile-modal-img'
                accept='image/png, image/jpg, image/jpeg'
              />
              <label htmlFor='profile-modal-img' style={labelBG()}></label>
              {value.preview && (
                <button onClick={handleRemove}>Remove Image</button>
              )}
              {value.preview && <button type='submit'>Change Image</button>}
            </div>
          ) : (
            <div className='profile-modal-container'>
              <textarea
                value={value}
                onChange={onchange}
                spellCheck={false}
                placeholder='Change Signature'
              />
              <div>{value.length} / 500</div>
              <button type='submit'>submit</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
