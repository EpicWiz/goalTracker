import React, { Component } from 'react';

class Progcard extends Component {

  render() {
    const dateToString = this.props.data.dateCreate + '';
    const dateReplace = dateToString.slice(0, 10);

    const buttonStyle = {
      border: '1px solid #FFFFFF',
      color: '#FFFFFF',
      padding: '1px 5px',
      fontSize: '12px',
      fontFamily: 'Mallanna, sans-serif',
      position: 'relative',
      left: '15px',
      border: '1px solid black'
    };

    return (
      <li className="list-group-item">
        <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-4 text-center">
              {this.props.data.progressTitle}
            </div>
            <div className="col-sm-4 text-center">
              {dateReplace}
            </div>
            <div className="col-sm-4 text-center">
              <button className="btn btn-danger btn-sm" style={buttonStyle}>x</button>
            </div>
          </div>
        </div>
        <div className="card-body">
        <div className="row">
          <div className="col-sm-12 text-left">
            {this.props.data.progressBody}
        </div>
      </div>
      </div>
      </div>
    </li>
    );
  }

}

export default Progcard;
