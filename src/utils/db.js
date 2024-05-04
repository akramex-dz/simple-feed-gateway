const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

db.$connect()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => {
    console.error(error);
    throw new Error('Failed to connect to database');
  });

module.exports = { db };
