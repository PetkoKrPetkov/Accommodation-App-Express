const mongoose = require('mongoose');

const connectionString = process.env.DATABASE_CONNECTION_STRING || 'mongodb://localhost:27017/accomodationApp';

module.exports = async (app) => {
  try {
    await mongoose.connect(connectionString, {});
    console.log('Database connected!');
  } catch (err) {
    console.error('Error initializing database!');
    console.error(err.message);
    process.exit(1);
  }
};
