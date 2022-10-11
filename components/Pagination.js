export default function Pagination(props) {
  const { router, pageName, pageNo, filter, totalPages } = props;
  return (
    <div className='pagination'>
      <button
        className='button'
        onClick={() =>
          router.push(`/${pageName}?page=${+pageNo - 1}&filter=${filter}`)
        }
        disabled={+pageNo <= 1}
      >
        Prev
      </button>
      <button
        className='button'
        onClick={() =>
          router.push(`/${pageName}?page=${+pageNo + 1}&filter=${filter}`)
        }
        disabled={+pageNo == totalPages}
      >
        Next
      </button>
    </div>
  );
}
