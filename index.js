const express = require('express');
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");
const chatSchema = require('./schemas/chats');
require('dotenv').config();
const UserRouter = require('./router/userRoutes')
const ChatRouter = require('./router/chatRoutes')
const httpServer = require('http').createServer(app);
const connectDB = require('./DB/conn');

app.use(express.json());
app.use(cors());

connectDB();
app.use('/user',UserRouter)
app.use('/chat',ChatRouter)

const io = new Server(httpServer,{
    cors:{
        origin:"*",
    }
});


io.on("connection", (socket) => {

    socket.on('joinroom',(data)=>{
    socket.join(data.roomId)
});

socket.on('sendMsg',async(data)=>{
    console.log(data)
    var newChat = new chatSchema(data);
    var result = await newChat.save();
    
    if(result){
        var chats = await chatSchema.find({roomId:data.roomId})
        io.to(data.roomId).emit("sendMessages",chats);
    }

})

});


httpServer.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})