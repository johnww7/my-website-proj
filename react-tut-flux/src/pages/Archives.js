import React from "react";
import queryString from 'query-string';


import {Article} from "../components/Article";

export default class Archives extends React.Component {
  render() {
  //  const { query } = this.props.location.search;
    const { match } = this.props;
    const { articleInfo } = match.params;
    const {date, filter} = queryString.parse(this.props.location.search);
    //console.log(queryString.parse(this.props.location.search));

    const Articles = [
      "Some Article",
      "Some Other Article",
      "Another Article",
      "Still More",
      "Fake Article",
      "Partial Article",
      "Yet Another Article"
    ].map((title, i) => <Article key={i} title={title}/>);

    return (
      <div>
        <h1>Archives</h1>
          article: {articleInfo}, date: {date}, filter: {filter}
        <div className="row">
          {Articles}
        </div>
      </div>
    );
  }
}
