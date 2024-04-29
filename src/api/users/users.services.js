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

async function followUser(followerId, userId) {
  const followerWhere = { id: followerId };
  const userWhere = { id: userId };

  const follower = await db.user.update({
    where: followerWhere,
    data: {
      following: {
        connect: [userWhere],
      },
    },
    select: {
      username: true,
      email: true,
      id: true,
    },
  });

  const followed = await db.user.update({
    where: userWhere,
    data: {
      followers: {
        connect: [followerWhere],
      },
    },
    select: {
      username: true,
      email: true,
      id: true,
    },
  });

  return { follower, followed };
}

async function unfollowUser(unfollowerId, userId) {
  const followerWhere = { id: unfollowerId };
  const userWhere = { id: userId };

  const unfollower = await db.user.update({
    where: followerWhere,
    data: {
      following: {
        disconnect: [userWhere],
      },
    },
    select: {
      username: true,
      email: true,
      id: true,
    },
  });

  const unfollowed = await db.user.update({
    where: userWhere,
    data: {
      followers: {
        disconnect: [followerWhere],
      },
    },
    select: {
      username: true,
      email: true,
      id: true,
    },
  });

  return { unfollower, unfollowed };
}

async function listFollowers(userId) {
  return db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      followers: {
        select: {
          username: true,
          email: true,
          id: true,
        },
        orderBy: {
          username: 'asc',
        },
      },
    },
  });
}

async function listFollowings(userId) {
  return db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      following: {
        select: {
          username: true,
          email: true,
          id: true,
        },
        orderBy: {
          username: 'asc',
        },
      },
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
  followUser,
  unfollowUser,
  listFollowers,
  listFollowings,
};
