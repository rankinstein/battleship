import zipWith from 'lodash/zipWith'
import intersectionWith from 'lodash/intersectionWith'
import isEqual from 'lodash/isEqual'
import add from 'lodash/add'

export const vectorAdd = (a1, a2) => zipWith(a1, a2, add)

export const scalarMultiply = (array, scalar) => array.map(i => i * scalar)

export const isValidPosition = ({positions, width = 8, height = 8, occupied = []}) => {
  const invalidXValues = positions.map(i => i[0]).filter(i => i < 0 || i >= width).length
  if (invalidXValues) return false

  const invalidYValues = positions.map(i => i[1]).filter(i => i < 0 || i >= height).length
  if (invalidYValues) return false

  const inOccupiedTiles = intersectionWith(positions, occupied, isEqual).length
  if (inOccupiedTiles) return false

  return true
}

export const firedAtPoint = (moves, point) => {
  return !!intersectionWith(moves, [point], isEqual).length
}

export const boatAtPoint = (boats, point) => {
  for(let boat of boats) {
    if (intersectionWith(boat.position, [point], isEqual).length) {
      return boat
    }
  }
  return null
}

export const checkTarget = (move, board, moveHistory) => {
  const target = boatAtPoint(board, move)
  if(!target) return { result: 'miss' }

  const allBoatTiles = board.reduce((acc, val) => {
    return [...acc, ...val.position]
  }, [])
  const moves = [...moveHistory, move]
  if( isEqual(intersectionWith(allBoatTiles, moves, isEqual), allBoatTiles) ) {
    return { result: 'win' }
  }

  const boatTiles = target.position
  if( isEqual(intersectionWith(boatTiles, moves, isEqual), boatTiles) ) {
    return { result: 'sunk', boat: target.type }
  }

  return { result: 'hit' }
}