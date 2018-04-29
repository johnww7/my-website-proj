import React from "react";

export class Article extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <div className="col-md-4">
        <h2 className="text-center">{title}</h2>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe rem nisi accusamus
        error velit animi non ipsa placeat. Recusandae, suscipit, soluta quibusdam accusamus
         a veniam quaerat eveniet eligendi dolor consectetur.
        </p>
        <a className="btn btn-default">More Info</a>
      </div>
    );
  }
}
