const mongoose = require('mongoose');

const URL = 'mongodb://heroku_5545vsbh:19ershov91@ds117189.mlab.com:17189/heroku_5545vsbh';

mongoose.connect(URL);

mongoose.connection.on('error', (error) => {
  console.error('DB connection error:', error);
});

mongoose.connection.once('open', () => {
  console.log('DB connection opened');
});

module.exports = mongoose;