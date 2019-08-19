import React from "react";

import shuffle from 'lodash/shuffle'
import random from 'lodash/random'
import sample from 'lodash/sample'

import generateBoats from '../../logic/generateBoats'
import { checkTarget } from '../../logic/utils'

import "./game.css"
import Board from "../Board";
import Overlay from '../Overlay'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      p1Board: generateBoats({ width: props.width, height: props.height }),
      p2Board: generateBoats({ width: props.width, height: props.height }),
      p1Moves: [],
      p2Moves: [],
      activePlayer: 'p1', // 'p1', 'p2'
      turnPhase: 'start', // 'start', 'fire', 'confirm', 'feedback'
      turnContext: null
    }
  }

  startTurn = () => {
    this.setState({
      turnPhase: 'fire'
    })
  }

  chooseTarget = (key) => (move) => {
    const validKeys = ['p1Moves', 'p2Moves']
    if (validKeys.includes(key)) {
      console.log('Save for', key, 'Position', move)
      this.setState({
        turnPhase: 'confirm',
        turnContext: { x: move[0], y: move[1] }
      })
    } else {
      console.error('Bad move key: ' + key)
    }
  }

  confirmTarget = (player) => (move) => {
    console.log('Confirmed target', player, 'Position', move)
    const { activePlayer, p1Board, p2Board, p1Moves, p2Moves } = this.state
    const playerKey = `${player}Moves`
    const targetBoard = activePlayer === 'p1' ? p2Board : p1Board
    const moveHistory = activePlayer === 'p1' ? p1Moves : p2Moves
    const result = checkTarget(move, targetBoard, moveHistory)
    this.setState({
      turnPhase: 'feedback',
      turnContext: result,
      [playerKey]: [...this.state[playerKey], move]
    })
  }

  endTurn = () => {
    this.setState(state => ({
      turnPhase: 'start',
      turnContext: null,
      activePlayer: state.activePlayer === 'p1' ? 'p2' : 'p1'
    }))
  }

  render() {
    return (
      <div className="game--container">
        <button className="game--exit" onClick={this.props.exit}>Exit</button>
        <Board 
          width={this.props.width} 
          height={this.props.height} 
          boats={this.state.p1Board} 
          moves={this.state.p2Moves} 
          primaryGrid={this.state.activePlayer === 'p1'}
          saveMove={this.chooseTarget('p2Moves')}
          disabled={this.state.turnPhase === 'start'}
        />
        <Board 
          width={this.props.width} 
          height={this.props.height} 
          boats={this.state.p2Board} 
          moves={this.state.p1Moves} 
          primaryGrid={this.state.activePlayer === 'p2'}
          saveMove={this.chooseTarget('p1Moves')}
          disabled={this.state.turnPhase === 'start'}
        />
        <Overlay
          phase={this.state.turnPhase}
          player={this.state.activePlayer}
          startTurn={this.startTurn}
          confirmTarget={this.confirmTarget(this.state.activePlayer)}
          endTurn={this.endTurn}
          endGame={this.props.exit}
          context={this.state.turnContext}
        />
      </div>
    );
  }
}

export default Game;
