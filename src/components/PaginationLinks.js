import { Link } from "react-router-dom";

function PaginationLinksComponent (props) {
    console.log(props.currentPage)
    const pages = [];
    for (let page = 1; page < props.numPages+1; page++) {
        { page === props.currentPage ? 
            pages.push(
                <li className="page-item active">
                    <Link className="page-link" to={`/posts/?page=${page}`} >{page}</Link>
                </li>
            ) 
            : pages.push(
                <li className="page-item">
                        <Link className="page-link" to={`/posts/?page=${page}`} >{page}</Link>
                </li>
            ) 
        }
    }
    return (
        <div className="mb-5 mt-3" style={{margin: "0 auto"}}>
        <ul className="pagination">

            {props.currentPage === 1 ? 
                <li className="page-item disabled">
                    <Link className="page-link" to="#" >&laquo;</Link>
                </li>
            :
                <li class="page-item">
                    <Link className="page-link" to={`/posts/?page=${props.currentPage - 1}`} >&laquo;</Link>
                </li>
             }

            {pages}                    

            { props.currentPage === props.numPages ?
                <li class="page-item disabled">
                    <Link className="page-link" to="#" >&raquo;</Link>
                </li>
                :
                <li class="page-item">
                    <Link className="page-link" to={`/posts/?page=${props.currentPage + 1}`} >&raquo;</Link>
                </li>
            }

        </ul>
      </div>
    );
}

export default PaginationLinksComponent;