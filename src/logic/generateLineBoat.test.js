import generateLineBoat from './generateLineBoat'
import { isValidPosition } from './utils'

describe('generateLineBoat()', () => {
  it('returns a valid line shaped boat', () => {
    const occupied = []
    const result = generateLineBoat({ width: 8, height: 8, occupied })
    expect(result.type).toBe('S')
    expect(isValidPosition({ positions: result.position, occupied })).toBeTruthy()
  })
})