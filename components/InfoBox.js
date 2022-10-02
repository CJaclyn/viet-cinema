import InfoLabel from './InfoLabel';
import Moment from 'react-moment';

export default function InfoBox(props) {
  function getInfoBox() {
    switch (props.type) {
      case 'movie':
        return (
          <>
            <h1>
              {props.title_eng} (<Moment format='YYYY'>{props.year}</Moment>)
            </h1>
            <div className='details'>
              <div className='detail'>
                <InfoLabel label='Chữ Nôm Title' info={props.title_cn} />
                <InfoLabel label='Native Title' info={props.title} />
              </div>
              <div className='detail'>
                <InfoLabel
                  label='Release'
                  info={<Moment format='DD MMMM, YYYY'>{props.year}</Moment>}
                />
                <InfoLabel
                  label='Genre'
                  info={props.genre}
                  link='true'
                  type={props.type}
                />
              </div>
            </div>
            <div>
              <InfoLabel
                label='Synopsis'
                info={props.synopsis}
                className='paragraph'
              />
            </div>
          </>
        );
      case 'show':
        return (
          <>
            <h1>
              {props.title_eng} (<Moment format='YYYY'>{props.year}</Moment>)
            </h1>
            <div className='details'>
              <div className='detail'>
                <InfoLabel label='Chữ Nôm Title' info={props.title_cn} />
                <InfoLabel label='Native Title' info={props.title} />
                <InfoLabel
                  label='Release'
                  info={<Moment format='DD MMMM, YYYY'>{props.year}</Moment>}
                />
              </div>
              <div className='detail'>
                <InfoLabel label='Episodes' info={props.episodes} />
                <InfoLabel label='Seasons' info={props.seasons} />
                <InfoLabel
                  label='Genre'
                  info={props.genre}
                  link='true'
                  type={props.type}
                />
              </div>
            </div>
            <div>
              <InfoLabel label='Synopsis' info={props.synopsis} />
            </div>
          </>
        );
      case 'actor':
        return (
          <>
            <h1>{props.stagename}</h1>
            <div className='details'>
              <div className='detail'>
                <InfoLabel label='Birthname' info={props.birthname} />
                <InfoLabel label='Hán Nôm' info={props.hannom} />
              </div>
              <div className='detail'>
                <InfoLabel label='Born' info={props.born} date='true' />
                <InfoLabel label='Birthplace' info={props.birthplace} />
              </div>
            </div>
          </>
        );
    }
  }
  return <div className='info-box'>{getInfoBox()}</div>;
}
