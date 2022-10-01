import Link from 'next/link';
import Moment from 'react-moment';

export default function InfoLabel(props) {
  function getLink() {
    return props.info.map((genre) => (
      <Link href={`/${props.type}s?filter=${genre}`}>
        <a className='genre'>{genre}</a>
      </Link>
    ));
  }

  function getAge(born) {
    const today = new Date();
    const birthday = new Date(born);
    let thisYear = 0;

    if (today.getMonth() < birthday.getMonth()) {
      thisYear = 1;
    } else if (
      today.getMonth() === birthday.getMonth() &&
      today.getDate() < birthday.getDate()
    ) {
      thisYear = 1;
    }

    const age = today.getFullYear() - birthday.getFullYear() - thisYear;

    return age;
  }

  return (
    <>
      <p className='label'>{props.label}</p>
      {props.link === 'true' ? (
        <p className='info'>{getLink()}</p>
      ) 
      : props.date === 'true' ? (
        <p className='info'><Moment format='DD MMMM, YYYY'>{props.info}</Moment> ({getAge(props.info)})</p>
      )
      : (
        <p className='info'>{props.info}</p>
      ) }
    </>
  );
}
