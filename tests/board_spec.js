import Board from '../assets/javascripts/board.js';

describe('create a board instance and initial', () => {
  let b = document.createElement('div');
  let board = new Board(b, 19, 30);
  it('should be created and initialed', () => {
    expect(board.grid).toBe(19);
    expect(board.size).toBe(30);
    expect(board.currentCoord).toBe("None");
    expect(board.currentTurn).toBe(1);
    expect(board.step).toBe(1);
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        expect(board._kifuArray[i][j]).toBe(0);
      }
    }
  });

  it('shoule be true when the position is empty', () => {
    board._kifuArray[0][0] = 0;
    expect(board.canMove(0, 0, 1)).toBe(true);
    expect(board.canMove(0, 0, -1)).toBe(true);
    board.clearKifuArray();
  });

  it('shoule be false when the position is not empty', () => {
    board._kifuArray[0][0] = 1;
    expect(board.canMove(0, 0, 1)).toBe(false);
    expect(board.canMove(0, 0, -1)).toBe(false);
    board.clearKifuArray();
  });

  it('shoule be false when the position is not liberty and on the corner', () => {
    board._kifuArray[0][1] = 1;
    board._kifuArray[1][0] = 1;
    expect(board.canMove(0, 0, -1)).toBe(false);
    expect(board.canMove(0, 0, 1)).toBe(true);
    board.clearKifuArray();

    board._kifuArray[0][1] = -1;
    board._kifuArray[1][0] = -1;
    expect(board.canMove(0, 0, 1)).toBe(false);
    expect(board.canMove(0, 0, -1)).toBe(true);
    board.clearKifuArray();
  });

  it('shoule be false when the position is not liberty and on the edge', () => {
    board._kifuArray[0][0] = 1;
    board._kifuArray[1][1] = 1;
    board._kifuArray[2][0] = 1;
    expect(board.canMove(1, 0, -1)).toBe(false);
    expect(board.canMove(1, 0, 1)).toBe(true);
    board.clearKifuArray();

    board._kifuArray[0][0] = -1;
    board._kifuArray[1][1] = -1;
    board._kifuArray[2][0] = -1;
    expect(board.canMove(1, 0, 1)).toBe(false);
    expect(board.canMove(1, 0, -1)).toBe(true);
    board.clearKifuArray();
  });

  it('shoule be false when the position is not liberty and on the center', () => {
    board._kifuArray[1][0] = 1;
    board._kifuArray[0][1] = 1;
    board._kifuArray[2][1] = 1;
    board._kifuArray[1][2] = 1;
    expect(board.canMove(1, 1, -1)).toBe(false);
    expect(board.canMove(1, 1, 1)).toBe(true);
    board.clearKifuArray();

    board._kifuArray[1][0] = -1;
    board._kifuArray[0][1] = -1;
    board._kifuArray[2][1] = -1;
    board._kifuArray[1][2] = -1;
    expect(board.canMove(1, 1, 1)).toBe(false);
    expect(board.canMove(1, 1, -1)).toBe(true);
    board.clearKifuArray();
  });

});
