import _ from 'lodash';
import TreeModel from 'tree-model';
// import JsFeat from 'jsfeat';
import * as Const from './Constants';

export const SGFToPosition = (str) => {
  const ki = str[0] === 'B' ? 1 : -1;
  const pos = /\[(.*)\]/.exec(str)[1];
  const x = Const.SGF_LETTERS.indexOf(pos[0]);
  const y = Const.SGF_LETTERS.indexOf(pos[1]);
  return { x, y, ki };
};

export const A1ToSGF = (str, type = 'B') => {
  const inx = Const.A1_LETTERS.indexOf(str[0]);
  const iny = Const.A1_NUMBERS.indexOf(parseInt(str.substr(1), 0));
  return `${type}[${Const.SGF_LETTERS[inx]}${Const.SGF_LETTERS[iny]}]`;
};

export const ConvertStoneTypeToString = type => (type === 1 ? 'B' : 'W');

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
      posX: Const.SGF_LETTERS.indexOf(step[1]),
      posY: Const.SGF_LETTERS.indexOf(step[2]),
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

export const GoBanDetection = (pixelData, canvas) => {
  // const columns = canvas.width;
  // const rows = canvas.height;
  // const dataType = JsFeat.U8C1_t;
  // const distMatrixT = new JsFeat.matrix_t(columns, rows, dataType);
  // JsFeat.imgproc.grayscale(pixelData, columns, rows, distMatrixT);
  // JsFeat.imgproc.gaussian_blur(distMatrixT, distMatrixT, 2, 0);
  // JsFeat.imgproc.canny(distMatrixT, distMatrixT, 50, 50);

  // const newPixelData = new Uint32Array(pixelData.buffer);
  // const alpha = (0xff << 24);
  // let i = distMatrixT.cols * distMatrixT.rows;
  // let pix = 0;
  // while (i >= 0) {
  //   pix = distMatrixT.data[i];
  //   newPixelData[i] = alpha | (pix << 16) | (pix << 8) | pix;
  //   i -= 1;
  // }
};
