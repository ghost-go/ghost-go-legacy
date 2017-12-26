import * as Helper from '../common/Helper';

test('A1ToSGF -- black M18 should be converted to B[mb]', () => {
  expect(Helper.A1ToSGF('M18', 'B')).toBe('B[lb]');
  expect(Helper.A1ToSGF('M18', 'W')).toBe('W[lb]');
  expect(Helper.A1ToSGF('B1', 'W')).toBe('W[bs]');
});

test('SGFToA1', () => {
  expect(Helper.A1ToSGF('M18', 'B')).toBe('B[lb]');
  expect(Helper.A1ToSGF('M18', 'W')).toBe('W[lb]');
  expect(Helper.A1ToSGF('B1', 'W')).toBe('W[bs]');
});
