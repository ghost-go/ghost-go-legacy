import { matrix, zeros, ones, Matrix } from "mathjs";
import { drawBoardLine, drawStars, drawStones, drawMarks } from "./utils";

export type GBoardOptions = {
  boardSize: number;
  size?: number;
  // theme: Stone;
  padding: number;
};

type GBoardOptionsParams = {
  boardSize?: number;
  size?: number;
  padding?: number;
};

export default class GBoard {
  options: GBoardOptions = {
    boardSize: 19,
    padding: 0,
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

    drawBoardLine(canvas, this.options);
    drawStars(canvas, this.options);
  }

  render(mat?: Matrix, marks?: Matrix) {
    if (this.canvas && mat) {
      this.clearCanvas();
      drawBoardLine(this.canvas, this.options);
      drawStars(this.canvas, this.options);
      drawStones(this.canvas, this.options, mat);
      if (marks) {
        drawMarks(this.canvas, this.options, marks);
      }
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
}
