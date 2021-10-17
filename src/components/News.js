import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }
    static PropsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-EagleNews`;
    }
    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f74b610ae9842f7b1a829fa10955e9b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let data = await fetch(url);
        this.props.setProgress(35);

        let parsedData = await data.json()
        this.props.setProgress(70);

        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);

    }
    async componentDidMount() {
        this.updateNews();
    }
    handlePrevClick = async () => {
        console.log("previous");
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    handleNextClick = async () => {
        console.log("Next");
        this.setState({ page: this.state.page + 1 });
        this.updateNews();

    }
    fetchMoreData = async() => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f74b610ae9842f7b1a829fa10955e9b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
    };
    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '40px 0px',marginTop: '90px'}}>EagleNews- TOP HEADLINES {this.capitalizeFirstLetter(this.props.category)}</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>

                        })}
                    </div>
                    </div>

                </InfiniteScroll>
            </ >


        )
    }
}
export default News
