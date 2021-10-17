import React, { Component } from 'react'

export class NewsItems extends Component {

    render() {
        let { title, description, imageUrl, newsUrl,author,date,source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imageUrl?"https://www.theweek.in/content/dam/week/news/2020/images/2021/1/13/Pfizer-COVID-19-vaccine-during-a-vaccination-clinic-ap.jpg":imageUrl} class="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...<span className="badge bg-secondary">{source}</span></h5>
                        <p className="card-text">{description}....</p>
                        <p class="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-info">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems
