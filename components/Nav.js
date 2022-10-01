import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  var [searchTerm, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <nav>
      <div className='nav-container'>
        <div className='nav-left'>
          <Link href='/'>
            <a className='logo'>VC</a>
          </Link>
          <div className='nav-links'>
            <Link href='/movies'>
              <a>Movies</a>
            </Link>
            <Link href='/shows'>
              <a>Shows</a>
            </Link>
            <Link href='/actors'>
              <a>Actors</a>
            </Link>
            <Link href='/watchlist'>
              <a>Watchlist</a>
            </Link>
          </div>
        </div>
        <div className='nav-right'>
          <form className='search-bar' action={`/search/${searchTerm}`}>
            <input
              type='text'
              onChange={handleChange}
              value={searchTerm}
              placeholder='Find movie, show, or drama'
              required
            />
            <button className='button'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='ai ai-Search'
              >
                <path d='M21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0z' />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
