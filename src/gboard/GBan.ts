import { matrix, zeros, ones, forEach, Matrix } from "mathjs";
import _ from "lodash";
import { drawMarks } from "./utils";

import SubduedBoard from "assets/images/theme/subdued/board.png";
import SubduedWhite from "assets/images/theme/subdued/white.png";
import SubduedBlack from "assets/images/theme/subdued/black.png";

import ShellBoard from "assets/images/theme/shell-stone/board.png";
import ShellBlack from "assets/images/theme/shell-stone/black.png";
import ShellWhite0 from "assets/images/theme/shell-stone/white0.png";
import ShellWhite1 from "assets/images/theme/shell-stone/white1.png";
import ShellWhite2 from "assets/images/theme/shell-stone/white2.png";
import ShellWhite3 from "assets/images/theme/shell-stone/white3.png";
import ShellWhite4 from "assets/images/theme/shell-stone/white4.png";

import SlateAndShellBoard from "assets/images/theme/slate-and-shell/board.png";
import SlateAndShellBlack0 from "assets/images/theme/slate-and-shell/slate1.png";
import SlateAndShellBlack1 from "assets/images/theme/slate-and-shell/slate2.png";
import SlateAndShellBlack2 from "assets/images/theme/slate-and-shell/slate3.png";
import SlateAndShellBlack3 from "assets/images/theme/slate-and-shell/slate4.png";
import SlateAndShellBlack4 from "assets/images/theme/slate-and-shell/slate5.png";
import SlateAndShellWhite0 from "assets/images/theme/slate-and-shell/shell1.png";
import SlateAndShellWhite1 from "assets/images/theme/slate-and-shell/shell2.png";
import SlateAndShellWhite2 from "assets/images/theme/slate-and-shell/shell3.png";
import SlateAndShellWhite3 from "assets/images/theme/slate-and-shell/shell4.png";
import SlateAndShellWhite4 from "assets/images/theme/slate-and-shell/shell5.png";

import WalnutBoard from "assets/images/theme/walnut/board.jpg";
import WalnutBlack from "assets/images/theme/walnut/black.png";
import WalnutWhite from "assets/images/theme/walnut/white.png";

import PhotorealisticBoard from "assets/images/theme/photorealistic/board.png";
import PhotorealisticBlack from "assets/images/theme/photorealistic/black.png";
import PhotorealisticWhite from "assets/images/theme/photorealistic/white.png";

const devicePixelRatio = window.devicePixelRatio;

export enum Theme {
  BlackAndWhite = "Black&White",
  Flat = "Flat",
  Subdued = "Subdued",
  ShellStone = "Shell",
  SlateAndShell = "SlateAndShell",
  Walnut = "Walnet",
  Photorealistic = "Photorealistic",
}

const Resources = {
  [Theme.Subdued]: {
    board: SubduedBoard,
    black: [SubduedBlack],
    white: [SubduedWhite],
  },
  [Theme.ShellStone]: {
    board: ShellBoard,
    black: [ShellBlack],
    white: [ShellWhite0, ShellWhite1, ShellWhite2, ShellWhite3, ShellWhite4],
  },
  [Theme.SlateAndShell]: {
    board: SlateAndShellBoard,
    black: [
      SlateAndShellBlack0,
      SlateAndShellBlack1,
      SlateAndShellBlack2,
      SlateAndShellBlack3,
      SlateAndShellBlack4,
    ],
    white: [
      SlateAndShellWhite0,
      SlateAndShellWhite1,
      SlateAndShellWhite2,
      SlateAndShellWhite3,
      SlateAndShellWhite4,
    ],
  },
  [Theme.Walnut]: {
    board: WalnutBoard,
    black: [WalnutBlack],
    white: [WalnutWhite],
  },
  [Theme.Photorealistic]: {
    board: PhotorealisticBoard,
    black: [PhotorealisticBlack],
    white: [PhotorealisticWhite],
  },
};

export type GBanOptions = {
  boardSize: number;
  size?: number;
  // theme: Stone;
  padding: number;
  zoom?: boolean;
  extend: number;
  theme?: Theme;
};

type GBanOptionsParams = {
  boardSize?: number;
  size?: number;
  padding?: number;
  zoom?: boolean;
  extend?: number;
  theme?: Theme;
};

export default class GBan {
  options: GBanOptions = {
    boardSize: 19,
    padding: 10,
    extend: 2,
    // matrix: matrix(math.ones([19, 19])),
  };
  canvas?: HTMLCanvasElement;
  resources: {
    board: HTMLImageElement | null;
    white: HTMLImageElement[];
    black: HTMLImageElement[];
  };
  mat: Matrix;
  marks: Matrix;

  constructor(options?: GBanOptionsParams) {
    const defaultOptions = this.options;
    this.resources = {
      board: null,
      white: [],
      black: [],
    };
    this.mat = matrix(zeros([19, 19]));
    this.marks = matrix(zeros([19, 19]));

    if (options) {
      this.options = {
        ...defaultOptions,
        ...options,
      };
    }
  }

  init(dom: HTMLElement) {
    this.mat = matrix(zeros([19, 19]));
    this.marks = matrix(zeros([19, 19]));
    const canvas = document.createElement("canvas");
    const scale = window.devicePixelRatio;
    const { size } = this.options;
    canvas.style.position = "absolute";
    this.canvas = canvas;
    if (size) {
      canvas.width = size;
      canvas.height = size;
    } else {
      const { clientWidth } = dom;
      canvas.style.width = clientWidth + "px";
      canvas.style.height = clientWidth + "px";
      canvas.width = Math.floor(clientWidth * scale);
      canvas.height = Math.floor(clientWidth * scale);
    }
    dom.firstChild?.remove();
    dom.appendChild(canvas);
  }

