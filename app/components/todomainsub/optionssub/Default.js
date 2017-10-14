import React, { Component } from 'react';

class Default extends Component {

  render() {

    const { firstName, lastName, username } = this.props.details.details;

    return (
      <div className="card">
        <img className="card-img-top" src="http://www.needelman.com/wp-content/uploads/2016/05/man-placeholder_27.jpg" alt="user" />
        <div className="card-body">
          <h4>Welcome, {firstName}!</h4>
          <p className="card-text">
            Look for news and updates in your email, {username}.
          </p>
        </div>

      </div>
    );
  }

}

export default Default;
