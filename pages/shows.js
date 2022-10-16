import { fetchAPI } from '../lib/api';
import { useRouter } from 'next/router';
import PageHead from '../components/PageHead';
import Pagination from '../components/Pagination';
import FilterForm from '../components/FilterForm';
import DisplayMovies from '../components/DisplayMovies';

export default function Shows({ showsData, page, genreData, filter }) {
  const show = showsData['data'];
  const totalPages = showsData['meta'].pagination.pageCount;
  const genre = genreData['data'];
  let shows = [];
  let genres = [];
  const router = useRouter();

  (function getShows() {
    for (let i in show) {
      shows.push(show[i].attributes);
    }

    return shows;
  })();

  (function getGenres() {
    for (let i in genre) {
      genres.push(genre[i].attributes.genre);
    }

    return genres.sort();
  })();

  return (
    <div className='page page-movies'>
      <PageHead
        title='Vietnamese dramas and shows | Viet Cinema'
        description='Watch Vietnamese shows and dramas'
      />

      <main>
        <h1>Vietnamese Shows &amp; Dramas</h1>
        <FilterForm data={genres} router={router} pageName='shows' />
        <DisplayMovies data={shows} type='show' />
        <Pagination
          pageName='shows'
          pageNo={page}
          filter={filter}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
}

export async function getServerSideProps({
  query: { page = 1, filter = 'All' },
}) {
  const showsData = await fetchAPI(
    `shows?sort[0]=release_date:desc&pagination[pageSize]=18&pagination[page]=${page}&filters[genres][genre][$eq]=${filter}&populate=*`
  );
  const genreData = await fetchAPI(`genres`);

  return {
    props: {
      showsData,
      page,
      filter,
      genreData,
    },
  };
}
