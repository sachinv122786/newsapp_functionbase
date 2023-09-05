import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitaliFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalarticles: 0,
    };
    document.title = `${this.capitaliFirstLetter(
      this.props.category
    )} - NewsApp`;
  }
  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=${this.state.page}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(40);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          loading: false,
          articles: result.articles,
          totalarticles: result.totalResults,
        });
        this.props.setProgress(100);
      });
  }

  componentDidMount() {
    this.updateNews();
  }

  handlepreviousclick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handlenextclick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=${this.state.page}&category=${this.props.category}&apiKey=b435ef2ee4324425ace5c9a5de0dbca9&pageSize=${this.props.pageSize}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          loading: false,
          articles: this.state.articles.concat(result.articles),
          totalarticles: result.totalResults,
        });
      });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewApp -Top {this.capitaliFirstLetter(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        {/* {!this.state.loading && */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles !== this.state.totalarticles}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
            disabled={this.state.page < 1}
            className="btn  btn-dark mx-2"
            onClick={this.handlepreviousclick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalarticles / this.props.pageSize)
            }
            className="btn btn-dark mx-2"
            onClick={this.handlenextclick}
          >
            Next &rarr;
          </button>
        </div> */}
</>
        );
  }
}

export default News;
