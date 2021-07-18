import React, { Component } from 'react';

export default class Test extends Component {
  state = {
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };

  handelClick = (el) => {
    console.log('clicked' + el);

    setTimeout(() => {
      console.log('deleted');
    }, 1000);
    this.setState({});
  };
  render() {
    return (
      <div>
        {this.state.count.map((el, idx) => {
          return (
            <button onClick={() => this.handelClick(el)} key={idx}>
              {el}
            </button>
          );
        })}
      </div>
    );
  }
}
