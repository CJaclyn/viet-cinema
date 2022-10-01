{props.data.length == 0 ? (
    <p>No {props.type}s found.</p>
  ) : (
    <>
      {props.data.map(
        (
          { slug, title_vn, title_cn, title_eng, release_date, thumbnail },
          index
        ) => (
          <Card
            type={props.type}
            slug={slug}
            title={title_vn}
            title_eng={title_eng}
            title_cn={title_cn}
            year={release_date}
            key={index}
            img={
              thumbnail.data == null
                ? '/no-img.jpg'
                : `${thumbnail.data.attributes.url}`
            }
          />
        )
      )}
    </>
  )}