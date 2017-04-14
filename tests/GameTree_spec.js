import GameTree from '../assets/javascripts/eboard/GameTree'
import { List, Map } from 'immutable'

describe('GameTree', () => {

  let tree = new GameTree()
  beforeAll(() => {
    tree.loadFromSinaSgf('(\\r\\nTE[title]\\r\\nRD[2016-04-26]\\r\\nPC[]\\r\\nTM[30]\\r\\nLT[40]\\r\\nLC[5]\\r\\nKO[6.5]\\r\\nRE[白中盘胜]\\r\\nPB[赵大贤]\\r\\nBR[九段]\\r\\nPW[张秀英]\\r\\nWR[九段]\\r\\nGK[1]\\r\\nTC[]\\r\\n\\r\\n\\r\\n;B[pd];W[dd];B[pp];W[dq];B[do];W[co];B[cn];W[cp];B[fc];W[cf];B[dm];W[fq];B[ci];W[db]\\r\\n;B[jc];W[qj];B[qi];W[pi];B[qh];W[ph];B[rj];W[qg];B[qk];W[pj];B[rl];W[rg];B[rh];W[sh]\\r\\n;B[ri];W[of];B[nd];W[qc];B[qd];W[rd];B[ol];W[pq];B[qq];W[oq];B[qp];W[lq];B[re];W[rc]\\r\\n;B[pf];W[pg];B[pc];W[se];B[op];W[np];B[mp];W[nq];B[no];W[lp];B[lo];W[ko];B[go];W[hc]\\r\\n;B[qe];W[sf];B[ng];W[pb];B[ob];W[qa];B[ec];W[dc];B[fe];W[he];B[hb];W[me];B[ne];W[ke]\\r\\n;B[ic];W[kc];B[nf];W[jd];B[kb];W[id];B[jb];W[gc];B[gb];W[eb];B[fb];W[lc];B[hp];W[mq]\\r\\n;B[mo];W[jp];B[bg];W[cg];B[bf];W[be];B[ch];W[af];B[bh];W[fg];B[gf];W[ff];B[ge];W[fi]\\r\\n;B[iq];W[jq];B[ep];W[gr];B[fj];W[gj];B[ej];W[gk];B[gi];W[ei];B[di];W[dj];B[ek];W[dk]\\r\\n;B[el];W[bj];B[eg];W[gh];B[ef];W[hi];B[eh];W[fh];B[fd];W[en];B[dn];W[de];B[ee];W[bo]\\r\\n;B[bn];W[an];B[am];W[ao];B[bl];W[ig];B[ir];W[nm];B[kn];W[jn];B[km];W[nl];B[nk];W[ll]\\r\\n;B[jm];W[om];B[pl];W[mk];B[in];W[jo];B[jk];W[nj];B[pn];W[qr];B[rr];W[pr];B[mb];W[rs]\\r\\n;B[sr];W[gm];B[hl];W[em];B[dl];W[fl];B[ji];W[hn];B[fp];W[hd];B[eq];W[er];B[gq];W[fr]\\r\\n;B[ok];W[mi];B[oj];W[oi];B[lj];W[mj];B[nh];W[pm];B[qm];W[ni];B[kr];W[jr];B[js];W[kq]\\r\\n;B[on];W[hr];B[dp];W[cq];B[ho];W[im];B[il];W[hq];B[ip];W[io];B[lf];W[kf];B[ih];W[hg]\\r\\n;B[jg];W[jf];B[kg];W[le];B[oa];W[li];B[ki];W[lm];B[ln];W[kj];B[kk];W[lk];B[ms];W[lr]\\r\\n;B[ls];W[ks];B[mm];W[sb];B[kr];W[pk];B[ql];W[ks];B[sd];W[ra];B[kr];W[rq];B[rp];W[ks]\\r\\n;B[hf];W[if];B[kr];W[kl];B[jl];W[ks];B[nn];W[is];B[ml];W[mc];B[nc];W[lb];B[la];W[og]\\r\\n;B[lh];W[mf];B[lg];W[gn];B[fo];W[bk];B[pa];W[qb];B[cl];W[oe];B[ag];W[ae];B[md];W[od]\\r\\n;B[oc];W[ld];B[ij];W[dg];B[dh];W[fa];B[ga];W[ea];B[df];W[ce])')
  })

  it ('The parent of root node should be empty', () => {
    let root = tree.getRoot(tree)
    expect(root.parent.isEmpty()).toBe(true)
  })

  it ('The content of root node should be filled', () => {
    let root = tree.getRoot(tree)
    expect(root.current.get('te')).toEqual('title')
    expect(root.current.get('rd')).toEqual('2016-04-26')
    expect(root.current.get('pc')).toEqual('')
    expect(root.current.get('tm')).toEqual('30')
    expect(root.current.get('lt')).toEqual('40')
    expect(root.current.get('lc')).toEqual('5')
    expect(root.current.get('ko')).toEqual('6.5')
    expect(root.current.get('re')).toEqual('白中盘胜')
    expect(root.current.get('pb')).toEqual('赵大贤')
    expect(root.current.get('br')).toEqual('九段')
    expect(root.current.get('pw')).toEqual('张秀英')
    expect(root.current.get('wr')).toEqual('九段')
    expect(root.current.get('gk')).toEqual('1')
    expect(root.current.get('tc')).toEqual('')
  })

})
