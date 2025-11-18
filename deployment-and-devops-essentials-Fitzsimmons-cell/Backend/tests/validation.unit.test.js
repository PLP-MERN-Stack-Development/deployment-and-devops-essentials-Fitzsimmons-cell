const { isValidTitle } = require('../helpers/validation');

test('isValidTitle works', () => {
  expect(isValidTitle('OK')).toBe(false);
  expect(isValidTitle('Bug A')).toBe(true);
});
