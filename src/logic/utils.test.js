import { isValidPosition, firedAtPoint, boatAtPoint, checkTarget } from './utils'

describe('isValidPosition()', () => {
  it('works with empty occupied', () => {
    const occupied = []
    const positions = [
      [0,0],
      [0,7],
      [3,4],
      [5,2],
      [7,0],
      [7,7]
    ]
    const result = isValidPosition({ positions, occupied})
    expect(result).toBeTruthy()
  })

  it('works when no occupied conflict', () => {
    const occupied = [[1,0], [1,7], [4,3]]
    const positions = [
      [0,0],
      [0,7],
      [3,4],
      [5,2],
      [7,0],
      [7,7]
    ]
    const result = isValidPosition({ positions, occupied })
    expect(result).toBeTruthy()
  })

  it('fails when x is less than 0', () => {
    const positions = [
      [-1,1],
      [1,2],
      [1,3],
      [1,4]
    ]
    const result = isValidPosition({ positions })
    expect(result).toBeFalsy()
  })

  it('fails when x is greater than or equal to width', () => {
    const positions = [
      [1,1],
      [1,2],
      [1,3],
      [1,8]
    ]
    const result = isValidPosition({ positions, width: 8 })
    expect(result).toBeFalsy()
  })

  it('fails when y is less than 0', () => {
    const positions = [
      [1,-1],
      [1,2],
      [1,3],
      [1,7]
    ]
    const result = isValidPosition({ positions })
    expect(result).toBeFalsy()
  })

  it('fails when y is greater than or equal to height', () => {
    const positions = [
      [1,1],
      [1,2],
      [1,3],
      [1,8]
    ]
    const result = isValidPosition({ positions, height: 8 })
    expect(result).toBeFalsy()
  })

  it('fails if conflict in occupied array', () => {
    const occupied = [[0,0]]
    const positions = [
      [0,0],
      [0,7],
      [3,4],
      [5,2],
      [7,0],
      [7,7]
    ]
    const result = isValidPosition({ positions, occupied})
    expect(result).toBeFalsy()
  })
})

describe('firedAtPoint()', () => {
  it('returns true if point in the move list', () => {
    const moves = [[0,0], [0,1], [5,5]]
    const point = [0,0]
    const result = firedAtPoint(moves, point)
    expect(result).toBe(true)
  })

  it('returns false if point not in move list', () => {
    const moves = [[0,0], [0,1], [5,5]]
    const point = [6,2]
    const result = firedAtPoint(moves, point)
    expect(result).toBe(false)
  })

  it('returns false if movelist is empty', () => {
    const moves = []
    const point = [1, 2]
    const result = firedAtPoint(moves, point)
    expect(result).toBe(false)
  })
})

describe('boatAtPoint()', () => {
  it('returns false if no boat at point', () => {
    const boats = [
      { type: 'L', position: [[0,1], [0,2], [0,3], [1,3]] },
      { type: 'S', position: [[2,1], [2,2], [2,3], [2,4]] },
      { type: 'S', position: [[3,3], [3,4], [3,5], [3,6]] },
      { type: 'B', position: [[6,6], [6,7], [7,6], [7,7]] }
    ]
    const point1 = [0,0]
    const result1 = boatAtPoint(boats, point1)
    expect(result1).toBe(null)

    const point2 = [3,7]
    const result2 = boatAtPoint(boats, point2)
    expect(result2).toBe(null)

    const point3 = [7,5]
    const result3 = boatAtPoint(boats, point3)
    expect(result3).toBe(null)
  })

  it('returns true if boat at point', () => {
    const boats = [
      { type: 'L', position: [[0,1], [0,2], [0,3], [1,3]] },
      { type: 'S', position: [[2,1], [2,2], [2,3], [2,4]] },
      { type: 'S', position: [[3,3], [3,4], [3,5], [3,6]] },
      { type: 'B', position: [[6,6], [6,7], [7,6], [7,7]] }
    ]
    const point1 = [6,6]
    const result1 = boatAtPoint(boats, point1)
    expect(result1).toBe(boats[3])

    const point2 = [0,2]
    const result2 = boatAtPoint(boats, point2)
    expect(result2).toBe(boats[0])

    const point3 = [3,5]
    const result3 = boatAtPoint(boats, point3)
    expect(result3).toBe(boats[2])
  })
})

describe('checkTarget()', () => {
  it('returns null if move is a miss', () => {
    const boats = [
      { type: 'L', position: [[0,1], [0,2], [0,3], [1,3]] },
      { type: 'S', position: [[2,1], [2,2], [2,3], [2,4]] },
      { type: 'S', position: [[3,3], [3,4], [3,5], [3,6]] },
      { type: 'B', position: [[6,6], [6,7], [7,6], [7,7]] }
    ]

    const move = [0,0]
    const moveHistory = [[1,1], [2,1], [4,4]]
    const result = checkTarget(move, boats, moveHistory)
    expect(result).toEqual({ result: 'miss' })
  })

  it('returns hit object if move is a hit', () => {
    const boats = [
      { type: 'L', position: [[0,1], [0,2], [0,3], [1,3]] },
      { type: 'S', position: [[2,1], [2,2], [2,3], [2,4]] },
      { type: 'S', position: [[3,3], [3,4], [3,5], [3,6]] },
      { type: 'B', position: [[6,6], [6,7], [7,6], [7,7]] }
    ]

    const move = [0,1]
    const moveHistory = [[1,1], [2,1], [4,4]]
    const result = checkTarget(move, boats, moveHistory)
    expect(result).toEqual({ result: 'hit' }) 
  })

  it('returns sunk if all points of the boat are hit', () => {
    const boats = [
      { type: 'L', position: [[0,1], [0,2], [0,3], [1,3]] },
      { type: 'S', position: [[2,1], [2,2], [2,3], [2,4]] },
      { type: 'S', position: [[3,3], [3,4], [3,5], [3,6]] },
      { type: 'B', position: [[6,6], [6,7], [7,6], [7,7]] }
    ]

    const move = [0,1]
    const moveHistory = [[0,2], [2,1], [0,3], [1,3]]
    const result = checkTarget(move, boats, moveHistory)
    expect(result).toEqual({ result: 'sunk', boat: 'L' }) 
  })

  it('returns win if all points of all boats are hit', () => {
    const boats = [
      { type: 'L', position: [[0,1], [0,2], [0,3], [1,3]] },
      { type: 'S', position: [[2,1], [2,2], [2,3], [2,4]] },
      { type: 'S', position: [[3,3], [3,4], [3,5], [3,6]] },
      { type: 'B', position: [[6,6], [6,7], [7,6], [7,7]] }
    ]

    const move = [0,1]
    const moveHistory = [
      [0,2], [0,3], [1,3],
      [2,1], [2,2], [2,3], [2,4],
      [3,3], [3,4], [3,5], [3,6],
      [6,6], [6,7], [7,6], [7,7]
    ]
    const result = checkTarget(move, boats, moveHistory)
    expect(result).toEqual({ result: 'win' }) 
  })
})