import React from "react";
import {Link, Switch, Route, withRouter} from "react-router-dom";

import {Featured} from "./Featured";
import {Archives} from "./Archives";
import {Settings} from "./Settings";

class Layout extends React.Component {
  navigate() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h1>KillerNews.net</h1>
        <div>
          <Switch>
            <Route  exact path="/archives/:article" component={Archives} />
            <Route  exact path="/settings" component={Settings} />
            <Route  exact path="/" component={Featured} />
          </Switch>
        </div>
        <Link to="/archives" className="test" className="btn btn-success">archives</Link>
        <Link to="/settings" className="btn btn-success">settings</Link>
        <button onClick={this.navigate.bind(this)}>featured</button>
      </div>
    );
  }
}

export const layout = withRouter(Layout);

/*

<div>
  <h1>KillerNews.net</h1>

  <Link to="/archives" className="btn btn-success">archives</Link>
  <Link to="/settings" className="btn btn-success">settings</Link>
  <button onClick={this.navigate.bind(this)}>featured</button>
</div>
 */
