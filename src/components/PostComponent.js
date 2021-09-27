import { Link } from "react-router-dom";

function PostComponent(props) {

    return (
        <div className="col-md-6" style={{padding: "1.5rem"}}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="mb-0">{props.post.title}</h3>
                    <div className="mb-1 text-muted">  </div>
                    <hr className="my-1"/>
                    <p className="card-text mb-auto"> {props.post.body }</p>

                    {props.showFullLink ? <Link to={`/posts/${props.post._id}`} className="stretched-link mt-1">Read Full Post</Link> : null}
                </div>
            </div>
        </div>
    );
  }

  export default PostComponent;