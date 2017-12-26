import _ from 'lodash';
import { GRID } from '../common/Constants';
import { SGFToPosition } from '../common/Helper';

let liberties = 0;
let recursionPath = [];

function calcLibertyCore(array, x, y, ki) {
  if (x >= 0 && x < GRID && y >= 0 && y < GRID) {
    if (array[x][y] === ki && !recursionPath.includes(`${x},${y}`)) {
      recursionPath.push(`${x},${y}`);
      calcLibertyCore(array, x - 1, y, ki);
      calcLibertyCore(array, x + 1, y, ki);
      calcLibertyCore(array, x, y - 1, ki);
      calcLibertyCore(array, x, y + 1, ki);
    } else if (array[x][y] === 0) {
      liberties += 1;
    }
  }
}

function calcLiberty(array, x, y, ki) {
  liberties = 0;
  recursionPath = [];

  if (x < 0 || y < 0 || x > GRID - 1 || y > GRID - 1) {
    return {
      liberty: 4,
      recursionPath: [],
    };
  }

  if (array[x][y] === 0) {
    return {
      liberty: 4,
      recursionPath: [],
    };
  }
  calcLibertyCore(array, x, y, ki);
  return {
    liberty: liberties,
    recursionPath,
  };
}


function execPonnuki(array, i, j, ki) {
  const newArray = array;
  const { liberty: libertyUp, recursionPath: recursionPathUp } =
    calcLiberty(array, i, j - 1, ki);
  const { liberty: libertyDown, recursionPath: recursionPathDown } =
    calcLiberty(array, i, j + 1, ki);
  const { liberty: libertyLeft, recursionPath: recursionPathLeft } =
    calcLiberty(array, i - 1, j, ki);
  const { liberty: libertyRight, recursionPath: recursionPathRight } =
    calcLiberty(array, i + 1, j, ki);
  if (libertyUp === 0) {
    recursionPathUp.forEach((item) => {
      const coord = item.split(',');
      newArray[coord[0]][coord[1]] = 0;
    });
  }
  if (libertyDown === 0) {
    recursionPathDown.forEach((item) => {
      const coord = item.split(',');
      newArray[coord[0]][coord[1]] = 0;
    });
  }
  if (libertyLeft === 0) {
    recursionPathLeft.forEach((item) => {
      const coord = item.split(',');
      newArray[coord[0]][coord[1]] = 0;
    });
  }
  if (libertyRight === 0) {
    recursionPathRight.forEach((item) => {
      const coord = item.split(',');
      newArray[coord[0]][coord[1]] = 0;
    });
  }
  return newArray;
}


function canPonnuki(array, i, j, ki) {
  const { liberty: libertyUp, recursionPath: recursionPathUp }
    = calcLiberty(array, i, j - 1, ki);
  const { liberty: libertyDown, recursionPath: recursionPathDown }
    = calcLiberty(array, i, j + 1, ki);
  const { liberty: libertyLeft, recursionPath: recursionPathLeft }
    = calcLiberty(array, i - 1, j, ki);
  const { liberty: libertyRight, recursionPath: recursionPathRight }
    = calcLiberty(array, i + 1, j, ki);
  if (libertyUp === 0 && recursionPathUp.length > 0) {
    return true;
  }
  if (libertyDown === 0 && recursionPathDown.length > 0) {
    return true;
  }
  if (libertyLeft === 0 && recursionPathLeft.length > 0) {
    return true;
  }
  if (libertyRight === 0 && recursionPathRight.length > 0) {
    return true;
  }
  return false;
}

function canMove(array, i, j, ki) {
  const newArray = array;
  if (array[i][j] !== 0) {
    return false;
  }

  newArray[i][j] = ki;
  const { liberty } = calcLiberty(newArray, i, j, ki);
  if (canPonnuki(newArray, i, j, -ki)) {
    return true;
  }
  if (canPonnuki(newArray, i, j, ki)) {
    return false;
  }
  if (liberty === 0) {
    return false;
  }
  return true;
}


export default function showKi(array, steps, isPonnuki = true) {
  let newArray = _.cloneDeep(array);
  let hasMoved = false;
  steps.forEach((str) => {
    const { x, y, ki } = SGFToPosition(str);
    if (isPonnuki) {
      if (canMove(newArray, x, y, ki)) {
        newArray[x][y] = ki;
        newArray = execPonnuki(newArray, x, y, -ki);
        hasMoved = true;
      }
    } else {
      newArray[x][y] = ki;
      hasMoved = true;
    }
  });

  return {
    arrangement: newArray,
    hasMoved,
  };
}
