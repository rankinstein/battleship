import React from "react";

class Intro extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to battleship!</h1>
        <button onClick={this.props.start}>New Game</button>
      </div>
    );
  }
}

export default Intro;
