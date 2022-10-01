import { useRouter } from 'next/router';
import { fetchAPI } from '../../lib/api';
import Card from '../../components/Card';

export default function Search({ moviesData, showsData }) {
  const router = useRouter();
  const searchTerm = router.query.slug;
  const movie = moviesData['data'];
  const show = showsData['data'];
  let movies = [];
  let shows = [];

  function getAttributes(object, array, type) {
    for (let i in object) {
      array.push(object[i].attributes);
      array[i].type = type;
    }

    return array;
  }

  getAttributes(movie, movies, 'movie');
  getAttributes(show, shows, 'show');

  //combine movies and shows array
  var movieShow = [...movies, ...shows];
  //sort movies and shows by desc date
  movieShow = movieShow.sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  );

  return (
    <main className='page page-search'>
      <h1>Search Results for: &lsquo;{searchTerm}&rsquo;</h1>
      <div className='cards-container'>
        {movies.length == 0 && shows.length == 0 ? (
          <p className='not-found'>
            No movies, shows, or dramas found for &lsquo;{searchTerm}&rsquo;.
            <br />
            If you're searching the Vietnamese title, make sure to use the
            correct spelling with diacratics &#40;e.g. &lsquo; Mắt biếc&rsquo;,
            not &lsquo;Mat biec&rsquo;&#41;.
            <br />
            If the movie, show, or drama is not on Viet Cinema, you can request
            it here.
          </p>
        ) : (
          <>
            {movieShow.map(
              ({
                slug,
                title_vn,
                title_eng,
                title_cn,
                release_date,
                type,
                thumbnail,
              }) => (
                <Card
                  type={type === 'movie' ? 'movie' : 'show'}
                  slug={slug}
                  primaryLabel={title_eng}
                  secondaryLabel={title_vn}
                  sideLabel={title_cn}
                  year={release_date}
                  img={
                    thumbnail.data == null
                      ? '/no-img.jpg'
                      : `${thumbnail.data.attributes.url}`
                  }
                />
              )
            )}
          </>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps({ params }) {
  const moviesData = await fetchAPI(
    `movies?filters[$or][0][title_vn][$containsi]=${params.slug}&filters[$or][1][title_eng][$containsi]=${params.slug}&populate=*`
  );
  const showsData = await fetchAPI(
    `shows?filters[$or][0][title_vn][$containsi]=${params.slug}&filters[$or][1][title_eng][$containsi]=${params.slug}&populate=*`
  );

  return {
    props: {
      moviesData,
      showsData,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
