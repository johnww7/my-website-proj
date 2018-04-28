import React from "react";
import queryString from 'query-string';


import Article from "./src/components/Article";

export default class Archives extends React.Component {
  render() {
    const { query } = this.props.location.search;
    const { match } = this.props;
    const { article } = match;
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
        <h1>Archives ({match.params.article})</h1>
          article: {article}, date: {date}, filter: {filter}
        <div className="row">{Articles}</div>
      </div>
    );
  }
}
