const roomSchema = require('./../schemas/chatRooms');
const chatSchema = require('./../schemas/chats');
const { v4: uuidv4 } = require('uuid');

exports.getRoomChats = async(req,res)=>{

    var {user1,user2} = req.body;
    var temp;
    if(user2>user1){
        temp = user2;
        user2 = user1;
        user1 = temp;
    }
    console.log('user 1 ',user1);
    console.log('user 2 ',user2);
    var roomData = await roomSchema.findOne({user1,user2});
    
    if(roomData){
        var chats = await chatSchema.find({roomId:roomData.roomId});
        res.json({
            message:'Success',
            doc:{
                roomData:roomData,
                chats
            }
        })
    }else{
        var newUid = uuidv4();
        var createRoomId = new roomSchema({user1,user2,roomId:newUid})
        var roomData = await createRoomId.save();
        if(roomData){
            res.json({
                message:'Success',
                doc:{
                    roomData:roomData,
                    chats:[]
                }
            })
    
        }
    }
}