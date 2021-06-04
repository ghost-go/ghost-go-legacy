import _ from 'lodash';

export const A1_LETTERS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
];
export const A1_NUMBERS = [
  19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
];
export const SGF_LETTERS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
];
export const BLANK_ARRAY = _.chunk(new Array(361).fill(0), 19);
export const GRID = 19;
export const DOT_SIZE = 3;
export const EXPAND_H = 5;
export const EXPAND_V = 5;
export const RESPONSE_TIME = 100;

// Themes
export const BASE_THEME_PATH = '/themes';
export const THEME: any = {
  blackAndWhite: {
    board: [],
    black: [],
    white: [],
    stoneShadow: false,
    boardShadow: false,
  },
  flatTheme: {
    board: [],
    black: [],
    white: [],
    stoneShadow: false,
    boardShadow: false,
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

const materials: any = {};
// Object.keys(THEME).forEach((key: string) => {
//   materials[key] = {};
//   materials[key].board = [];
//   materials[key].black = [];
//   materials[key].white = [];
//   THEME[key].board.forEach((src: any) => {
//     const img = new Image();
//     img.src = BASE_THEME_PATH + src;
//     materials[key].board.push(img);
//   });
//   THEME[key].black.forEach((src: any) => {
//     const img = new Image();
//     img.src = BASE_THEME_PATH + src;
//     materials[key].black.push(img);
//   });
//   THEME[key].white.forEach((src: any) => {
//     const img = new Image();
//     img.src = BASE_THEME_PATH + src;
//     materials[key].white.push(img);
//   });
// });

export const MATERIALS = materials;
