import random from 'lodash/random'
import sample from 'lodash/sample'
import flatten from 'lodash/flatten'

import { vectorAdd, scalarMultiply, isValidPosition } from './utils'

const generateBoxBoat = ({width, height, occupied}) => {
  let generating = true
  const unitVectors = [[0, 1], [1, 0]]
  let position = []

  while(generating) {
      const initialPosition = [
      random(0, width - 2),
      random(0, height - 2)
    ]

    const secondPosition = vectorAdd(initialPosition, [0, 1])
    const thirdPosition = vectorAdd(initialPosition, [1, 0])
    const fourthPosition = vectorAdd(initialPosition, [1, 1])

    position = [initialPosition, secondPosition, thirdPosition, fourthPosition]

    generating = !isValidPosition({
      positions: position,
      width,
      height,
      occupied
    })
  }

  return {
    type: 'B',
    position
  }
}

export default generateBoxBoat