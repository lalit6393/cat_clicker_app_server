const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cat = new Schema({
     name:{
      type: String,
      require: true
     },
     clicks:{
       type: Number,
       require: true
     },
     image:{
       type: String,
       require: true
     },
     imgName:{
       type: String,
       require: true
     }
},{
  timestamps:true
});

module.exports = new mongoose.model("Cats", Cat);