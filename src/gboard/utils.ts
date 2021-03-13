import _ from "lodash";
import { GBoardOptions } from "gboard/GBan";
import { Matrix, forEach } from "mathjs";
import { GRID } from "../common/Constants";
import { sgfToPosition } from "../common/Helper";

const devicePixelRatiot = window.devicePixelRatio;

const calcSpaceAndPadding = (
  canvas: HTMLCanvasElement,
  options: GBoardOptions
) => {
  const { padding, boardSize } = options;
  let scaledPadding = padding * devicePixelRatiot;
  const space = (canvas.width - scaledPadding * 2) / boardSize;
  scaledPadding = scaledPadding + space / 2;
  return { space, scaledPadding };
};

export const drawStones = (
  canvas: HTMLCanvasElement,
  options: GBoardOptions,
  matrix: Matrix
) => {
  forEach(matrix, (value, index) => {
    if (value !== 0) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // ctx.scale(scale, scale);
        const { space, scaledPadding } = calcSpaceAndPadding(canvas, options);
        const x = scaledPadding + index[0] * space;
        const y = scaledPadding + index[1] * space;
        ctx.beginPath();
        ctx.arc(x, y, space * 0.46, 0, 2 * Math.PI, true);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        if (value === 1) {
          ctx.fillStyle = "#000";
        } else if (value === -1) {
          ctx.fillStyle = "#fff";
        }
        ctx.fill();
        ctx.stroke();
      }
    }
  });
};

export const drawMarks = (
  canvas: HTMLCanvasElement,
  options: GBoardOptions,
  matrix: Matrix
) => {
  forEach(matrix, (value, index) => {
    if (value !== 0) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const { space, scaledPadding } = calcSpaceAndPadding(canvas, options);
        const x = scaledPadding + index[0] * space;
        const y = scaledPadding + index[1] * space;
        ctx.beginPath();
        ctx.arc(x, y, space * 0.3, 0, 2 * Math.PI, true);
        ctx.lineWidth = 2;
        if (value === 1) {
          ctx.strokeStyle = "#fff";
        } else {
          ctx.strokeStyle = "#000";
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
      }
    }
  });
};

let liberties = 0;
let recursionPath: string[] = [];

function calcLibertyCore(mat: Matrix, x: number, y: number, ki: number) {
  if (x >= 0 && x < GRID && y >= 0 && y < GRID) {
    if (mat.get([x, y]) === ki && !recursionPath.includes(`${x},${y}`)) {
      recursionPath.push(`${x},${y}`);
      calcLibertyCore(mat, x - 1, y, ki);
      calcLibertyCore(mat, x + 1, y, ki);
      calcLibertyCore(mat, x, y - 1, ki);
      calcLibertyCore(mat, x, y + 1, ki);
    } else if (mat.get([x, y]) === 0) {
      liberties += 1;
    }
  }
}

function calcLiberty(mat: Matrix, x: number, y: number, ki: number) {
  liberties = 0;
  recursionPath = [];

  if (x < 0 || y < 0 || x > GRID - 1 || y > GRID - 1) {
    return {
      liberty: 4,
      recursionPath: [],
    };
  }

  if (mat.get([x, y]) === 0) {
    return {
      liberty: 4,
      recursionPath: [],
    };
  }
  calcLibertyCore(mat, x, y, ki);
  return {
    liberty: liberties,
    recursionPath,
  };
}

function execPonnuki(mat: Matrix, i: number, j: number, ki: number) {
  const newMat = _.cloneDeep(mat);
  const { liberty: libertyUp, recursionPath: recursionPathUp } = calcLiberty(
    mat,
    i,
    j - 1,
    ki
  );
  const {
    liberty: libertyDown,
    recursionPath: recursionPathDown,
  } = calcLiberty(mat, i, j + 1, ki);
  const {
    liberty: libertyLeft,
    recursionPath: recursionPathLeft,
  } = calcLiberty(mat, i - 1, j, ki);
  const {
    liberty: libertyRight,
    recursionPath: recursionPathRight,
  } = calcLiberty(mat, i + 1, j, ki);
  if (libertyUp === 0) {
    recursionPathUp.forEach((item) => {
      const coord = item.split(",");
      newMat.set([parseInt(coord[0]), parseInt(coord[1])], 0);
    });
  }
  if (libertyDown === 0) {
    recursionPathDown.forEach((item) => {
      const coord = item.split(",");
      newMat.set([parseInt(coord[0]), parseInt(coord[1])], 0);
    });
  }
  if (libertyLeft === 0) {
    recursionPathLeft.forEach((item) => {
      const coord = item.split(",");
      newMat.set([parseInt(coord[0]), parseInt(coord[1])], 0);
    });
  }
  if (libertyRight === 0) {
    recursionPathRight.forEach((item) => {
      const coord = item.split(",");
      newMat.set([parseInt(coord[0]), parseInt(coord[1])], 0);
    });
  }
  return newMat;
}

function canPonnuki(mat: Matrix, i: number, j: number, ki: number) {
  const { liberty: libertyUp, recursionPath: recursionPathUp } = calcLiberty(
    mat,
    i,
    j - 1,
    ki
  );
  const {
    liberty: libertyDown,
    recursionPath: recursionPathDown,
  } = calcLiberty(mat, i, j + 1, ki);
  const {
    liberty: libertyLeft,
    recursionPath: recursionPathLeft,
  } = calcLiberty(mat, i - 1, j, ki);
  const {
    liberty: libertyRight,
    recursionPath: recursionPathRight,
  } = calcLiberty(mat, i + 1, j, ki);
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

export function canMove(mat: Matrix, i: number, j: number, ki: number) {
  const newMat = _.cloneDeep(mat);
  if (newMat.get([i, j]) !== 0) {
    return false;
  }

  newMat.set([i, j], ki);
  const { liberty } = calcLiberty(newMat, i, j, ki);
  if (canPonnuki(newMat, i, j, -ki)) {
    return true;
  }
  if (canPonnuki(newMat, i, j, ki)) {
    return false;
  }
  if (liberty === 0) {
    return false;
  }
  return true;
}

export function move(mat: Matrix, i: number, j: number, ki: number) {
  let newMat = _.cloneDeep(mat);
  newMat.set([i, j], ki);
  return execPonnuki(newMat, i, j, -ki);
}

export function showKi(mat: Matrix, steps: string[], isPonnuki = true) {
  let newMat = _.cloneDeep(mat);
  let hasMoved = false;
  steps.forEach((str) => {
    const {
      x,
      y,
      ki,
    }: {
      x: number;
      y: number;
      ki: number;
    } = sgfToPosition(str);
    if (isPonnuki) {
      if (canMove(newMat, x, y, ki)) {
        newMat.set([x, y], ki);
        newMat = execPonnuki(newMat, x, y, -ki);
        hasMoved = true;
      }
    } else {
      newMat.set([x, y], ki);
      hasMoved = true;
    }
  });

  return {
    arrangement: newMat,
    hasMoved,
  };
}
