import { matrix, zeros, ones, forEach, Matrix } from "mathjs";
import { drawStones, drawMarks } from "./utils";

const devicePixelRatio = window.devicePixelRatio;

export type GBoardOptions = {
  boardSize: number;
  size?: number;
  // theme: Stone;
  padding: number;
  zoom?: boolean;
  extend: number;
};

type GBoardOptionsParams = {
  boardSize?: number;
  size?: number;
  padding?: number;
  zoom?: boolean;
  extend?: number;
};

export default class GBoard {
  options: GBoardOptions = {
    boardSize: 19,
    padding: 0,
    extend: 2,
    // matrix: matrix(math.ones([19, 19])),
  };
  canvas?: HTMLCanvasElement;

  constructor(options?: GBoardOptionsParams) {
    const defaultOptions = this.options;
    if (options) {
      this.options = {
        ...defaultOptions,
        ...options,
      };
    }
  }

  init(dom: HTMLElement) {
    const canvas = document.createElement("canvas");
    const scale = window.devicePixelRatio;
    canvas.style.position = "absolute";
    this.canvas = canvas;
    if (this.options.size) {
      canvas.width = this.options.size;
      canvas.height = this.options.size;
    } else {
      const { clientWidth } = dom;
      console.log("client", clientWidth);
      canvas.style.width = clientWidth + "px";
      canvas.style.height = clientWidth + "px";
      canvas.width = Math.floor(clientWidth * scale);
      canvas.height = Math.floor(clientWidth * scale);
    }

    dom.firstChild?.remove();
    dom.appendChild(canvas);

    this.drawBoardLine();
    this.drawStars();
  }

  render(mat?: Matrix, marks?: Matrix) {
    const { boardSize, zoom, extend } = this.options;
    if (this.canvas && mat) {
      this.clearCanvas();
      const ctx = this.canvas.getContext("2d");

      let leftMost: number = boardSize - 1;
      let rightMost: number = 0;
      let topMost: number = boardSize - 1;
      let bottomMost: number = 0;
      forEach(mat, (value: number, index: number[]) => {
        if (value !== 0) {
          if (leftMost > index[0]) leftMost = index[0];
          if (rightMost < index[0]) rightMost = index[0];
          if (topMost > index[1]) topMost = index[1];
          if (bottomMost < index[1]) bottomMost = index[1];
          // console.log("index:", index[0], index[1]);
        }
        // console.log("l", leftMost, rightMost, topMost, bottomMost);
      });
      const midX = (rightMost + leftMost) / 2;
      const midY = (topMost + bottomMost) / 2;

      const ex =
        extend +
        Math.max(
          Math.min(boardSize - rightMost, leftMost),
          Math.min(topMost, boardSize - bottomMost)
        ) -
        1;
      let maxh = rightMost - leftMost + 1;
      let maxv = bottomMost - topMost + 1;
      let maxhv = Math.max(maxh, maxv) + ex;
      if (maxhv > boardSize) maxhv = boardSize;

      const scale = 1 / (maxhv / boardSize);

      const inner = 1 - maxhv / boardSize;
      const distance = this.canvas.width * inner;

      let visibleArea = [
        [0, 18],
        [0, 18],
      ];
      if (zoom) {
        if (midX < boardSize / 2 && midY < boardSize / 2) {
          visibleArea = [
            [0, maxhv - 1],
            [0, maxhv - 1],
          ];
        } else if (midX >= boardSize / 2 && midY < boardSize / 2) {
          console.log("section 2");
          visibleArea = [
            [boardSize - maxhv, 18],
            [0, maxhv - 1],
          ];
        } else if (midX < boardSize / 2 && midY >= boardSize / 2) {
          visibleArea = [
            [0, maxhv - 1],
            [boardSize - maxhv, 18],
          ];
        } else if (midX >= boardSize / 2 && midY >= boardSize / 2) {
          visibleArea = [
            [boardSize - maxhv, 18],
            [boardSize - maxhv, 18],
          ];
        }
        if (ctx) {
          ctx.save();
          // TODO: need to calculate a threshold to center the problem
          let thx = 1;
          let thy = 1;
          const offsetX = midX < boardSize / 2 ? 0 : thx * distance;
          const offsetY = midY < boardSize / 2 ? 0 : thy * distance;
          ctx.scale(scale, scale);
          ctx.translate(-offsetX, -offsetY);
        }
      }

      this.drawBoardLine(visibleArea);
      this.drawStars(visibleArea);
      drawStones(this.canvas, this.options, mat);
      if (marks) {
        drawMarks(this.canvas, this.options, marks);
      }
      ctx?.restore();
      // ctx?.setTransform(1, 0, 0, 1, 0, 0);
    }
  }

  clearCanvas() {
    if (this.canvas) {
      const ctx = this.canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  drawBoardLine = (
    visibleArea = [
      [0, 18],
      [0, 18],
    ]
  ) => {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext("2d");
    const { boardSize } = this.options;
    if (ctx) {
      const { space, scaledPadding } = this.calcSpaceAndPadding(
        this.canvas,
        this.options
      );

      ctx.lineWidth = 1 * devicePixelRatio;
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      for (let i = 0; i < boardSize; i++) {
        ctx.moveTo(
          i * space + scaledPadding,
          scaledPadding + visibleArea[1][0] * space
        );
        ctx.lineTo(
          i * space + scaledPadding,
          space * visibleArea[1][1] + scaledPadding
        );
      }
      for (let i = 0; i < boardSize; i++) {
        ctx.moveTo(
          visibleArea[0][0] * space + scaledPadding,
          i * space + scaledPadding
        );
        ctx.lineTo(
          visibleArea[0][1] * space + scaledPadding,
          i * space + scaledPadding
        );
      }
      ctx.stroke();
    }
  };

  drawStars = (
    visibleArea = [
      [0, 18],
      [0, 18],
    ]
  ) => {
    console.log("va", visibleArea);
    if (!this.canvas) return;
    const ctx = this.canvas.getContext("2d");
    if (ctx) {
      const { space, scaledPadding } = this.calcSpaceAndPadding(
        this.canvas,
        this.options
      );
      // Drawing star
      ctx.stroke();
      [3, 9, 15].forEach((i) => {
        [3, 9, 15].forEach((j) => {
          if (
            i > visibleArea[0][0] &&
            i < visibleArea[0][1] &&
            j > visibleArea[1][0] &&
            j < visibleArea[1][1]
          ) {
            ctx.beginPath();
            ctx.arc(
              i * space + scaledPadding,
              j * space + scaledPadding,
              3 * devicePixelRatio,
              0,
              2 * Math.PI,
              true
            );
            ctx.fillStyle = "black";
            ctx.fill();
          }
        });
      });
    }
  };

  calcSpaceAndPadding = (canvas: HTMLCanvasElement, options: GBoardOptions) => {
    const { padding, boardSize } = options;
    let scaledPadding = padding * devicePixelRatio;
    const space = (canvas.width - scaledPadding * 2) / boardSize;
    scaledPadding = scaledPadding + space / 2;
    return { space, scaledPadding };
  };
}
