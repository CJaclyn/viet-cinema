import Image from 'next/image'
export default function Thumbnail(props) {
  return (
    <div className='thumbnail'>
        <Image 
            src={ props.img }
            alt={`${ props.title } thumbnail`}
            layout='fill'
        />
    </div>
  )
}
