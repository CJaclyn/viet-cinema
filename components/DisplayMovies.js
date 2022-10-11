import Card from './Card';

export default function DisplayMovies(props) {
  const { type, data } = props;

  function getType() {
    switch (type) {
      case 'movie':
      case 'show':
        return (
          <>
            {data.map(
              (
                {
                  slug,
                  title_vn,
                  title_cn,
                  title_eng,
                  release_date,
                  thumbnail,
                },
                index
              ) => (
                <Card
                  type={type}
                  slug={slug}
                  primaryLabel={title_eng}
                  secondaryLabel={title_vn}
                  sideLabel={title_cn}
                  year={release_date}
                  key={index}
                  id={index}
                  img={
                    thumbnail.data == null
                      ? '/no-img.jpg'
                      : `${thumbnail.data.attributes.url}`
                  }
                />
              )
            )}
          </>
        );
      case 'actor':
        return (
          <>
            {data.map(
              ({ slug, stagename, hannom, birthname, thumbnail }, index) => (
                <Card
                  primaryLabel={stagename}
                  secondaryLabel={birthname}
                  sideLabel={hannom}
                  type={type}
                  slug={slug}
                  key={index}
                  id={index}
                  img={
                    thumbnail.data == null
                      ? '/no-img.jpg'
                      : `${thumbnail.data.attributes.url}`
                  }
                />
              )
            )}
          </>
        );
      default:
        return <p>No {type}s found.</p>;
    }
  }

  return <div className='cards-container'>{getType()}</div>;
}
