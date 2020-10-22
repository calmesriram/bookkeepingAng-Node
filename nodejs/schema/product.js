var mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;
const bookSchema = Schema({
bookid: {
  'type': String,
  'default': shortid.generate
},
title:String,
author:String,
summary:String,
isbn:String,
bookname:String,
duedate:String,
});
  module.exports = mongoose.model('Book', bookSchema);

 