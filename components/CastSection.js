import Card from './Card';

export default function CastSection(props) {
  const { actorData, castData } = props;

  function getThumbnail(actorName) {
    const newActor = [...actorData];
    var actor = [];

    const actorIndex = newActor.findIndex((i) => i.stagename == actorName);
    actor = newActor.splice(actorIndex, 1);

    if (actor[0].thumbnail.data !== null) {
      var thumbnail = `${actor[0].thumbnail.data.attributes.url}`;
    }

    return thumbnail;
  }

  return (
    <section className='section'>
      <h2>Cast</h2>
      <div className='association'>
        {castData.length !== 0 ? (
          castData.map(({ role, actor }, index) => (
            <Card
              type='actor'
              primaryLabel={actor['data'][0].attributes.stagename}
              secondaryLabel={role}
              sideLabel={actor['data'][0].attributes.hannom}
              slug={actor['data'][0].attributes.slug}
              key={index}
              id={index}
              img={
                getThumbnail(actor['data'][0].attributes.stagename) === null
                  ? '/no-img.jpg'
                  : getThumbnail(actor['data'][0].attributes.stagename)
              }
            />
          ))
        ) : (
          <p>No cast available.</p>
        )}
      </div>
    </section>
  );
}
