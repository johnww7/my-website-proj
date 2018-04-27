import React from "react";
import {Link} from "react-router-dom";

export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collaapsed } = this.state;
    const featuredClass = this.props.location === "/" ? "active" : "";
    const archivesClass = this.props.location.match(/^\/archives/) ? "active" : "";
    const settingssClass = this.props.location.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className={"navbar-collapse " +navClass}id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={featuredClass}>
                <Link to="/" onClick={this.toggleClick.bind(this)}>Featured</Link>
              </li>
              <li className={archivesClass}>
                <Link to="/archives" onClick={this.toggleClick.bind(this)}>Archives</Link>

              </li>
              <li className={settingssClass}>
                <Link to="/settings" onClick={this.toggleClick.bind(this)}>Settings</Link>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    );

  }

}
