import PageHead from '../../components/PageHead';
import CastSection from '../../components/CastSection';
import { fetchAPI } from '../../lib/api';
import InfoSection from '../../components/InfoSection';

export default function Movie({ movieData, castData, actorData }) {
  const movie = movieData['data'][0].attributes;
  const cast = castData['data'];
  const actor = actorData['data'];
  const link = movie.links['data'];
  const genre = movie.genres['data'];
  const year = movie.release_date.slice(0, 4);
  let links = [];
  let genres = [];
  let casts = [];
  let actorsCast = [];
  let actors = [];
  let thumbnail = '';
  if (movie.thumbnail.data !== null) {
    thumbnail = movie.thumbnail.data.attributes.url;
  }
  const watchlistInfo = {
    slug: movie.slug,
    title_vn: movie.title_vn,
    title_eng: movie.title_eng,
    title_cn: movie.title_cn,
    year: year,
    type: 'movie',
    thumbnail: thumbnail,
  };

  function getGenres() {
    for (let i in genre) {
      genres.push(genre[i].attributes.genre);
    }

    //remove 'All' from genres list
    genres = genres.filter((item) => item !== 'All');

    return genres;
  }

  function getAttributes(object, array) {
    for (let i in object) {
      array.push(object[i].attributes);
    }
    return array;
  }

  function getLinks() {
    for (let i in link) {
      links[i] = {
        linkname: link[i].attributes.name,
        url: link[i].attributes.url,
      };
    }
    return links;
  }

  //get data of actors that were casted in this movie
  function getActors() {
    const castMembers = [];

    for (let i in cast) {
      castMembers.push(casts[i].actor.data[0]);
    }

    actorsCast = actor.filter((obj1) =>
      castMembers.find((obj2) => obj1.id === obj2.id)
    );
  }

  getGenres();
  getLinks();
  getAttributes(cast, casts);
  getActors();
  getAttributes(actorsCast, actors);

  return (
    <div className='page page-movie'>
      <PageHead
        title={`${movie.title_vn} (${year}) | Viet Cinema`}
        description='movie description'
      />

      <main>
        <div className='container'>
          <InfoSection
            title_vn={movie.title_vn}
            title_cn={movie.title_cn}
            title_eng={movie.title_eng}
            release_date={movie.release_date}
            genres={genres}
            synopsis={movie.synopsis}
            thumbnailData={movie.thumbnail.data}
            thumbnail={movie.thumbnail.data.attributes.url}
            watchlistInfo={watchlistInfo}
            links={links}
            type='movie'
          />
          <CastSection castData={casts} actorData={actors} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const movieData = await fetchAPI(
    `movies?filters[slug][$eq]=${params.slug}&populate=*`
  );
  const castData = await fetchAPI(
    `actor-movies?filters[movie][slug][$eq]=${params.slug}&populate=*`
  );
  const actorData = await fetchAPI(
    `actors?pagination[pageSize]=100&populate=*`
  );

  return {
    props: {
      movieData,
      castData,
      actorData,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const movieData = await fetchAPI(`movies?populate=*`);
  const movie = movieData['data'];
  const movies = [];

  function getMovie() {
    for (let i in movie) {
      movies.push(movie[i].attributes);
    }
    return movies;
  }

  getMovie();

  return {
    paths: movies.map(({ slug }) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: 'blocking',
  };
}
