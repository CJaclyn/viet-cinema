import Link from 'next/link';

export default function Button(props) {
  return (
    <Link href={props.link}>
      <a className='button'>{props.name}</a>
    </Link>
  );
}
