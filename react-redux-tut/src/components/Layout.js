import React from "react";
import { connect } from "react-redux";
import {fetchUser} from "../actions/userActions";

const layoutExt = connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets,
  };
})(Layout)

export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  render () {
    console.log(this.props);
    return <h1>{this.props.user.name}</h1>
  }
}
