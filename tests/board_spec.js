import Board from '../assets/javascripts/presentations/Board.js'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

describe('create a board instance and initial', () => {

  it ('board component should be initial with editable equal false', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Board editable="false" />
    )

    let div = ReactTestUtils.findRenderedDOMComponentWithTag(
      component, 'div'
    )

    expect(div.className).toEqual('board')
    expect(div.querySelector('canvas#board_layer')).not.toBeNull()
    expect(div.querySelector('canvas#piece_layer')).not.toBeNull()
    expect(div.querySelector('canvas#top_layer')).not.toBeNull()
  })

  it ('board component should be initial with editable equal ture', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Board editable="true" />
    )

    let div = ReactTestUtils.findRenderedDOMComponentWithTag(
      component, 'div'
    )

    expect(div.className).toEqual('board')
    expect(div.querySelector('canvas#board_layer')).not.toBeNull()
    expect(div.querySelector('canvas#piece_layer')).not.toBeNull()
    expect(div.querySelector('canvas#top_layer')).not.toBeNull()
    expect(div.querySelector('canvas#cross_layer')).not.toBeNull()
  })

  it ('board component should be initial with editable equal false and kifu not null', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Board editable="false" kifu="B[pd];W[dc];B[dp];W[pp];B[ce];W[ed];B[ci];W[nc];B[lc];W[ne];B[qf];W[kd];B[ld];W[le];B[kc];W[jd];B[jc];W[id];B[hc];W[df];B[cf];W[dg];B[cg];W[md];B[hd];W[he];B[ge];W[gf];B[ie];W[hf];B[fc];W[qc];B[pc];W[qd];B[pe];W[pb];B[ob];W[qb];B[nb];W[kf];B[ic];W[rf];B[rg];W[re];B[ph];W[jg];B[fe];W[ff];B[qn];W[nq];B[rp];W[qq];B[pl];W[fq];B[dn];W[cq];B[dq];W[dr];B[cp];W[br];B[bq];W[cr];B[ee];W[cd];B[de];W[bc];B[eb];W[db];B[be];W[bb];B[mf];W[nf];B[nh];W[fo];B[mg];W[me];B[hq];W[kq];B[jq];W[jp];B[kr];W[iq];B[jr];W[ip];B[lq];W[ir];B[kp];W[mr];B[fn];W[mp];B[go];W[ko];B[gq];W[jn];B[fr];W[bp];B[bo];W[aq];B[hr];W[hs];B[gs];W[is];B[fi];W[oj];B[ok];W[rh];B[qh];W[sg];B[ri];W[qg];B[pg];W[rj];B[rg];W[si];B[sh];W[qm];B[pm];W[rh];B[qi];W[qg];B[ql];W[gh];B[fh];W[gi];B[gj];W[fg];B[dh];W[hj];B[hk];W[gk];B[fj];W[gn];B[ho];W[hn];B[hi];W[ij];B[hh];W[ji];B[io];W[jo];B[fm];W[ao];B[bn];W[an];B[am];W[ap];B[bm];W[gg];B[hl];W[rq];B[rg];W[sh];B[lo];W[in];B[fp];W[ln];B[mo];W[mn];B[no];W[on];B[nn];W[nm];B[oo];W[po];B[pn];W[om];B[mm];W[nl]"/>
    )

    let div = ReactTestUtils.findRenderedDOMComponentWithTag(
      component, 'div'
    )

    expect(div.querySelector('canvas#top_layer')).not.toBeNull()

    ReactTestUtils.Simulate.click(component.topLayer)
    expect(component.state.step).toEqual(2)
    //expect(component.state.kifuArray[15][3]).toEqual(1)

    ReactTestUtils.Simulate.click(component.topLayer)
    expect(component.state.step).toEqual(3)
    //expect(component.state.kifuArray[3][2]).toEqual(-1)

    ReactTestUtils.Simulate.click(component.topLayer)
    expect(component.state.step).toEqual(4)
    //expect(component.state.kifuArray[3][15]).toEqual(1)

  })

})

//describe('create a board instance and initial', () => {
  //let b = document.createElement('div');
  //let board = new Board(b, 19, 30);
  //it('should be created and initialed', () => {
    //expect(board.grid).toBe(19);
    //expect(board.size).toBe(30);
    //expect(board.currentCoord).toBe("None");
    //expect(board.currentTurn).toBe(1);
    //expect(board.step).toBe(1);
    //for (let i = 0; i < 19; i++) {
      //for (let j = 0; j < 19; j++) {
        //expect(board._kifuArray[i][j]).toBe(0);
      //}
    //}
  //});

  //it('shoule be true when the position is empty', () => {
    //board._kifuArray[0][0] = 0;
    //expect(board.canMove(0, 0, 1)).toBe(true);
    //expect(board.canMove(0, 0, -1)).toBe(true);
    //board.clearKifuArray();
  //});

  //it('shoule be false when the position is not empty', () => {
    //board._kifuArray[0][0] = 1;
    //expect(board.canMove(0, 0, 1)).toBe(false);
    //expect(board.canMove(0, 0, -1)).toBe(false);
    //board.clearKifuArray();
  //});

  //it('shoule be false when the position is not liberty and on the corner', () => {
    //board._kifuArray[0][1] = 1;
    //board._kifuArray[1][0] = 1;
    //expect(board.canMove(0, 0, -1)).toBe(false);
    //expect(board.canMove(0, 0, 1)).toBe(true);
    //board.clearKifuArray();

    //board._kifuArray[0][1] = -1;
    //board._kifuArray[1][0] = -1;
    //expect(board.canMove(0, 0, 1)).toBe(false);
    //expect(board.canMove(0, 0, -1)).toBe(true);
    //board.clearKifuArray();
  //});

  //it('shoule be false when the position is not liberty and on the edge', () => {
    //board._kifuArray[0][0] = 1;
    //board._kifuArray[1][1] = 1;
    //board._kifuArray[2][0] = 1;
    //expect(board.canMove(1, 0, -1)).toBe(false);
    //expect(board.canMove(1, 0, 1)).toBe(true);
    //board.clearKifuArray();

    //board._kifuArray[0][0] = -1;
    //board._kifuArray[1][1] = -1;
    //board._kifuArray[2][0] = -1;
    //expect(board.canMove(1, 0, 1)).toBe(false);
    //expect(board.canMove(1, 0, -1)).toBe(true);
    //board.clearKifuArray();
  //});

  //it('shoule be false when the position is not liberty and on the center', () => {
    //board._kifuArray[1][0] = 1;
    //board._kifuArray[0][1] = 1;
    //board._kifuArray[2][1] = 1;
    //board._kifuArray[1][2] = 1;
    //expect(board.canMove(1, 1, -1)).toBe(false);
    //expect(board.canMove(1, 1, 1)).toBe(true);
    //board.clearKifuArray();

    //board._kifuArray[1][0] = -1;
    //board._kifuArray[0][1] = -1;
    //board._kifuArray[2][1] = -1;
    //board._kifuArray[1][2] = -1;
    //expect(board.canMove(1, 1, 1)).toBe(false);
    //expect(board.canMove(1, 1, -1)).toBe(true);
    //board.clearKifuArray();
  //});

//});
