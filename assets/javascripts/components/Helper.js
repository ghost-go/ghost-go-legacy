import { LETTERS, LETTERS_SGF, NUMBERS } from '../constants/Go'

export function convertSGFCoordToPos(coord) {
  const ki = coord[0] === 'B' ? 1 : -1
  const pos = /\[(.*)\]/.exec(coord)[1]
  const x = LETTERS_SGF.indexOf(pos[0])
  const y = LETTERS_SGF.indexOf(pos[1])
  return {x, y, ki}
}
