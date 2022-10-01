import { useState, useEffect } from 'react';

export default function Watchlist(props) {
  var [watchlist, setWatchlist] = useState([]);
  const [inWatchlist, setInWatchlist] = useState();
  let moviesWatchlist = 'moviesWatchlist';
  const movie = props.movie;

  function addToWatchlist() {
    if (typeof window !== 'undefined') {
      //if watchlist exists
      if (watchlist.length !== 0) {
        const newWatchlist = [...watchlist];

        //if movie or show is in the watchlist, remove
        if (watchlist.some((i) => i.title_vn === movie.title_vn)) {
          //find index of movie or show in watchlist copy
          const movieIndex = newWatchlist.findIndex(
            (i) => i.title_vn == movie.title_vn
          );
          //remove movie or show from watchlist copy
          newWatchlist.splice(movieIndex, 1);
          //set new wachlist
          setWatchlist(newWatchlist);
          //set status of movie or show in watchlist to false
          setInWatchlist(false);
          //store new watchlist in local storage
          localStorage.setItem(moviesWatchlist, JSON.stringify(newWatchlist));

          alert(movie.title_vn + ' has been REMOVED from your watchlist.');

          //if movie or show is not in the watchlist, add
        } else {
          //add movie or show in watchlist
          newWatchlist.unshift(movie);
          //set new watchlist
          setWatchlist(newWatchlist);
          //set status of movie or show in watchlist to true
          setInWatchlist(true);
          //store new watchlist in local storage
          localStorage.setItem(moviesWatchlist, JSON.stringify(newWatchlist));

          alert(movie.title_vn + ' has been ADDED to your watchlist.');
        }

        //if watchlist doesn't exist
      } else {
        //add movie or show to watchlist
        watchlist.push(movie);
        //set new watchlist
        setWatchlist(watchlist);
        //set status of movie or show in watchlist to true
        setInWatchlist(true);
        //store new watchlist in local storage
        localStorage.setItem(moviesWatchlist, JSON.stringify(watchlist));

        alert(movie.title_vn + ' has been ADDED to your watchlist.');
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem(moviesWatchlist) !== null) {
      setWatchlist(JSON.parse(localStorage.getItem(moviesWatchlist)));
    }
  }, []);

  return (
    <button onClick={() => addToWatchlist()} className='button'>
      {watchlist.some((i) => i.title_vn === movie.title_vn) ? 'remove' : 'add to watchlist'}
    </button>
  );
}
