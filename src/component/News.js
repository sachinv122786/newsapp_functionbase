import { useEffect,useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
  const [articles,setArticles] =  useState([])
  const [page,setPage] =  useState(1)
  const [loading,setLoading] =  useState(false)
  const [totalarticles,setTotalarticles] =  useState(0)

  // document.title = `${capitaliFirstLetter(
  //   props.category
  // )} - NewsApp`;
  const capitaliFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async()=> {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&page=${page}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(40);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setArticles(articles,result.articles)
        setLoading(false)
        setTotalarticles(totalarticles,result.totalarticles)
        props.setProgress(100);
      });
  }

  useEffect(()=>{
    updateNews();
  },[])
  
//  const handlepreviousclick = async () => {
//     setPage(page - 1 );
//     updateNews();
//   };

//   const handlenextclick = async () => {
//     setPage(page + 1 );
//     updateNews();
//   };

  const fetchMoreData = async () => {
    setPage(page + 1 );
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&page=${page}&category=${props.category}&apiKey=b435ef2ee4324425ace5c9a5de0dbca9&pageSize=${props.pageSize}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setArticles(articles.concat(result.articles))
        setLoading(false)
        setTotalarticles(totalarticles,result.totalarticles)
      });
  };

    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewApp -Top {capitaliFirstLetter(props.category)} Headlines
        </h1>
        {/* {loading && <Spinner />} */}
        {/* {!loading && */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles !== totalarticles}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                console.log(element.title)
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title : ""} //render and make slice
                      description={
                        element.description ? element.description : ""
                      }
                      img_url={element.urlToImage}
                      newUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page < 1}
            className="btn  btn-dark mx-2"
            onClick={handlepreviousclick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalarticles / props.pageSize)
            }
            className="btn btn-dark mx-2"
            onClick={handlenextclick}
          >
            Next &rarr;
          </button>
        </div> */}
</>
        );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
