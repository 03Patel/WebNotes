const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',require:true},
    title:{type:String,require:true},
    content:{type:String, require: true},
    tags:[String],
},{timestamps:true});

module.exports = mongoose.model('Note', NoteSchema)