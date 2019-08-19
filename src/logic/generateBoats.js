import shuffle from 'lodash/shuffle'

import generateLshapeBoat from './generateLshapeBoat'
import generateBoxBoat from './generateBoxBoat'
import generateLineBoat from './generateLineBoat'
import generate from '@babel/generator';

const generateBoats = ({ width, height }) => {
  /*
    Boat codes:
    L: 3x2 L shaped boat. orientation of L and its rotation is randomized
    B: 2x2 box shaped boat
    S: 4x1 line shaped boat. rotation is randomized
  */
  const boatOrder = shuffle(['L', 'B', 'S', 'S']) // randomize order for placing boats
  let occupied = []
  let boats = []

  for(let boat of boatOrder) {
    switch(boat) {
      case 'L': {
        const newBoat = generateLshapeBoat({ width, height, occupied })
        occupied = [...occupied, ...newBoat.position]
        boats = [...boats, newBoat]
        break
      }
      case 'B': {
        const newBoat = generateBoxBoat({ width, height, occupied })
        occupied = [...occupied, ...newBoat.position]
        boats = [...boats, newBoat]
        break
      }
      case 'S': {
        const newBoat = generateLineBoat({ width, height, occupied })
        occupied = [...occupied, ...newBoat.position]
        boats = [...boats, newBoat]
        break
      }
      default:
        console.log("Houston we have a problem. Trying to place a boat type of: " + boat)
    }
  }
  return boats
}

export default generateBoats