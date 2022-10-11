import InfoLabel from './InfoLabel';
import Moment from 'react-moment';

export default function InfoBox(props) {
  const {
    type,
    title_eng,
    title_cn,
    title,
    year,
    genre,
    synopsis,
    episodes,
    seasons,
    stagename,
    birthname,
    birthplace,
    hannom,
    born,
  } = props;
  function getInfoBox() {
    switch (type) {
      case 'movie':
        return (
          <>
            <h1>
              {title_eng} (<Moment format='YYYY'>{year}</Moment>)
            </h1>
            <div className='details'>
              <div className='detail'>
                <InfoLabel label='Chữ Nôm Title' info={title_cn} />
                <InfoLabel label='Native Title' info={title} />
              </div>
              <div className='detail'>
                <InfoLabel
                  label='Release'
                  info={<Moment format='DD MMMM, YYYY'>{year}</Moment>}
                />
                <InfoLabel label='Genre' info={genre} link='true' type={type} />
              </div>
            </div>
            <div>
              <InfoLabel
                label='Synopsis'
                info={synopsis}
                className='paragraph'
              />
            </div>
          </>
        );
      case 'show':
        return (
          <>
            <h1>
              {title_eng} (<Moment format='YYYY'>{year}</Moment>)
            </h1>
            <div className='details'>
              <div className='detail'>
                <InfoLabel label='Chữ Nôm Title' info={title_cn} />
                <InfoLabel label='Native Title' info={title} />
                <InfoLabel
                  label='Release'
                  info={<Moment format='DD MMMM, YYYY'>{year}</Moment>}
                />
              </div>
              <div className='detail'>
                <InfoLabel label='Episodes' info={episodes} />
                <InfoLabel label='Seasons' info={seasons} />
                <InfoLabel label='Genre' info={genre} link='true' type={type} />
              </div>
            </div>
            <div>
              <InfoLabel label='Synopsis' info={synopsis} />
            </div>
          </>
        );
      case 'actor':
        return (
          <>
            <h1>{stagename}</h1>
            <div className='details'>
              <div className='detail'>
                <InfoLabel label='Birthname' info={birthname} />
                <InfoLabel label='Hán Nôm' info={hannom} />
              </div>
              <div className='detail'>
                <InfoLabel label='Born' info={born} date='true' />
                <InfoLabel label='Birthplace' info={birthplace} />
              </div>
            </div>
          </>
        );
    }
  }
  return <div className='info-box'>{getInfoBox()}</div>;
}
