import React from 'react'
import ReactPaginate from 'react-paginate'

function Paginaton(props) {
const {count, limit, handlePageClick, initialpage} = props
  return (
    <ReactPaginate 
    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel= {'...'}
                    pageCount={Math.ceil(count / limit)}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={3}   
                    onPageChange={handlePageClick}
                    forcePage={initialpage}
                    containerClassName={"pagination"}
                    pageClassName={"pageitem"}
                    pageLinkClassName={"pagelink"}
                    previousClassName={"pageitem"}
                    previousLinkClassName={"pagelink"}
                    nextClassName={"pageitem"}
                    nextLinkClassName={"pagelink"}
                    breakClassName={"pageitem"}
                    breakLinkClassName={"pagelink"}
                    activeClassName={"activebtn"}

    /> 
  )
}

export default Paginaton