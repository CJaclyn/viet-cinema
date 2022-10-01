
export default function Pagination(props) {
  return (
    <div className="pagination">
        <button 
            className="button" 
            onClick = {() => props.router.push(`/${ props.pageName }?page=${ +props.pageNo - 1 }&filter=${ props.filter }`)}
            disabled = { +props.pageNo <= 1 }
            >
            Prev
            </button>
            <button 
            className="button" 
            onClick = {() => props.router.push(`/${ props.pageName }?page=${ +props.pageNo + 1 }&filter=${ props.filter }`)}
            disabled = { +props.pageNo == props.totalPages }
            >
            Next
        </button>
    </div>
  )
}
