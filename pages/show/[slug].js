import { fetchAPI } from '../../lib/api';
import PageHead from '../../components/PageHead';
import InfoSection from '../../components/InfoSection';
import CastSection from '../../components/CastSection';

export default function Show({ showData, actorData, castData }) {
  const show = showData['data'][0].attributes;
  const cast = castData['data'];
  const actor = actorData['data'];
  const link = show.links['data'];
  const genre = show.genres['data'];
  const year = show.release_date.slice(0, 4);
  let thumbnail = '';
  if (show.thumbnail.data !== null) {
    thumbnail = show.thumbnail.data.attributes.url;
  }
  const watchlistInfo = {
    slug: show.slug,
    title_vn: show.title_vn,
    title_eng: show.title_eng,
    title_cn: show.title_cn,
    year: year,
    type: 'show',
    thumbnail: thumbnail,
  };
  let links = [];
  let genres = [];
  let casts = [];
  let actorsCast = [];
  let actors = [];

  (function getGenres() {
    for (let i in genre) {
      genres.push(genre[i].attributes.genre);
    }

    //remove 'All' from genres list
    genres = genres.filter((item) => item !== 'All');

    return genres;
  })();

  (function getLinks() {
    for (let i in link) {
      links[i] = {
        linkname: link[i].attributes.name,
        url: link[i].attributes.url,
      };
    }

    return links;
  })();

  function getAttributes(object, array) {
    for (let i in object) {
      array.push(object[i].attributes);
    }
    return array;
  }

  function getActors() {
    const castMembers = [];

    for (let i in cast) {
      castMembers.push(casts[i].actor.data[0]);
    }

    actorsCast = actor.filter((o1) =>
      castMembers.find((o2) => o1.id === o2.id)
    );
  }

  getAttributes(cast, casts);
  getActors();
  getAttributes(actorsCast, actors);

  return (
    <div className='page page-movie'>
      <PageHead
        title={`${show.title_vn} (${year}) | Viet Cinema`}
        description='movie description'
      />

      <main>
        <div>
          <InfoSection
            title_vn={show.title_vn}
            title_cn={show.title_cn}
            title_eng={show.title_eng}
            release_date={show.release_date}
            episodes={show.episodes}
            seasons={show.seasons}
            genres={genres}
            synopsis={show.synopsis}
            thumbnailData={show.thumbnail.data}
            thumbnail={show.thumbnail.data.attributes.url}
            watchlistInfo={watchlistInfo}
            links={links}
            type='show'
          />
          <CastSection castData={casts} actorData={actors} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const showData = await fetchAPI(
    `shows?filters[slug][$eq]=${params.slug}&populate=*`
  );
  const actorData = await fetchAPI(
    `actors?pagination[pageSize]=100&populate=*`
  );
  const castData = await fetchAPI(
    `actor-shows?filters[show][slug][$eq]=${params.slug}&populate=*`
  );

  return {
    props: {
      showData,
      actorData,
      castData,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const showData = await fetchAPI(`shows?populate=*`);
  const show = showData['data'];
  const shows = [];

  function getShow() {
    for (let i in show) {
      shows.push(show[i].attributes);
    }
    return shows;
  }

  getShow();

  return {
    paths: shows.map(({ slug }) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: 'blocking',
  };
}
