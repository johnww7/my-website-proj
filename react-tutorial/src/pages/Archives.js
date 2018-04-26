import React from "react";
import queryString from 'query-string';

export class Archives extends React.Component {
  render() {
    //const { query } = this.props.location;
    const { match } = this.props;
    const {date, filter} = queryString.parse(this.props.location.search);
    console.log(queryString.parse(this.props.location.search));
    return (
      <div>
        <h3>Archives ({match.params.article})</h3>
        <h4>date: {date}, filter: {filter}</h4>
      </div>
    );
  }
}
