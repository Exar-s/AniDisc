import { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './select.css';
import PropTypes from 'prop-types';

const Select = ({ list, number, category, setFilter, filter }) => {
  const [active, setActive] = useState(false);
  const selectRef = useRef();

  //Close select on click outside options
  useEffect(() => {
    const closeMenu = (e) => {
      if (!selectRef.current.contains(e.target)) {
        setActive(false);
      }
    };
    document.body.addEventListener('mousedown', closeMenu);

    return () => {
      document.body.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  //if checked push new filter option into select category array
  //else remove the value from select category array
  const handleCheck = (e) => {
    if (e.target.checked) {
      const newArr = filter[category];
      newArr.push(e.target.value);
      setFilter({ ...filter, [category]: newArr });
    } else {
      const newArr = filter[category].filter((item) => item !== e.target.value);
      setFilter({ ...filter, [category]: newArr });
    }
  };

  //Close Select
  const handleClick = () => {
    setActive(!active);
  };

  return number ? (
    <div onClick={handleClick} className='select select-origin' ref={selectRef}>
      <div className='select-category'>
        <div>{category.toUpperCase()} &#x25BE;</div>
      </div>
      <CSSTransition
        in={active}
        timeout={200}
        classNames='dropdown'
        unmountOnExit
      >
        <div>
          <ul onClick={(e) => e.stopPropagation()}>
            {list.map((x) => (
              <li key={x.id}>
                <input
                  type='checkbox'
                  id={x.name}
                  value={x.id}
                  onChange={handleCheck}
                  checked={filter[category].includes(x.id)}
                />
                <label htmlFor={x.name}>{x.name}</label>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </div>
  ) : (
    <div onClick={handleClick} className='select select-other' ref={selectRef}>
      <div className='select-category'>
        <div>{category.toUpperCase()} &#x25BE;</div>
      </div>
      <CSSTransition
        in={active}
        timeout={200}
        classNames='dropdown'
        unmountOnExit
      >
        <div>
          <ul onClick={(e) => e.stopPropagation()}>
            {list.map((x) => (
              <li key={x}>
                <input
                  type='checkbox'
                  id={x}
                  value={x}
                  onChange={handleCheck}
                  checked={filter[category].includes(x)}
                />
                <label htmlFor={x}>{x.toUpperCase()}</label>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

Select.propTypes = {
  list: PropTypes.array.isRequired,
  number: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
};

export default Select;
