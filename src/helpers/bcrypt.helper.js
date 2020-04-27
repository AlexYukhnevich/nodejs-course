const { genSalt, hash, compare } = require('bcrypt');

const getHashedEntity = async (entity, saltRounds) => {
  const salt = await genSalt(saltRounds);
  return await hash(entity, salt);
};

const compareEntities = async (entity, hashed) => await compare(entity, hashed);

module.exports = { getHashedEntity, compareEntities };
