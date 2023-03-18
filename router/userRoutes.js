const router = require('express').Router();
const {userLogin,userRegister,getAllUsers} = require('./../Controllers/User.js');


// checked by postman
router.post('/login',userLogin); //checked
router.post('/register',userRegister); //checked
router.get('/getAllUsers',getAllUsers); //checked


module.exports = router;