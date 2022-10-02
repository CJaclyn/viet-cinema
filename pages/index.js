import PageHead from '../components/PageHead';
import { fetchAPI } from '../lib/api';
import DisplayMovies from '../components/DisplayMovies';
import HoverCard from '../components/HoverCard';
import Button from '../components/Button';

export default function Home({ latestMovies, latestShows, featuredMovies }) {
  const movieData = latestMovies['data'];
  const showData = latestShows['data'];
  const featuredData = featuredMovies['data'];
  let movies = [];
  let shows = [];
  let featured = [];

  function getAttributes(object, array, type) {
    for (let i in object) {
      array.push(object[i].attributes);
      array[i].type = type;
    }
    return array;
  }

  getAttributes(movieData, movies, 'movie');
  getAttributes(showData, shows, 'show');
  getAttributes(featuredData, featured, 'movie');

  return (
    <div className='page page-home' id='home'>
      <PageHead
        title='Viet Cinema | Vietnamese Movies, Dramas, and Shows'
        description='Watch Vietnamese movies, dramas, and shows on Viet Cinema.'
      />

      {featured.map(({ video_prev, slug }, index) =>
        video_prev.data !== null ? (
          <video
            src={video_prev.data.attributes.url}
            className='video-background'
            id={slug}
            key={index}
            muted
            autoPlay
            loop
            type='video/mp4'
          >
            <p>Your browser doesn't support this video.</p>
          </video>
        ) : (
          ''
        )
      )}

      <header id='header'>
        <h1>Viet Cinema</h1>
        <p>Vietnamese movies, shows, and dramas here.</p>
      </header>

      <main>
        <section className='featured'>
          <h1>Featured</h1>
          <div className='cards-container'>
            {featured.map(
              (
                {
                  slug,
                  title_vn,
                  title_cn,
                  title_eng,
                  release_date,
                  thumbnail,
                  video_prev,
                },
                index
              ) => (
                <HoverCard
                  slug={slug}
                  title={title_vn}
                  title_eng={title_eng}
                  title_cn={title_cn}
                  year={release_date}
                  key={index}
                  id={index}
                  img={
                    thumbnail.data == null
                      ? '/no-img.jpg'
                      : `${thumbnail.data.attributes.url}`
                  }
                  video={video_prev.data !== null ? true : false}
                />
              )
            )}
          </div>
        </section>

        <section className='latest'>
          <h1>Latest Movies</h1>
          <DisplayMovies data={movies} type='movie' />
          <Button link='/movies' name='All movies' />
        </section>

        <section className='latest'>
          <h1>Latest Shows &amp; Dramas</h1>
          <DisplayMovies data={shows} type='show' />
          <Button link='/shows' name='All shows' />
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const latestMovies = await fetchAPI(
    `movies?sort[0]=release_date:desc&pagination[pageSize]=8&populate=*`
  );
  const featuredMovies = await fetchAPI(
    `movies?sort[0]=release_date:desc&pagination[pageSize]=4&filters[featured][$eq]=true&populate=*`
  );
  const latestShows = await fetchAPI(
    `shows?sort[0]=release_date:desc&pagination[pageSize]=8&populate=*`
  );

  return {
    props: {
      latestMovies,
      featuredMovies,
      latestShows,
    },
    revalidate: 60,
  };
}
