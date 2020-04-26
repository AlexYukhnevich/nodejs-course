const bcrypt = require('bcrypt');

const getHashedEntity = async (entity, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(entity, salt);
};

const compareEntities = async (entity, hashed) =>
  await bcrypt.compare(entity, hashed);

module.exports = { getHashedEntity, compareEntities };
