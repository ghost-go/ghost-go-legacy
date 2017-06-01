import _ from 'lodash';
import TreeModel from 'tree-model';

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
  const root = tree.parse({ id: 0, index: 0, children: [] });
  let parentNode;
  let node;
  steps.forEach((step, i) => {
    node = tree.parse({
      id: i,
      index: i,
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
  },
  flatTheme: {
    board: ['/flat-theme/board.png'],
    black: ['/flat-theme/black.svg'],
    white: ['/flat-theme/white.svg'],
    stoneShadow: false,
  },
  photorealisticTheme: {
    board: ['/photorealistic-theme/board.png'],
    black: ['/photorealistic-theme/black.png'],
    white: ['/photorealistic-theme/white.png'],
    stoneShadow: true,
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
  },
  subduedTheme: {
    board: ['/subdued-theme/board.png'],
    black: ['/subdued-theme/black.png'],
    white: ['/subdued-theme/white.png'],
    stoneShadow: true,
  },
  walnutTheme: {
    board: ['/walnut-theme/board.png'],
    black: ['/walnut-theme/black.png'],
    white: ['/walnut-theme/white.png'],
    stoneShadow: true,
  },
};

export function preloadTheme(theme) {
  const materials = {};
  materials.board = [];
  materials.black = [];
  materials.white = [];
  THEME[_.camelCase(theme)].board.forEach((src) => {
    const img = new Image();
    img.src = BASE_THEME_PATH + src;
    materials.board.push(img);
  });
  THEME[_.camelCase(theme)].black.forEach((src) => {
    const img = new Image();
    img.src = BASE_THEME_PATH + src;
    materials.black.push(img);
  });
  THEME[_.camelCase(theme)].white.forEach((src) => {
    const img = new Image();
    img.src = BASE_THEME_PATH + src;
    materials.white.push(img);
  });
  return materials;
}
