import React from "react";

export class Archives extends React.Component {
  render() {
    //const { query } = this.props.location;
    const { match } = this.props;
    const {date, filter} = this.props.location.search;
    return (
      <div>
        <h3>Archives ({match.params.article})</h3>
        <h4>date: {date}, filter: {filter}</h4>
      </div>
    );
  }
}
