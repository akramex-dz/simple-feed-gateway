const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function findUserByUsername(username) {
  return db.user.findUnique({
    where: {
      username,
    },
  });
}

function findUserByEmailOrUsername(email, username) {
  return db.user.findFirst({
    where: {
      OR: [
        {
          email,
        },
        {
          username,
        },
      ],
    },
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function searchUsersByEmailOrUsername(search) {
  return db.user.findMany({
    where: {
      OR: [
        {
          email: {
            contains: search,
          },
        },
        {
          username: {
            contains: search,
          },
        },
      ],
    },
    orderBy: {
      username: 'asc',
    },
    select: {
      username: true,
      email: true,
      id: true,
    },
  });
}

module.exports = {
  findUserByEmail,
  findUserById,
  findUserByUsername,
  findUserByEmailOrUsername,
  createUserByEmailAndPassword,
  searchUsersByEmailOrUsername,
};
