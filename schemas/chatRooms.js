const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    user1:{
        type:String,
        required:true
    },
    user2:{
        type:String,
        required:true
    },
    roomId:{
        type:String,
        required:true
    }
})

module.exports  = mongoose.model('chatRoom',roomSchema);
