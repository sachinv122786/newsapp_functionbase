import React  from 'react'

const NewsItems =(props)=> {
   let {title,description,img_url,newUrl,author,date,source} = props;
    return (
      <div>
      <div className="card my-2">
        <div>
          <span className="badge text-dark rounded-pill bg-warning" style={{display: "flex",justifyContent: "flex-end",position: "absolute",right: "0"}} >{source}</span>
        </div>
  <img src={img_url} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} <br></br> On {new Date(date).toGMTString()} </small></p>
    <a href={newUrl} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
}

export default NewsItems
