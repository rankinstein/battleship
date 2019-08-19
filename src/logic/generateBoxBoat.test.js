import generateBoxBoat from './generateBoxBoat'
import { isValidPosition } from './utils'

describe('generateBoxBoat()', () => {
  it('returns a valid box shaped boat', () => {
    const occupied = []
    const result = generateBoxBoat({ width: 8, height: 8, occupied })
    expect(result.type).toBe('B')
    expect(isValidPosition({ positions: result.position, occupied })).toBeTruthy()
  })
})