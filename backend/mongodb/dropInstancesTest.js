const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/chatPlusTest', { useNewUrlParser: true, useUnifiedTopology: true })
  .then( async () => {
    // Access the underlying MongoDB connection object
    const db = mongoose.connection.db;
  
    // Run MongoDB command to drop the database
    await db.dropDatabase();
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });