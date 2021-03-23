import { matrix, zeros, forEach, Matrix } from "mathjs";
import { A1_LETTERS, A1_NUMBERS } from "utils/constants";

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

// const devicePixelRatio = window.devicePixelRatio;
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
  coordinates: boolean;
  interactive: boolean;
};

type GBanOptionsParams = {
  boardSize?: number;
  size?: number;
  padding?: number;
  zoom?: boolean;
  extend?: number;
  theme?: Theme;
  interactive?: boolean;
  coordinates?: boolean;
};

export default class GBan {
  options: GBanOptions = {
    boardSize: 19,
    padding: 10,
    extend: 2,
    interactive: false,
    coordinates: true,
    // matrix: matrix(math.ones([19, 19])),
  };
  canvas?: HTMLCanvasElement;
  resources: {
    board: HTMLImageElement | null;
    white: HTMLImageElement[];
    black: HTMLImageElement[];
  };
  nextMove: number;
  cursor: [number, number];
  mat: Matrix;
  marks: Matrix;
  maxhv: number;
  transMat: DOMMatrix;

  constructor(options?: GBanOptionsParams) {
    const defaultOptions = this.options;
    this.resources = {
      board: null,
      white: [],
      black: [],
    };
    this.mat = matrix(zeros([19, 19]));
    this.marks = matrix(zeros([19, 19]));
    this.nextMove = 1;
    this.cursor = [18, 0];
    this.maxhv = this.options.boardSize;
    this.transMat = new DOMMatrix();

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
    this.transMat = new DOMMatrix();
    const canvas = document.createElement("canvas");
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
      canvas.width = Math.floor(clientWidth * devicePixelRatio);
      canvas.height = Math.floor(clientWidth * devicePixelRatio);
    }
    dom.firstChild?.remove();
    dom.appendChild(canvas);

    const { interactive, padding } = this.options;
    const { space } = this.#calcSpaceAndPadding();
    if (interactive) {
      canvas.onmousemove = (e) => {
        const point = this.transMat
          .inverse()
          .transformPoint(
            new DOMPoint(
              e.offsetX * devicePixelRatio,
              e.offsetY * devicePixelRatio
            )
          );
        const idx = Math.round((point.x - padding + space / 2) / space);
        const idy = Math.round((point.y - padding + space / 2) / space);
        this.cursor = [idx - 1, idy - 1];
        this.render(this.mat, this.marks);
      };
    }
  }

  setOptions(options: GBanOptionsParams) {
    this.options = { ...this.options, ...options };
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

  render(mat?: Matrix, marks?: Matrix, nextMove?: any) {
    if (mat) this.mat = mat;
    if (marks) this.marks = marks;
    const { boardSize, zoom, extend, interactive, coordinates } = this.options;
    const canvas = this.canvas;
    if (canvas) {
      this.#clearCanvas();
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

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

      let maxh = rightMost - leftMost + 1;
      let maxv = bottomMost - topMost + 1;
      const revision =
        maxh > maxv
          ? Math.min(boardSize - rightMost - 1, leftMost)
          : Math.min(topMost, boardSize - bottomMost - 1);
      let maxhv = Math.max(maxh, maxv) + extend + revision;
      if (maxhv > boardSize) maxhv = boardSize;
      this.maxhv = maxhv;

      const scale = 1 / (maxhv / boardSize);
      const inner = 1 - maxhv / boardSize;
      const distance = canvas.width * inner;

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
          const offsetX = midX < boardSize / 2 ? 0 : distance * scale;
          const offsetY = midY < boardSize / 2 ? 0 : distance * scale;

          this.transMat = new DOMMatrix();
          this.transMat.translateSelf(-offsetX, -offsetY);
          this.transMat.scaleSelf(scale, scale);
          ctx.setTransform(this.transMat);
        }
      }

      this.#drawBan();
      this.#drawBoardLine(visibleArea);
      this.#drawStars(visibleArea);
      if (interactive) {
        this.#drawCursor(visibleArea);
      }
      if (coordinates) {
        this.#drawCoordinates(visibleArea);
      }
      this.#drawStones(this.mat);
      this.#drawMarks(this.marks);
      // ctx?.restore();
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

  #drawMarks = (matrix: Matrix) => {
    const canvas = this.canvas;
    if (canvas) {
      forEach(matrix, (value, index) => {
        if (value !== 0) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const { space, scaledPadding } = this.#calcSpaceAndPadding();
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
    if (ctx) {
      const { space, scaledPadding } = this.#calcSpaceAndPadding();

      ctx.lineWidth = 1 * devicePixelRatio;
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      for (let i = visibleArea[0][0]; i <= visibleArea[0][1]; i++) {
        ctx.moveTo(
          i * space + scaledPadding,
          scaledPadding + visibleArea[1][0] * space
        );
        ctx.lineTo(
          i * space + scaledPadding,
          space * visibleArea[1][1] + scaledPadding
        );
      }
      for (let i = visibleArea[1][0]; i <= visibleArea[1][1]; i++) {
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
      const { space, scaledPadding } = this.#calcSpaceAndPadding();
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

  #drawCoordinates = (
    visibleArea = [
      [0, 18],
      [0, 18],
    ]
  ) => {
    const canvas = this.canvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { space, scaledPadding } = this.#calcSpaceAndPadding();
    if (ctx) {
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = "#000000";
      ctx.font = `bold ${space / 2.8}px Helvetica`;

      const offset = space / 3;
      A1_LETTERS.forEach((l, index) => {
        const x = space * index + scaledPadding;
        if (index >= visibleArea[0][0] && index <= visibleArea[0][1]) {
          ctx.fillText(l, x, 0 + offset);
          ctx.fillText(l, x, canvas.height - offset);
        }
      });
      A1_NUMBERS.forEach((l: number, index) => {
        const y = space * index + scaledPadding;
        if (index >= visibleArea[1][0] && index <= visibleArea[1][1]) {
          ctx.fillText(l.toString(), offset, y);
          ctx.fillText(l.toString(), canvas.width - offset, y);
        }
      });
    }
  };

  #calcSpaceAndPadding = () => {
    let space = 0;
    let scaledPadding = 0;
    if (this.canvas) {
      const { padding, boardSize } = this.options;
      // scaledPadding = padding * devicePixelRatio;
      scaledPadding = padding;
      space = (this.canvas.width - scaledPadding * 2) / boardSize;
      scaledPadding = scaledPadding + space / 2;
    }
    return { space, scaledPadding };
  };

  #drawCursor = (visibleArea: number[][]) => {
    const canvas = this.canvas;
    if (canvas) {
      const { padding } = this.options;
      const ctx = canvas.getContext("2d");
      const { space } = this.#calcSpaceAndPadding();

      const [idx, idy] = this.cursor;
      if (idx < visibleArea[0][0] || idx > visibleArea[0][1]) return;
      if (idy < visibleArea[1][0] || idy > visibleArea[1][1]) return;
      const x = idx * space + space / 2 + padding;
      const y = idy * space + space / 2 + padding;
      if (ctx) {
        const size = space * 0.4;
        ctx.save();
        if (this.nextMove === 1) {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, 2 * Math.PI, true);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#000";
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = "#000";
          ctx.fill();
          ctx.stroke();
          ctx.globalAlpha = 1;
        } else {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, 2 * Math.PI, true);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#FFF";
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = "#FFF";
          ctx.fill();
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        ctx.restore();
      }
    }
  };

  #drawStones = (matrix: Matrix) => {
    const canvas = this.canvas;
    const { theme } = this.options;
    if (canvas) {
      forEach(matrix, (value, index) => {
        if (value !== 0) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const { space, scaledPadding } = this.#calcSpaceAndPadding();
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
