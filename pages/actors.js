import FilterForm from '../components/FilterForm';
import { useRouter } from 'next/router';
import { fetchAPI } from '../lib/api';
import PageHead from '../components/PageHead';
import Pagination from '../components/Pagination';
import DisplayMovies from '../components/DisplayMovies';

export default function actors({ actorsData, page, filter }) {
  const actor = actorsData['data'];
  const totalPages = actorsData['meta'].pagination.pageCount;
  let actors = [];
  const router = useRouter();

  function getActors() {
    for (let i in actor) {
      actors.push(actor[i].attributes);
    }

    return actors;
  }

  getActors();

  return (
    <div className='page page-movies page-actors'>
      <PageHead
        title='Vietnamese Actors | Viet Cinema'
        description='List of Vietnamese actors and actresses.'
      />

      <main>
        <h1>Vietnamese Actors</h1>
        <FilterForm data={actors} router={router} pageName='actors' />
        <DisplayMovies data={actors} type='actor' />
        <Pagination
          pageName='actors'
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
  query: { page = 1, filter = 'Female' },
}) {
  const actorsData = await fetchAPI(
    `actors?sort[0]=publishedAt:desc&pagination[pageSize]=25&pagination[page]=${page}&filters[gender][$eq]=${filter}&populate=*`
  );

  return {
    props: {
      actorsData,
      page,
      filter,
    },
  };
}
