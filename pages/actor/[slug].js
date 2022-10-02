import PageHead from '../../components/PageHead';
import Card from '../../components/Card';
import { fetchAPI } from '../../lib/api';
import InfoSection from '../../components/InfoSection';

export default function Actor({
  actorData,
  movieData,
  showData,
  movieCastData,
  showCastData,
}) {
  const actor = actorData['data'][0].attributes;
  const movie = movieData['data'];
  const show = showData['data'];
  const movieCast = movieCastData['data'];
  const showCast = showCastData['data'];
  const link = actor.links['data'];
  let links = [];
  let movies = [];
  let shows = [];
  let movieCasts = [];
  let showCasts = [];

  function getAttributes(object, array, type) {
    for (let i in object) {
      array.push(object[i].attributes);

      if (type) {
        array[i].type = type;
      }
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

  function getThumbnail(movieName, type) {
    if (type == 'movie') {
      var newMovie = [...movies];
      var movie = [];
      const index = newMovie.findIndex((i) => i.title_vn == movieName);
      movie = newMovie.splice(index, 1);

      if (movie[0].thumbnail.data !== null) {
        var thumbnail = `${movie[0].thumbnail.data.attributes.url}`;
      }
    } else if (type == 'show') {
      var newShow = [...shows];
      var show = [];
      const index = newShow.findIndex((i) => i.title_vn == movieName);
      show = newShow.splice(index, 1);

      if (show[0].thumbnail.data !== null) {
        var thumbnail = `${show[0].thumbnail.data.attributes.url}`;
      }
    }

    return thumbnail;
  }

  getAttributes(movieCast, movieCasts, 'movie');
  getAttributes(showCast, showCasts, 'show');
  getAttributes(movie, movies);
  getAttributes(show, shows);
  getLinks();

  return (
    <div className='page page-movie'>
      <PageHead
        title={`${actor.stagename} | Viet Cinema`}
        description={`Who is the Vietnamese actor ${actor.stagename}`}
      />

      <main>
        <p className='large'>{actor.hannom}</p>
        <div className='container'>
          <InfoSection
            type='actor'
            stagename={actor.stagename}
            birthname={actor.birthname}
            hannom={actor.hannom}
            born={actor.born}
            birthplace={actor.birthplace}
            thumbnailData={actor.thumbnail.data}
            thumbnail={actor.thumbnail.data.attributes.url}
            links={links}
          />
          <section className='section'>
            <h2>Movies</h2>
            <div className='association'>
              {movieCasts.length !== 0 ? (
                movieCasts.map(({ movie }, index) => (
                  <Card
                    key={index}
                    id={index}
                    type='movie'
                    primaryLabel={movie['data'][0].attributes.title_eng}
                    secondaryLabel={movie['data'][0].attributes.title_vn}
                    sideLabel={movie['data'][0].attributes.title_cn}
                    year={movie['data'][0].attributes.release_date}
                    slug={`${movie['data'][0].attributes.slug}`}
                    img={
                      getThumbnail(
                        movie['data'][0].attributes.title_vn,
                        'movie'
                      ) == null
                        ? '/no-img.jpg'
                        : getThumbnail(
                            movie['data'][0].attributes.title_vn,
                            'movie'
                          )
                    }
                  />
                ))
              ) : (
                <p>No movies available.</p>
              )}
            </div>
          </section>
          <section className='section'>
            <h2>Shows &amp; Dramas</h2>
            <div className='association'>
              {showCasts.length !== 0 ? (
                showCasts.map(({ show }, index) => (
                  <Card
                    key={index}
                    id={index}
                    type='show'
                    primaryLabel={show['data'][0].attributes.title_eng}
                    secondaryLabel={show['data'][0].attributes.title_vn}
                    sideLabel={show['data'][0].attributes.title_cn}
                    year={show['data'][0].attributes.release_date}
                    slug={`${show['data'][0].attributes.slug}`}
                    img={
                      getThumbnail(
                        show['data'][0].attributes.title_vn,
                        'show'
                      ) == null
                        ? '/no-img.jpg'
                        : getThumbnail(
                            show['data'][0].attributes.title_vn,
                            'show'
                          )
                    }
                  />
                ))
              ) : (
                <p>No shows/dramas available.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const actorData = await fetchAPI(
    `actors?filters[slug][$eq]=${params.slug}&populate=*`
  );
  const movieData = await fetchAPI(`movies?populate=*`);
  const showData = await fetchAPI(`shows?populate=*`);
  const movieCastData = await fetchAPI(
    `actor-movies?filters[actor][slug][$eq]=${params.slug}&sort[0]=[movie][release_date]:desc&pagination[pageSize]=100&populate=*`
  );
  const showCastData = await fetchAPI(
    `actor-shows?filters[actor][slug][$eq]=${params.slug}&sort[0]=[show][release_date]:desc&pagination[pageSize]=100&populate=*`
  );

  return {
    props: {
      actorData,
      movieData,
      showData,
      movieCastData,
      showCastData,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const actorData = await fetchAPI(`actors?populate=*`);
  const actor = actorData['data'];
  const actors = [];

  function getActor() {
    for (let i in actor) {
      actors.push(actor[i].attributes);
    }
    return actors;
  }

  getActor();

  return {
    paths: actors.map(({ slug }) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: 'blocking',
  };
}
