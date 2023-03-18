const router = require('express').Router();
const {getRoomChats} = require('./../Controllers/Chat.js');


// checked by postman
router.post('/getRoomChats',getRoomChats); //checked


module.exports = router;