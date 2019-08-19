import generateBoatL from './generateLshapeBoat'
import { isValidPosition } from './utils'

describe('generateBoatL', () => {
  it('exists', () => {
    const result = generateBoatL({ width: 8, height: 8, occupied: [] })
    expect(true).toBe(true)
  })

  it('chooses a valid start position', () => {
    const occupied = []
    const result = generateBoatL({ width: 8, height: 8, occupied })
    expect(result.type).toBe('L')
    expect(isValidPosition({ positions: result.position, occupied })).toBeTruthy()
  })
})

