import Card from './Card';

export default function DisplayMovies(props) {
  function getType() {
    switch (props.type) {
      case 'movie':
      case 'show':
        return (
          <>
            {props.data.map(
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
                  type={props.type}
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
            {props.data.map(
              ({ slug, stagename, hannom, birthname, thumbnail }, index) => (
                <Card
                  primaryLabel={stagename}
                  secondaryLabel={birthname}
                  sideLabel={hannom}
                  type={props.type}
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
        return <p>No {props.type}s found.</p>;
    }
  }

  return <div className='cards-container'>{getType()}</div>;
}
