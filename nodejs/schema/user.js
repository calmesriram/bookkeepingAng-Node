var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema({
 
  Email:{
    type:String,
    unique:true
  } 
  
});
  module.exports = mongoose.model('User', userSchema);