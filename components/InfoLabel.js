import Link from 'next/link';
import Moment from 'react-moment';

export default function InfoLabel(props) {
  const { info, type, label, link, date, className } = props;

  function getLink() {
    return info.map((genre, index) => (
      <Link href={`/${type}s?filter=${genre}`} key={index}>
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
      <p className='label'>{label}</p>
      {link === 'true' ? (
        <p className='info'>{getLink()}</p>
      ) : date === 'true' ? (
        <p className='info'>
          <Moment format='DD MMMM, YYYY'>{info}</Moment> ({getAge(info)})
        </p>
      ) : (
        <p className={`info ${className}`}>{info}</p>
      )}
    </>
  );
}
