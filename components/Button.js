import Link from 'next/link';

export default function Button(props) {
  const { link, name } = props;

  return (
    <Link href={link}>
      <a className='button'>{name}</a>
    </Link>
  );
}
