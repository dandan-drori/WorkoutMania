import sum from '../../src/components/Test';

test('adds 1 and 2 to be 12', () => {
  expect(sum([1, 2], [3, 4])).toBe('1,23,4');
});
