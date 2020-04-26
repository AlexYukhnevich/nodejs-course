const parseToken = str => {
  const splitStringAuth = str.split(' ');
  return splitStringAuth.length > 1 ? splitStringAuth[1] : null;
};

module.exports = parseToken;
