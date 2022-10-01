import Link from 'next/link';
import Moment from 'react-moment';
import Thumbnail from './Thumbnail';

export default function Card(props) {
  const side = () => {
    if (props.type === 'movie' || props.type === 'show') {
      return (
        <p className='side-detail'>
          {props.sideLabel} · <Moment format='YYYY'>{props.year}</Moment>
        </p>
      );
    } else {
      return <p className='side-detail'>{props.sideLabel}</p>;
    }
  };

  return (
    <Link href={`/${props.type}/${props.slug}`}>
      <a className='card'>
        <div className='card-main white'>
          <Thumbnail title={props.title} img={props.img} />
          <p className='secondary-label'>{props.secondaryLabel}</p>
          <p className='card-label'>{props.primaryLabel}</p>
        </div>
        <div className='card-side white'>{side()}</div>
      </a>
    </Link>
  );
}
