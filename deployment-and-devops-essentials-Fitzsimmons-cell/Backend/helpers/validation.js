function isValidTitle(title) {
  if (!title) return false;
  return title.trim().length >= 3;
}
module.exports = { isValidTitle };
