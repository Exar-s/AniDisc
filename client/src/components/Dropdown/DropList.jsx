import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Side drop, Genre searched by ID
const DropList = ({ list, number }) => {
  return number ? (
    <div className='drop-side'>
      {list.map((x) => (
        <Link
          to={`/filter?genres=${x.id}`}
          state={{ first: true }}
          key={x.name}
        >
          <div>{x.name}</div>
        </Link>
      ))}
    </div>
  ) : (
    <div className='drop-side'>
      {list.map((x) => (
        <Link to={`filter?type=${x}`} state={{ first: true }} key={x}>
          <div>{x}</div>
        </Link>
      ))}
    </div>
  );
};

DropList.propTypes = {
  list: PropTypes.array.isRequired,
  number: PropTypes.bool.isRequired,
};
export default DropList;
