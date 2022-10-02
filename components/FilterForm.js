import { init } from 'aos';
import { useState } from 'react';

export default function FilterForm(props) {
  let initialFilter;

  if (props.pageName === 'movies' || props.pageName === 'shows') {
    initialFilter = 'All';
  } else {
    initialFilter = 'Female';
  }

  let [filter, setFilter] = useState(initialFilter);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <form>
      {props.pageName === 'movies' || props.pageName === 'shows' ? (
        <select name='genre' id='genre' onChange={handleChange} value={filter}>
          {props.data.map((genre, index) => (
            <option value={genre} key={index}>
              {genre}
            </option>
          ))}
        </select>
      ) : (
        <select name='actor' id='actor' onChange={handleChange} value={filter}>
          <option value='Female' key='Female'>
            Female
          </option>
          <option value='Male' key='Male'>
            Male
          </option>
        </select>
      )}

      <button
        className='button'
        type='button'
        onClick={() => props.router.push(`/${props.pageName}?filter=${filter}`)}
      >
        Filter
      </button>
    </form>
  );
}
