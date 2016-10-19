import ControlBar from '../assets/javascripts/presentations/ControlBar'
import Board from '../assets/javascripts/presentations/Board.js'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

describe('create a control bar instance and initial', () => {
  //it ('controlbar component should be initial', () => { let component = ReactTestUtils.renderIntoDocument( <ControlBar />) let div = ReactTestUtils.findRenderedDOMComponentWithTag( component, 'div') expect(div.className).toEqual('control-bar') expect(div.querySelector('.move-control')).not.toBeNull() expect(div.querySelector('.fa-fast-backward')).not.toBeNull() expect(div.querySelector('.fa-backward')).not.toBeNull() expect(div.querySelector('.fa-step-backward')).not.toBeNull() expect(div.querySelector('.fa-play')).not.toBeNull() expect(div.querySelector('.fa-step-forward')).not.toBeNull() expect(div.querySelector('.fa-forward')).not.toBeNull() expect(div.querySelector('.fa-fast-forward')).not.toBeNull() }) it ('controlbar first step', () => { let board = ReactTestUtils.renderIntoDocument( <Board editable="false" kifu="B[pd];W[dc];B[dp];W[pp];B[ce];W[ed];B[ci];W[nc];B[lc];W[ne];B[qf];W[kd];B[ld];W[le];B[kc];W[jd];B[jc];W[id];B[hc];W[df];B[cf];W[dg];B[cg];W[md];B[hd];W[he];B[ge];W[gf];B[ie];W[hf];B[fc];W[qc];B[pc];W[qd];B[pe];W[pb];B[ob];W[qb];B[nb];W[kf];B[ic];W[rf];B[rg];W[re];B[ph];W[jg];B[fe];W[ff];B[qn];W[nq];B[rp];W[qq];B[pl];W[fq];B[dn];W[cq];B[dq];W[dr];B[cp];W[br];B[bq];W[cr];B[ee];W[cd];B[de];W[bc];B[eb];W[db];B[be];W[bb];B[mf];W[nf];B[nh];W[fo];B[mg];W[me];B[hq];W[kq];B[jq];W[jp];B[kr];W[iq];B[jr];W[ip];B[lq];W[ir];B[kp];W[mr];B[fn];W[mp];B[go];W[ko];B[gq];W[jn];B[fr];W[bp];B[bo];W[aq];B[hr];W[hs];B[gs];W[is];B[fi];W[oj];B[ok];W[rh];B[qh];W[sg];B[ri];W[qg];B[pg];W[rj];B[rg];W[si];B[sh];W[qm];B[pm];W[rh];B[qi];W[qg];B[ql];W[gh];B[fh];W[gi];B[gj];W[fg];B[dh];W[hj];B[hk];W[gk];B[fj];W[gn];B[ho];W[hn];B[hi];W[ij];B[hh];W[ji];B[io];W[jo];B[fm];W[ao];B[bn];W[an];B[am];W[ap];B[bm];W[gg];B[hl];W[rq];B[rg];W[sh];B[lo];W[in];B[fp];W[ln];B[mo];W[mn];B[no];W[on];B[nn];W[nm];B[oo];W[po];B[pn];W[om];B[mm];W[nl]"/>) board.size = 20 let controlbar = ReactTestUtils.renderIntoDocument( <ControlBar board={board}/>) ReactTestUtils.Simulate.click(controlbar.refs.firstStep)
    //expect(board.state.step).toEqual(1)
    //expect(board._kifuArray[15][3]).toEqual(1)
    //expect(board._kifuArray[3][2]).toEqual(0)
    //expect(board._kifuArray[3][15]).toEqual(0)
  //})

  //it ('controlbar prev 10 step when less than 10 step', () => {
    //let board = ReactTestUtils.renderIntoDocument(
      //<Board editable="false" kifu="B[pd];W[dc];B[dp];W[pp];B[ce];W[ed];B[ci];W[nc];B[lc];W[ne];B[qf];W[kd];B[ld];W[le];B[kc];W[jd];B[jc];W[id];B[hc];W[df];B[cf];W[dg];B[cg];W[md];B[hd];W[he];B[ge];W[gf];B[ie];W[hf];B[fc];W[qc];B[pc];W[qd];B[pe];W[pb];B[ob];W[qb];B[nb];W[kf];B[ic];W[rf];B[rg];W[re];B[ph];W[jg];B[fe];W[ff];B[qn];W[nq];B[rp];W[qq];B[pl];W[fq];B[dn];W[cq];B[dq];W[dr];B[cp];W[br];B[bq];W[cr];B[ee];W[cd];B[de];W[bc];B[eb];W[db];B[be];W[bb];B[mf];W[nf];B[nh];W[fo];B[mg];W[me];B[hq];W[kq];B[jq];W[jp];B[kr];W[iq];B[jr];W[ip];B[lq];W[ir];B[kp];W[mr];B[fn];W[mp];B[go];W[ko];B[gq];W[jn];B[fr];W[bp];B[bo];W[aq];B[hr];W[hs];B[gs];W[is];B[fi];W[oj];B[ok];W[rh];B[qh];W[sg];B[ri];W[qg];B[pg];W[rj];B[rg];W[si];B[sh];W[qm];B[pm];W[rh];B[qi];W[qg];B[ql];W[gh];B[fh];W[gi];B[gj];W[fg];B[dh];W[hj];B[hk];W[gk];B[fj];W[gn];B[ho];W[hn];B[hi];W[ij];B[hh];W[ji];B[io];W[jo];B[fm];W[ao];B[bn];W[an];B[am];W[ap];B[bm];W[gg];B[hl];W[rq];B[rg];W[sh];B[lo];W[in];B[fp];W[ln];B[mo];W[mn];B[no];W[on];B[nn];W[nm];B[oo];W[po];B[pn];W[om];B[mm];W[nl]"/>
    //)

    //board.size = 20

    //let controlbar = ReactTestUtils.renderIntoDocument(
      //<ControlBar board={board}/>
    //)

    //ReactTestUtils.Simulate.click(controlbar.refs.prev10Step)
    //expect(board.state.step).toEqual(1)
    //expect(board._kifuArray[15][3]).toEqual(1)
    //expect(board._kifuArray[3][2]).toEqual(0)
    //expect(board._kifuArray[3][15]).toEqual(0)
  //})

  //it ('controlbar prev 10 step when more than 10 step', () => {
    //let board = ReactTestUtils.renderIntoDocument(
      //<Board editable="false" kifu="B[pd];W[dc];B[dp];W[pp];B[ce];W[ed];B[ci];W[nc];B[lc];W[ne];B[qf];W[kd];B[ld];W[le];B[kc];W[jd];B[jc];W[id];B[hc];W[df];B[cf];W[dg];B[cg];W[md];B[hd];W[he];B[ge];W[gf];B[ie];W[hf];B[fc];W[qc];B[pc];W[qd];B[pe];W[pb];B[ob];W[qb];B[nb];W[kf];B[ic];W[rf];B[rg];W[re];B[ph];W[jg];B[fe];W[ff];B[qn];W[nq];B[rp];W[qq];B[pl];W[fq];B[dn];W[cq];B[dq];W[dr];B[cp];W[br];B[bq];W[cr];B[ee];W[cd];B[de];W[bc];B[eb];W[db];B[be];W[bb];B[mf];W[nf];B[nh];W[fo];B[mg];W[me];B[hq];W[kq];B[jq];W[jp];B[kr];W[iq];B[jr];W[ip];B[lq];W[ir];B[kp];W[mr];B[fn];W[mp];B[go];W[ko];B[gq];W[jn];B[fr];W[bp];B[bo];W[aq];B[hr];W[hs];B[gs];W[is];B[fi];W[oj];B[ok];W[rh];B[qh];W[sg];B[ri];W[qg];B[pg];W[rj];B[rg];W[si];B[sh];W[qm];B[pm];W[rh];B[qi];W[qg];B[ql];W[gh];B[fh];W[gi];B[gj];W[fg];B[dh];W[hj];B[hk];W[gk];B[fj];W[gn];B[ho];W[hn];B[hi];W[ij];B[hh];W[ji];B[io];W[jo];B[fm];W[ao];B[bn];W[an];B[am];W[ap];B[bm];W[gg];B[hl];W[rq];B[rg];W[sh];B[lo];W[in];B[fp];W[ln];B[mo];W[mn];B[no];W[on];B[nn];W[nm];B[oo];W[po];B[pn];W[om];B[mm];W[nl]"/>
    //)
    //board.size = 40.5

    //let controlbar = ReactTestUtils.renderIntoDocument(
      //<ControlBar board={board}/>
    //)

    //for (let i=0; i < 30; i++) {
      //ReactTestUtils.Simulate.click(board.topLayer)
    //}

    //expect(board.state.step).toEqual(30)

    //ReactTestUtils.Simulate.click(controlbar.refs.prev10Step)
    //expect(board.state.step).toEqual(20)
    ////expect(board._kifuArray[15][3]).toEqual(1)
    ////expect(board._kifuArray[3][2]).toEqual(0)
    ////expect(board._kifuArray[3][15]).toEqual(0)
  //})

  //it ('controlbar next step', () => {
    //let board = ReactTestUtils.renderIntoDocument(
      //<Board editable="false" kifu="B[pd];W[dc];B[dp];W[pp];B[ce];W[ed];B[ci];W[nc];B[lc];W[ne];B[qf];W[kd];B[ld];W[le];B[kc];W[jd];B[jc];W[id];B[hc];W[df];B[cf];W[dg];B[cg];W[md];B[hd];W[he];B[ge];W[gf];B[ie];W[hf];B[fc];W[qc];B[pc];W[qd];B[pe];W[pb];B[ob];W[qb];B[nb];W[kf];B[ic];W[rf];B[rg];W[re];B[ph];W[jg];B[fe];W[ff];B[qn];W[nq];B[rp];W[qq];B[pl];W[fq];B[dn];W[cq];B[dq];W[dr];B[cp];W[br];B[bq];W[cr];B[ee];W[cd];B[de];W[bc];B[eb];W[db];B[be];W[bb];B[mf];W[nf];B[nh];W[fo];B[mg];W[me];B[hq];W[kq];B[jq];W[jp];B[kr];W[iq];B[jr];W[ip];B[lq];W[ir];B[kp];W[mr];B[fn];W[mp];B[go];W[ko];B[gq];W[jn];B[fr];W[bp];B[bo];W[aq];B[hr];W[hs];B[gs];W[is];B[fi];W[oj];B[ok];W[rh];B[qh];W[sg];B[ri];W[qg];B[pg];W[rj];B[rg];W[si];B[sh];W[qm];B[pm];W[rh];B[qi];W[qg];B[ql];W[gh];B[fh];W[gi];B[gj];W[fg];B[dh];W[hj];B[hk];W[gk];B[fj];W[gn];B[ho];W[hn];B[hi];W[ij];B[hh];W[ji];B[io];W[jo];B[fm];W[ao];B[bn];W[an];B[am];W[ap];B[bm];W[gg];B[hl];W[rq];B[rg];W[sh];B[lo];W[in];B[fp];W[ln];B[mo];W[mn];B[no];W[on];B[nn];W[nm];B[oo];W[po];B[pn];W[om];B[mm];W[nl]"/>
    //)
    //board.size = 40.5

    //let controlbar = ReactTestUtils.renderIntoDocument(
      //<ControlBar board={board}/>
    //)

    //ReactTestUtils.Simulate.click(controlbar.refs.nextStep)
    //expect(board.state.step).toEqual(1)
    //expect(board._kifuArray[15][3]).toEqual(1)

    //ReactTestUtils.Simulate.click(controlbar.refs.nextStep)
    //expect(board.state.step).toEqual(2)
    //expect(board._kifuArray[3][2]).toEqual(-1)

    //ReactTestUtils.Simulate.click(controlbar.refs.nextStep)
    //expect(board.state.step).toEqual(3)
    //expect(board._kifuArray[3][15]).toEqual(1)
  //})

  //it ('controlbar next 10 step', () => {
    //let board = ReactTestUtils.renderIntoDocument(
      //<Board editable="false" kifu="B[pd];W[dc];B[dp];W[pp];B[ce];W[ed];B[ci];W[nc];B[lc];W[ne];B[qf];W[kd];B[ld];W[le];B[kc];W[jd];B[jc];W[id];B[hc];W[df];B[cf];W[dg];B[cg];W[md];B[hd];W[he];B[ge];W[gf];B[ie];W[hf];B[fc];W[qc];B[pc];W[qd];B[pe];W[pb];B[ob];W[qb];B[nb];W[kf];B[ic];W[rf];B[rg];W[re];B[ph];W[jg];B[fe];W[ff];B[qn];W[nq];B[rp];W[qq];B[pl];W[fq];B[dn];W[cq];B[dq];W[dr];B[cp];W[br];B[bq];W[cr];B[ee];W[cd];B[de];W[bc];B[eb];W[db];B[be];W[bb];B[mf];W[nf];B[nh];W[fo];B[mg];W[me];B[hq];W[kq];B[jq];W[jp];B[kr];W[iq];B[jr];W[ip];B[lq];W[ir];B[kp];W[mr];B[fn];W[mp];B[go];W[ko];B[gq];W[jn];B[fr];W[bp];B[bo];W[aq];B[hr];W[hs];B[gs];W[is];B[fi];W[oj];B[ok];W[rh];B[qh];W[sg];B[ri];W[qg];B[pg];W[rj];B[rg];W[si];B[sh];W[qm];B[pm];W[rh];B[qi];W[qg];B[ql];W[gh];B[fh];W[gi];B[gj];W[fg];B[dh];W[hj];B[hk];W[gk];B[fj];W[gn];B[ho];W[hn];B[hi];W[ij];B[hh];W[ji];B[io];W[jo];B[fm];W[ao];B[bn];W[an];B[am];W[ap];B[bm];W[gg];B[hl];W[rq];B[rg];W[sh];B[lo];W[in];B[fp];W[ln];B[mo];W[mn];B[no];W[on];B[nn];W[nm];B[oo];W[po];B[pn];W[om];B[mm];W[nl]"/>
    //)
    //board.size = 40.5

    //let controlbar = ReactTestUtils.renderIntoDocument(
      //<ControlBar board={board}/>
    //)

    //ReactTestUtils.Simulate.click(controlbar.refs.next10Step)
    //expect(board.state.step).toEqual(10)

  //})

  //it ('controlbar last step', () => {
    //let board = ReactTestUtils.renderIntoDocument(
      //<Board  editable="false" kifu="B[pd];W[dc];B[dp];W[pp];B[ce];W[ed];B[ci];W[nc];B[lc];W[ne];B[qf];W[kd];B[ld];W[le];B[kc];W[jd];B[jc];W[id];B[hc];W[df];B[cf];W[dg];B[cg];W[md];B[hd];W[he];B[ge];W[gf];B[ie];W[hf];B[fc];W[qc];B[pc];W[qd];B[pe];W[pb];B[ob];W[qb];B[nb];W[kf];B[ic];W[rf];B[rg];W[re];B[ph];W[jg];B[fe];W[ff];B[qn];W[nq];B[rp];W[qq];B[pl];W[fq];B[dn];W[cq];B[dq];W[dr];B[cp];W[br];B[bq];W[cr];B[ee];W[cd];B[de];W[bc];B[eb];W[db];B[be];W[bb];B[mf];W[nf];B[nh];W[fo];B[mg];W[me];B[hq];W[kq];B[jq];W[jp];B[kr];W[iq];B[jr];W[ip];B[lq];W[ir];B[kp];W[mr];B[fn];W[mp];B[go];W[ko];B[gq];W[jn];B[fr];W[bp];B[bo];W[aq];B[hr];W[hs];B[gs];W[is];B[fi];W[oj];B[ok];W[rh];B[qh];W[sg];B[ri];W[qg];B[pg];W[rj];B[rg];W[si];B[sh];W[qm];B[pm];W[rh];B[qi];W[qg];B[ql];W[gh];B[fh];W[gi];B[gj];W[fg];B[dh];W[hj];B[hk];W[gk];B[fj];W[gn];B[ho];W[hn];B[hi];W[ij];B[hh];W[ji];B[io];W[jo];B[fm];W[ao];B[bn];W[an];B[am];W[ap];B[bm];W[gg];B[hl];W[rq];B[rg];W[sh];B[lo];W[in];B[fp];W[ln];B[mo];W[mn];B[no];W[on];B[nn];W[nm];B[oo];W[po];B[pn];W[om];B[mm];W[nl]"/>
    //)
    //board.size = 40.5

    //let controlbar = ReactTestUtils.renderIntoDocument(
      //<ControlBar board={board}/>
    //)

    //ReactTestUtils.Simulate.click(controlbar.refs.lastStep)
    //expect(board.state.step).toEqual(board.state.kifu.split(';').length)
  //})

})
