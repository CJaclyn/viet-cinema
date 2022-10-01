import Link from 'next/link';
import Moment from 'react-moment';
import Thumbnail from './Thumbnail';
import { useState } from 'react';

export default function HoverCard(props) {
  const [hover, setHover] = useState(false);
  const { video, slug, title, title_eng, title_cn, img, year } = props;

  if (typeof window !== 'undefined') {
    if (video === true && video !== null) {
      const video = document.getElementById(slug);

      if (hover === true) {
        video.style.display = 'block';
      }

      if (hover !== true && video !== null) {
        video.style.display = 'none';
      }
    }
  }

  return (
    <Link href={`/movie/${slug}`}>
      <a className='card'>
        <div
          className='card-main'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Thumbnail title={title} img={img} />
          <h3 className='secondary-label'>{title}</h3>
          <h3 className='card-label'>{title_eng}</h3>
        </div>
        <div className='card-side'>
          <p className='side-detail'>
            {title_cn} · <Moment format='YYYY'>{year}</Moment>
          </p>
        </div>
      </a>
    </Link>
  );
}
