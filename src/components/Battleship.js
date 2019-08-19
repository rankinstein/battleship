import React from "react";

import Game from './pages/Game'
import Intro from './pages/Intro'
import "./battleship.css";

class Battleship extends React.Component {
  constructor() {
    super()
    this.state = {
      view: 'intro'
    }
  }

  goToGame = () => {
    this.setState({ view: 'game' })
  }

  goToIntro = () => {
    this.setState({ view: 'intro' })
  }

  render() {
    return (
      <div className="container">
        {
          this.state.view === 'game' ? <Game exit={this.goToIntro} width={8} height={8} /> : <Intro start={this.goToGame} />
        }
      </div>
    );
  }
}

export default Battleship;
