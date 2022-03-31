const palindrome = require('../utils/for_testing.js').palindrome;

test('"racecar" backwards is "racecar"', () => {
  expect(palindrome('racecar')).toBe('racecar');
});