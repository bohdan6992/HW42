const { Schema, model, SchemaTypes }  = require('mongoose');

const user = new Schema({
  // _id: SchemaTypes.ObjectId,
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  number: Number,
  email: String,
  info: String,
});

user.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

module.exports = model('User', user)