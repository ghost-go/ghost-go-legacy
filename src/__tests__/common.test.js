import * as Helper from '../common/Helper';

test('A1ToSGF -- black M18 should be converted to B[mb]', () => {
  expect(Helper.a1ToSGF('M18', 'B')).toBe('B[lb]');
  expect(Helper.a1ToSGF('M18', 'W')).toBe('W[lb]');
  expect(Helper.a1ToSGF('B1', 'W')).toBe('W[bs]');
});

test('ConvertStoneType -- should be converted to string', () => {
  expect(Helper.convertStoneTypeToString(-1)).toBe('W');
  expect(Helper.convertStoneTypeToString(1)).toBe('B');
});

test('ConvertSgfForAI', () => {
  let steps = 'B[rb];B[qc];B[qd];B[pd];B[od];B[nd];B[me];B[le];B[ke];B[jc];B[mc];W[ld];W[md];W[nc];W[oc];W[pc];W[pb];W[qb];W[lc]';
  steps = steps.split(';');
  expect(Helper.convertStepsForAI(steps)).toBe('(;FF[4]GM[1]SZ[19]GN[226]PB[Black]HA[0]PW[White]' +
    'KM[7.5]DT[2017-08-01]TM[1800]RU[Chinese]CP[Copyright ghost-go.com]' +
    'AP[ghost-go.com]PL[Black]' +
    ';B[rb];W[tt];B[qc];W[tt];B[qd];W[tt];B[pd];W[tt]' +
    ';B[od];W[tt];B[nd];W[tt];B[me];W[tt];B[le];W[tt]' +
    ';B[ke];W[tt];B[jc];W[tt];B[mc];W[ld];B[tt]' +
    ';W[md];B[tt];W[nc];B[tt];W[oc];B[tt];W[pc];B[tt]' +
    ';W[pb];B[tt];W[qb];B[tt];W[lc])');
});

test('sgfOffset', () => {
  expect(Helper.sgfOffset('B[rb]', 2, 1)).toBe('B[pb]');
  expect(Helper.sgfOffset('B[pb]', -2, 1)).toBe('B[rb]');
});

// test('SGFToA1', () => {
//   expect(Helper.A1ToSGF('M18', 'B')).toBe('B[lb]');
//   expect(Helper.A1ToSGF('M18', 'W')).toBe('W[lb]');
//   expect(Helper.A1ToSGF('B1', 'W')).toBe('W[bs]');
// });
