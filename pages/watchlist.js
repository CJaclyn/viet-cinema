import { useEffect, useState } from 'react';
import Card from '../components/Card';
import PageHead from '../components/PageHead';

export default function WatchlistPage() {
  var [watchlist, setWatchlist] = useState([]);
  const [edit, setEdit] = useState(false);
  let moviesWatchlist = 'moviesWatchlist';

  function removeFromWatchlist(movie) {
    if (confirm('Are you sure you want to delete this from your watchlist?')) {
      if (typeof window !== 'undefined') {
        const newWatchlist = [...watchlist];

        //find the index of item in newWatchlist array and remove
        const movieIndex = newWatchlist.findIndex((i) => i.title_vn == movie);
        newWatchlist.splice(movieIndex, 1);

        //set watchlist with newWatchlist array
        setWatchlist(newWatchlist);

        //set new stringified array in local storage
        localStorage.setItem(moviesWatchlist, JSON.stringify(newWatchlist));
      }
    }
  }

  if (typeof window !== 'undefined') {
    const deleteButtons = document.getElementsByClassName('delete-button');

    if (edit === true) {
      for (const button of deleteButtons) {
        button.style.display = 'block';
      }
    } else {
      for (const button of deleteButtons) {
        button.style.display = 'none';
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem(moviesWatchlist) !== null) {
      setWatchlist(JSON.parse(localStorage.getItem(moviesWatchlist)));
    }
  }, []);

  return (
    <div className='page page-watchlist'>
      <PageHead
        title='Watchlist | Viet Cinema'
        description='Your watchlist for Vietnamese movies, shows, and dramas'
      />
      <main>
        <h1>Watchlist</h1>
        <button onClick={() => setEdit(!edit)} className='button'>
          {edit === true ? 'Done' : 'Edit'}
        </button>
        <div className='cards-container'>
          {watchlist.length !== 0 ? (
            watchlist.map(
              ({
                slug,
                title_vn,
                title_eng,
                title_cn,
                year,
                type,
                thumbnail,
              }, index) => (
                <div className='card-container' key={index}>
                  <button
                    onClick={() => removeFromWatchlist(title_vn)}
                    className='delete-button'
                  >
                    Delete
                  </button>
                  <Card
                    type={type === 'movie' ? 'movie' : 'show'}
                    slug={slug}
                    primaryLabel={title_eng}
                    secondaryLabel={title_vn}
                    sideLabel={title_cn}
                    year={year}
                    img={thumbnail.length == 0 ? '/no-img.jpg' : `${thumbnail}`}
                  />
                </div>
              )
            )
          ) : (
            <p>
              There are no movies, shows, or dramas in your watchlist.
              <br />
              Your watchlist is stored in your browser's local storage and will
              be deleted if you clear the local storage.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
