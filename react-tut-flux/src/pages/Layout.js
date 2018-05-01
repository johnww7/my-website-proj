import React from "react";
import {Link, Switch, Route, withRouter} from "react-router-dom";

import {Footer} from "../components/Footer";
import {Nav} from "../components/Nav";

import Archives from "./Favorites";
import Settings from "./Settings";
import Featured from "./Todos";

export class Layout extends React.Component {

  render() {
  const {location} = this.props;
  const containerStyle = {
    marginTop: "60px"
  }

  return (
    <div>
      <Nav location ={location} />
      <div className="container" style={containerStyle}>
        <div className="row">
          <div className="col-lg-12">
            <h1>KillerNews.net</h1>
            <Switch>
              <Route  exact path="/archives/:article" component={Archives} />
              <Route exact path="/archives" component={Archives} />
              <Route  exact path="/settings" component={Settings} />
              <Route  exact path="/" component={Featured} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}



/*
  export const layout = withRouter(Layout);
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
 */}
