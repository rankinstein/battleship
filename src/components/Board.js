import React from 'react'
import PropTypes from 'prop-types'
import './board.css'

import { firedAtPoint, boatAtPoint } from '../logic/utils'

class Tile extends React.Component {
  render() {
    const { firedOn, hasBoat, saveMove, primaryGrid, disabled } = this.props

    const concealed = !primaryGrid
    const clickable = !primaryGrid && !firedOn
    const hit = hasBoat && firedOn

    // have a boat - hasBoat && !firedOn
    // be empty - !hasBoat && !firedOn
    // missed shot - !hasBoat && firedOn
    // hit shot - hasBoat && firedOn
    // disabled
    // concealed - only show hit or miss
    // clickable - not primary grid && !firedOn

    const classes = [
      'board--tile',
      ...(!disabled && clickable ? ['board--tile--pointer'] : []),
      ...(!disabled && firedOn && hasBoat ? ['board--tile--hit'] : []),
      ...(!disabled && firedOn && !hasBoat ? ['board--tile--miss'] : []),
      ...(!disabled && !concealed && hasBoat ? ['board--tile--boat1'] : [])
    ]

    const clickHandler = clickable ? saveMove : null

    return (
      <div className={classes.join(' ')} onClick={clickHandler}></div>
    )
  }
}

class Row extends React.Component {
  render() {
    const { width, boats, moves, saveMove, primaryGrid, disabled } = this.props
    const tiles = Array.from(Array(width), (i, index) => {
      const position = [index, this.props.y]
      const tileProps = {
        key: index,
        x: index,
        y: this.props.y,
        firedOn: firedAtPoint(moves, position),
        hasBoat: boatAtPoint(boats, position),
        saveMove: () => saveMove(position),
        primaryGrid,
        disabled
      }
      return <Tile {...tileProps} />
    })
    return (
      <div className="board--row">
        { tiles }
      </div>
    )
  }
}

class Board extends React.Component {
  render() {
    const { width, height, boats, moves, primaryGrid, saveMove, disabled } = this.props
    const rowProps = {
      width,
      boats,
      moves,
      saveMove,
      primaryGrid,
      disabled
    }
    return (
      <div className="board--container">
        {
          Array.from(Array(height), (i, index) => <Row key={index} y={index} {...rowProps} />)
        }
        {
          !disabled
            ? <div className="board--label">{primaryGrid ? 'Primary Grid' : 'Target Grid'}</div>
            : null
        }
      </div>
    )
  }
}

export default Board
