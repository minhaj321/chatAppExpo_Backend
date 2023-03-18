const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    msg:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    roomId:{
        type:String,
        required:true
    }
})

module.exports  = mongoose.model('chats',chatSchema);
