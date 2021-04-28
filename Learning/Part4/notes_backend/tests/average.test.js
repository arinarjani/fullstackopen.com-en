const average = require('../utils/for_testing').average;

test('avg of 1,2,3,4,5', () => {
  expect(average([1,2,3,4,5])).toBe(15/5);
});

test('empty array is 0', () => {
  expect(average([])).toBe(0);
});