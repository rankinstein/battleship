import React from 'react'
import './overlay.css'

class StartMessage extends React.Component {
  render() {
    const { startTurn, player } = this.props
    return (
      <div className="overlay--message-box">
        <div>{`Ready ${player === 'p1' ? 'Player 1' : 'Player 2'}?`}</div>
        <button onClick={startTurn}>Start turn</button>
      </div>
    )
  }
}

class ConfirmMessage extends React.Component {
  render() {
    const { confirmTarget, rejectTarget, x, y } = this.props
    return (
      <div className="overlay--message-box">
        <div>{`Are you sure you want to fire on position (${x}, ${y})?`}</div>
        <button onClick={() => confirmTarget([x, y])}>Yes</button>
        <button onClick={rejectTarget}>No</button>
      </div> 
    )
  }
}

const feedbackText = (type, boatType, player) => {
  if(type==='miss') return 'You missed'
  if(type === 'hit') return 'You hit a boat!'
  if(type === 'sunk') return `You sunk your opponents ${boatType} boat`
  if(type === 'win') return `Congratulations ${player === 'p1' ? 'Player 1' : 'Player 2'} you have won the game!`
}

class FeedbackMessage extends React.Component {
  render() {
    const { context, endTurn, endGame, player } = this.props
    const clickHandler = context.result === 'win' ? endGame : endTurn
    const buttonText = context.result === 'win' ? 'Exit game' : 'End turn'
    return (
      <div className="overlay--message-box">
        <div>{feedbackText(context.result, context.boat, player)}</div>
        <button onClick={clickHandler}>{buttonText}</button>
      </div>  
    )
  }
}


class Overlay extends React.Component {

  overlayMessage(phase, context) {
    if(phase === 'start') return <StartMessage startTurn={this.props.startTurn} player={this.props.player} />
    if(phase === 'confirm') return <ConfirmMessage rejectTarget={this.props.startTurn} confirmTarget={this.props.confirmTarget} x={context.x} y={context.y} />
    if(phase === 'feedback') return <FeedbackMessage endTurn={this.props.endTurn} endGame={this.props.endGame} context={context} player={this.props.player} />
  }

  render() {
    const { phase, context } = this.props
    if(phase === 'fire') return null
    return (
      <div className="overlay--container">
        {this.overlayMessage(phase, context)}
      </div>
    )
  }
}

export default Overlay