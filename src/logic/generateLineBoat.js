import random from 'lodash/random'
import sample from 'lodash/sample'
import flatten from 'lodash/flatten'

import { vectorAdd, scalarMultiply, isValidPosition } from './utils'

const generateLineBoat = ({width, height, occupied}) => {
  let generating = true
  const unitVectors = [[0, 1], [1, 0]]
  let position = []

  while(generating) {
    const orientation = sample(unitVectors)
    const direction = sample([1, -1])

    const growthVector = scalarMultiply(orientation, direction)
  
    const initialPosition = [
      random(0, width - 1),
      random(0, height - 1)
    ]

    const secondPosition = vectorAdd(initialPosition, growthVector)
    const thirdPosition = vectorAdd(secondPosition, growthVector)
    const fourthPosition = vectorAdd(thirdPosition, growthVector)

    position = [initialPosition, secondPosition, thirdPosition, fourthPosition]

    generating = !isValidPosition({
      positions: position,
      width,
      height,
      occupied
    })
  }

  return {
    type: 'S',
    position
  }
}

export default generateLineBoat