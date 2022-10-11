import InfoBox from './InfoBox';
import Image from 'next/image';
import Links from './Links';
import Watchlist from './Watchlist';

export default function InfoSection(props) {
  const {
    thumbnailData,
    thumbnail,
    title,
    watchlistInfo,
    links,
    type,
    title_vn,
    title_cn,
    title_eng,
    release_date,
    episodes,
    seasons,
    genres,
    synopsis,
    stagename,
    birthname,
    birthplace,
    born,
    hannom,
  } = props;
  
  return (
    <section className='info-section'>
      <div className='col'>
        <div className='infobox-image'>
          <div className='thumbnail'>
            <Image
              src={thumbnailData == null ? '/no-img.jpg' : `${thumbnail}`}
              alt={`${title} thumbnail`}
              layout='fill'
            />
          </div>
        </div>
        {watchlistInfo ? <Watchlist movie={watchlistInfo} action='add' /> : ''}
        <Links data={links} />
      </div>
      <div className='col info-box-container'>
        <InfoBox
          type={type}
          title={title_vn}
          title_cn={title_cn}
          title_eng={title_eng}
          year={release_date}
          episodes={episodes}
          seasons={seasons}
          genre={genres}
          synopsis={
            synopsis == null || synopsis == '' ? 'No synopsis yet.' : synopsis
          }
          stagename={stagename}
          birthname={birthname}
          hannom={hannom}
          born={born}
          birthplace={birthplace}
        />
      </div>
    </section>
  );
}
