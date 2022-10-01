import InfoBox from './InfoBox';
import Image from 'next/image';
import Links from './Links';
import Watchlist from './Watchlist';

export default function InfoSection(props) {
  return (
    <section className='info-section'>
      <div className='col'>
        <div className='infobox-image'>
          <div className='thumbnail'>
            <Image
              src={
                props.thumbnailData == null
                  ? '/no-img.jpg'
                  : `${props.thumbnail}`
              }
              alt={`${props.title} thumbnail`}
              layout='fill'
            />
          </div>
        </div>
        {props.watchlistInfo ? (
          <Watchlist movie={props.watchlistInfo} action='add' />
        ) : (
          ''
        )}
        <Links data={props.links} />
      </div>
      <div className='col info-box-container'>
        <InfoBox
          type={props.type}
          title={props.title_vn}
          title_cn={props.title_cn}
          title_eng={props.title_eng}
          year={props.release_date}
          episodes={props.episodes}
          seasons={props.seasons}
          genre={props.genres}
          synopsis={
            props.synopsis == null || props.synopsis == ''
              ? 'No synopsis yet.'
              : props.synopsis
          }
          stagename={props.stagename}
          birthname={props.birthname}
          hannom={props.hannom}
          born={props.born}
          birthplace={props.birthplace}
        />
      </div>
    </section>
  );
}
