const { sign, verify } = require('jsonwebtoken');

const getPayload = ({ login, id }) => ({ login, userId: id });
const checkToken = (token, secretKey) => verify(token, secretKey);
const signToken = (entity, payload, secretKey) =>
  sign(payload(entity), secretKey);

const parseToken = str => {
  const splitStringAuth = str.split(' ');
  return splitStringAuth.length > 1 ? splitStringAuth[1] : null;
};

module.exports = { parseToken, getPayload, checkToken, signToken };
