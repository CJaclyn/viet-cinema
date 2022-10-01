export default function Links(props) {
  return (
        <div className='links'>
          { props.data.length !== 0 
            ? <>
                <p>Watch here</p>
                { props.data.map(({ linkname, url, index }) => (
                  <a href={ url } target="_blank" rel="noopener noreferrer" key={ index }>{ linkname }</a>
                ))}
              </> 
            : '' }
        </div>  
  )
}
