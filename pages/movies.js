import { useRouter } from 'next/router';
import { fetchAPI } from '../lib/api';
import PageHead from '../components/PageHead';
import FilterForm from '../components/FilterForm';
import Pagination from '../components/Pagination';
import DisplayMovies from '../components/DisplayMovies';

export default function Movies({ moviesData, page, genreData, filter }) {
  const movie = moviesData['data'];
  const totalPages = moviesData['meta'].pagination.pageCount;
  const genre = genreData['data'];
  let movies = [];
  let genres = [];
  const router = useRouter();

  function getMovies() {
    for (let i in movie) {
      movies.push(movie[i].attributes);
    }

    return movies;
  }

  function getGenres() {
    for (let i in genre) {
      genres.push(genre[i].attributes.genre);
    }

    return genres.sort();
  }

  getMovies();
  getGenres();

  return (
    <div className='page page-movies'>
      <PageHead
        title='Vietnamese Movies | Viet Cinema'
        description='Watch Vietnamese movies'
      />

      <main>
        <h1>Vietnamese Movies</h1>
        <FilterForm data={genres} router={router} pageName='movies' type='m' />
        <DisplayMovies data={movies} type='movie' />
        <Pagination
          pageName='movies'
          pageNo={page}
          filter={filter}
          totalPages={totalPages}
          router={router}
        />
      </main>
    </div>
  );
}

export async function getServerSideProps({
  query: { page = 1, filter = 'All' },
}) {
  const moviesData = await fetchAPI(
    `movies?sort[0]=release_date:desc&pagination[pageSize]=18&pagination[page]=${page}&filters[genres][genre][$eq]=${filter}&populate=*`
  );
  const genreData = await fetchAPI(`genres`);

  return {
    props: {
      moviesData,
      page,
      filter,
      genreData,
    },
  };
}
