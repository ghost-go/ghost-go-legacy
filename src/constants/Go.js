import _ from 'lodash';
import TreeModel from 'tree-model';
import JsFeat from 'jsfeat';

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
export const LETTERS_SGF = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'];
export const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19].reverse();
export const BLANK_ARRAY = _.chunk(new Array(361).fill(0), 19);
export const GRID = 19;
export const DOT_SIZE = 3;
export const EXPAND_H = 5;
export const EXPAND_V = 5;
export const RESPONSE_TIME = 100;

export const SGFToPosition = (str) => {
  const ki = str[0] === 'B' ? 1 : -1;
  const pos = /\[(.*)\]/.exec(str)[1];
  const x = LETTERS_SGF.indexOf(pos[0]);
  const y = LETTERS_SGF.indexOf(pos[1]);
  return { x, y, ki };
};

export const CoordsToTree = (steps) => {
  const tree = new TreeModel();
  const root = tree.parse({ id: 'root', index: 0, children: [] });
  let parentNode;
  let node;
  steps.forEach((step, i) => {
    node = tree.parse({
      id: `${step}-${i + 1}`,
      coord: step,
      type: step[0] === 'B' ? 1 : -1,
      posX: LETTERS_SGF.indexOf(step[1]),
      posY: LETTERS_SGF.indexOf(step[2]),
    });
    if (parentNode === undefined) {
      root.addChild(node);
    } else {
      parentNode.addChild(node);
    }
    parentNode = node;
  });
  return root;
};

export const BASE_THEME_PATH = '/themes';
export const THEME = {
  blackAndWhite: {
    board: [],
    black: [],
    white: [],
    stoneShadow: false,
    boardShadow: false,
  },
  flatTheme: {
    board: ['/flat-theme/board.png'],
    black: ['/flat-theme/black.svg'],
    white: ['/flat-theme/white.svg'],
    stoneShadow: false,
    boardShadow: true,
  },
  photorealisticTheme: {
    board: ['/photorealistic-theme/board.png'],
    black: ['/photorealistic-theme/black.png'],
    white: ['/photorealistic-theme/white.png'],
    stoneShadow: true,
    boardShadow: true,
  },
  shellStone: {
    board: ['/shell-stone/board.png'],
    black: ['/shell-stone/black.png'],
    white: [
      '/shell-stone/white0.png',
      '/shell-stone/white1.png',
      '/shell-stone/white2.png',
      '/shell-stone/white3.png',
      '/shell-stone/white4.png',
    ],
    stoneShadow: true,
    boardShadow: true,
  },
  slateAndShell: {
    board: ['/slate-and-shell-theme/board.png'],
    black: [
      '/slate-and-shell-theme/slate1.png',
      '/slate-and-shell-theme/slate2.png',
      '/slate-and-shell-theme/slate3.png',
      '/slate-and-shell-theme/slate4.png',
      '/slate-and-shell-theme/slate5.png',
    ],
    white: [
      '/slate-and-shell-theme/shell1.png',
      '/slate-and-shell-theme/shell2.png',
      '/slate-and-shell-theme/shell3.png',
      '/slate-and-shell-theme/shell4.png',
      '/slate-and-shell-theme/shell5.png',
    ],
    stoneShadow: true,
    boardShadow: true,
  },
  subduedTheme: {
    board: ['/subdued-theme/board.png'],
    black: ['/subdued-theme/black.png'],
    white: ['/subdued-theme/white.png'],
    stoneShadow: true,
    boardShadow: true,
  },
  walnutTheme: {
    board: ['/walnut-theme/board.jpg'],
    black: ['/walnut-theme/black.png'],
    white: ['/walnut-theme/white.png'],
    stoneShadow: true,
    boardShadow: true,
  },
};

const materials = {};
Object.keys(THEME).forEach((key) => {
  materials[key] = {};
  materials[key].board = [];
  materials[key].black = [];
  materials[key].white = [];
  THEME[key].board.forEach((src) => {
    const img = new Image();
    img.src = BASE_THEME_PATH + src;
    materials[key].board.push(img);
  });
  THEME[key].black.forEach((src) => {
    const img = new Image();
    img.src = BASE_THEME_PATH + src;
    materials[key].black.push(img);
  });
  THEME[key].white.forEach((src) => {
    const img = new Image();
    img.src = BASE_THEME_PATH + src;
    materials[key].white.push(img);
  });
});

export const MATERIALS = materials;
export const GoBanDetection = (pixelData, canvas) => {
  const columns = canvas.width;
  const rows = canvas.height;
  const dataType = JsFeat.U8_t | JsFeat.C4_t;
  const distMatrixT = new JsFeat.matrix_t(columns, rows, dataType);
  console.log(pixelData);
  JsFeat.imgproc.canny(pixelData, distMatrixT, 1, 1);
  console.log(distMatrixT);
  distMatrixT.data.forEach((i) => {
    if (i !== 0) {
      console.log(i);
    }
  });

  const result = new ImageData(
    Uint8ClampedArray.from(distMatrixT.data), canvas.width, canvas.height,
    // Uint8ClampedArray.from(pixelData.data), canvas.width, canvas.height,
  );
  return result;
};
