import Image from 'next/image';
export default function Thumbnail(props) {
  const { img, title } = props;
  return (
    <div className='thumbnail'>
      <Image src={img} alt={`${title} thumbnail`} layout='fill' />
    </div>
  );
}
