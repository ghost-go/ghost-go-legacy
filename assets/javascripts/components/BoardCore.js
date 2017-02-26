import { SGFToPosition, BLANK_ARRAY, LETTERS_SGF, GRID } from '../constants/Go'

let _liberty = 0
let _recursionPath = []

function calcLiberty(array, x, y, ki) {
  _liberty = 0
  _recursionPath = []

  if (x < 0 || y < 0 || x > GRID - 1 || y > GRID - 1) {
    return {
      liberty: 4,
      recursionPath: []
    }
  }

  if (array[x][y] == 0) {
    return {
      liberty: 4,
      recursionPath: []
    }
  }
  _calcLibertyCore(array, x, y, ki)
  return {
    liberty: _liberty,
    recursionPath: _recursionPath
  }
}

function execPonnuki(array, i, j, ki) {
  let {liberty: libertyUp, recursionPath: recursionPathUp} = calcLiberty(array, i, j - 1, ki)
  let {liberty: libertyDown, recursionPath: recursionPathDown} = calcLiberty(array, i, j + 1, ki)
  let {liberty: libertyLeft, recursionPath: recursionPathLeft} = calcLiberty(array, i - 1, j, ki)
  let {liberty: libertyRight, recursionPath: recursionPathRight} = calcLiberty(array, i + 1, j, ki)
  if (libertyUp === 0) {
    recursionPathUp.forEach((i) => {
      let coord = i.split(',')
      array[coord[0]][coord[1]] = 0
    })
  }
  if (libertyDown === 0) {
    recursionPathDown.forEach((i) => {
      let coord = i.split(',')
      array[coord[0]][coord[1]] = 0
    })
  }
  if (libertyLeft === 0) {
    recursionPathLeft.forEach((i) => {
      let coord = i.split(',')
      array[coord[0]][coord[1]] = 0
    })
  }
  if (libertyRight === 0) {
    recursionPathRight.forEach((i) => {
      let coord = i.split(',')
      array[coord[0]][coord[1]] = 0
    })
  }
  return array
}

function _calcLibertyCore(array, x, y, ki) {
  if (x >= 0 && x < GRID && y >= 0 && y < GRID) {
    if (array[x][y] == ki && !_recursionPath.includes(`${x},${y}`)) {
      _recursionPath.push(`${x},${y}`)
      _calcLibertyCore(array, x - 1, y, ki)
      _calcLibertyCore(array, x + 1, y, ki)
      _calcLibertyCore(array, x, y - 1, ki)
      _calcLibertyCore(array, x, y + 1, ki)
    }
    else if(array[x][y] == 0) {
      _liberty++
    }
  }
}

function canPonnuki(array, i, j, ki) {
  let {liberty: libertyUp, recursionPath: recursionPathUp} = calcLiberty(array, i, j - 1, ki)
  let {liberty: libertyDown, recursionPath: recursionPathDown} = calcLiberty(array, i, j + 1, ki)
  let {liberty: libertyLeft, recursionPath: recursionPathLeft} = calcLiberty(array, i - 1, j, ki)
  let {liberty: libertyRight, recursionPath: recursionPathRight} = calcLiberty(array, i + 1, j, ki)
  if (libertyUp === 0 && recursionPathUp.length > 0) {
    return true
  }
  if (libertyDown === 0 && recursionPathDown.length > 0) {
    return true
  }
  if (libertyLeft === 0 && recursionPathLeft.length > 0) {
    return true
  }
  if (libertyRight === 0 && recursionPathRight.length > 0) {
    return true
  }
  return false
}

function canMove(array, i, j, ki) {
  if (array[i][j] !== 0) {
    console.log('This place has been used')
    return false
  }

  array[i][j] = ki
  let { liberty } = calcLiberty(array, i, j, ki)
  if (canPonnuki(array, i, j, -ki)) {
    return true
  }
  if (canPonnuki(array, i, j, ki)) {
    return false
  }
  if (liberty === 0) {
    return false
  }
  return true
}


export default function showKi(array, steps, isPonnuki = true) {
  let newArray = _.cloneDeep(array)
  steps.forEach((str) => {
    const {x, y, ki} = SGFToPosition(str)
    if (isPonnuki) {
      if (canMove(newArray, x, y, ki)) {
        newArray[x][y] = ki
        newArray = execPonnuki(newArray, x, y, -ki)
      }
    } else {
      newArray[x][y] = ki
    }
  })
  return newArray
}
