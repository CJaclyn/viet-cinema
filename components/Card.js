import Link from 'next/link';
import Moment from 'react-moment';
import Thumbnail from './Thumbnail';

export default function Card(props) {
  const {
    type,
    sideLabel,
    year,
    slug,
    id,
    title,
    img,
    secondaryLabel,
    primaryLabel,
  } = props;

  const side = () => {
    if (type === 'movie' || type === 'show') {
      return (
        <p className='side-detail'>
          {sideLabel} · <Moment format='YYYY'>{year}</Moment>
        </p>
      );
    } else {
      return <p className='side-detail'>{sideLabel}</p>;
    }
  };

  return (
    <Link href={`/${type}/${slug}`}>
      <a className='card' key={id}>
        <div className='card-main white'>
          <Thumbnail title={title} img={img} />
          <p className='secondary-label'>{secondaryLabel}</p>
          <p className='card-label'>{primaryLabel}</p>
        </div>
        <div className='card-side white'>{side()}</div>
      </a>
    </Link>
  );
}
