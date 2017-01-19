const express = require('express');
const mongoose = require('../db');

const app = express();

const { Schema } = mongoose;

const schema = new Schema({
  dish: Object,
  state: { type: String, default: 'created' },
  user_id: 'ObjectId'
});

const Order = mongoose.model('Order', schema);
const User = mongoose.model('User');

app.get('/:id', ({ params }, response) => {
  Order.find({ user_id: params.id }).exec((error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json(result);
    }
  });
});

app.post('/', ({ body, socket }, response) => {
  Order.create(body, (error, result) => {
    if (error) {
      console.error('Неудалось установить данные в коллекцию. Ошибка:', error);
    }
    else {
      response.json(result);

      const price = body.dish.price;

      User.update({ _id: body.user_id }, { $inc: { balance: -price } }, (error, result) => {
        if (error) {
          console.error('Неудалось имзенить данные в коллекции. Ошибка:', error);
        }
      });

      socket.sockets.emit('new-order', result);
    }
  });
});

module.exports = app;