import React from "react";

export class Footer extends React.Component {
  render() {
    const footerStyle = {
      textAlign: 'center'
    }
    return (
      <footer>
        <div className="row">
          <div className="col-lg-12" style={footerStyle}>
            <p>Copyright &copy; PerfectTodos.com</p>
          </div>
        </div>
      </footer>
    );
  }
}