  setTheme(theme: Theme, mat?: Matrix, marks?: Matrix) {
    if (this.options.theme === theme) return;
    const shadowStyle = "3px 3px 3px #aaaaaa";
    const canvas = this.canvas;
    if (canvas) {
      this.options.theme = theme;
      if (theme === Theme.BlackAndWhite) {
        canvas.style.boxShadow = "0px 0px 0px #000000";
      } else if (theme === Theme.Flat) {
        canvas.style.boxShadow = shadowStyle;
      } else {
        const board = new Image();
        board.src = Resources[theme].board; // Set source path

        const blacks = Resources[theme].black.map((i) => {
          const img = new Image();
          img.src = i;
          return img;
        });
        const whites = Resources[theme].white.map((i) => {
          const img = new Image();
          img.src = i;
          return img;
        });
        Promise.all(
          Array.from([board, ...blacks, ...whites])
            .filter((img) => !img.complete)
            .map(
              (img) =>
                new Promise((resolve) => {
                  img.onload = img.onerror = resolve;
                })
            )
        ).then(() => {
          this.resources.black = blacks;
          this.resources.white = whites;
          this.resources.board = board;
          console.log("re-render");
          this.render(mat, marks);
        });
      }
    }
  }

  render(mat?: Matrix, marks?: Matrix) {
    if (mat) this.mat = mat;
    if (marks) this.marks = marks;
    const { boardSize, zoom, extend } = this.options;
    if (this.canvas) {
      this.#clearCanvas();
      const ctx = this.canvas.getContext("2d");

      let leftMost: number = boardSize - 1;
      let rightMost: number = 0;
      let topMost: number = boardSize - 1;
      let bottomMost: number = 0;
      forEach(this.mat, (value: number, index: number[]) => {
        if (value !== 0) {
          if (leftMost > index[0]) leftMost = index[0];
          if (rightMost < index[0]) rightMost = index[0];
          if (topMost > index[1]) topMost = index[1];
          if (bottomMost < index[1]) bottomMost = index[1];
        }
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

      this.#drawBan();
      this.#drawBoardLine(visibleArea);
      this.#drawStars(visibleArea);
      this.#drawStones(this.mat);
      drawMarks(this.canvas, this.options, this.marks);
      ctx?.restore();
      // ctx?.setTransform(1, 0, 0, 1, 0, 0);
    }
  }

  #clearCanvas = () => {
    if (this.canvas) {
      const ctx = this.canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  };

  #drawBan = () => {
    const { canvas } = this;
    const { theme } = this.options;
    if (canvas) {
      canvas.style.borderRadius = "2px";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (theme === Theme.BlackAndWhite) {
          canvas.style.boxShadow = "0px 0px 0px #000000";
        } else if (theme === Theme.Flat) {
          ctx.fillStyle = "#ECB55A";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (theme === Theme.Walnut) {
          if (this.resources.board) {
            ctx.drawImage(
              this.resources.board,
              0,
              0,
              canvas.width,
              canvas.height
            );
          }
        } else {
          if (this.resources.board) {
            const pattern = ctx.createPattern(this.resources.board, "repeat");
            if (pattern) {
              ctx.fillStyle = pattern;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
          }
        }
      }
    }
  };

  #drawBoardLine = (
    visibleArea = [
      [0, 18],
      [0, 18],
    ]
  ) => {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext("2d");
    const { boardSize } = this.options;
    if (ctx) {
      const { space, scaledPadding } = this.#calcSpaceAndPadding(
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

  #drawStars = (
    visibleArea = [
      [0, 18],
      [0, 18],
    ]
  ) => {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext("2d");
    if (ctx) {
      const { space, scaledPadding } = this.#calcSpaceAndPadding(
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

  #calcSpaceAndPadding = (canvas: HTMLCanvasElement, options: GBanOptions) => {
    const { padding, boardSize } = options;
    let scaledPadding = padding * devicePixelRatio;
    const space = (canvas.width - scaledPadding * 2) / boardSize;
    scaledPadding = scaledPadding + space / 2;
    return { space, scaledPadding };
  };

  #drawStones = (matrix: Matrix) => {
    const canvas = this.canvas;
    const theme = this.options.theme;
    if (canvas) {
      forEach(matrix, (value, index) => {
        if (value !== 0) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const { space, scaledPadding } = this.#calcSpaceAndPadding(
              canvas,
              this.options
            );
            const x = scaledPadding + index[0] * space;
            const y = scaledPadding + index[1] * space;

            const ratio = 0.46;
            ctx.save();
            if (
              theme === Theme.Subdued ||
              theme === Theme.BlackAndWhite ||
              theme === Theme.Flat
            ) {
            } else {
              ctx.shadowOffsetX = 3;
              ctx.shadowOffsetY = 3;
              ctx.shadowColor = "#555";
              ctx.shadowBlur = 8;
            }
            if (theme === Theme.BlackAndWhite || theme === Theme.Flat) {
              ctx.beginPath();
              ctx.arc(x, y, space * ratio, 0, 2 * Math.PI, true);
              ctx.lineWidth = 1;
              ctx.strokeStyle = "#000";
              if (value === 1) {
                ctx.fillStyle = "#000";
              } else if (value === -1) {
                ctx.fillStyle = "#fff";
              }
              ctx.fill();
              ctx.stroke();
            } else {
              const mod = index[0] + 10 + index[1];
              let img;
              if (value === 1) {
                img = this.resources.black[mod % this.resources.black.length];
              } else {
                img = this.resources.white[mod % this.resources.white.length];
              }
              if (img) {
                const size = space * ratio * 2;
                ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
              }
            }
            ctx.restore();
          }
        }
      });
    }
  };
}
