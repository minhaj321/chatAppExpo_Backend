const userSchema = require('./../schemas/user.js');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
require('dotenv').config();
const CryptoJS = require('crypto-js')
require('dotenv').config();

// login user
exports.userLogin =async (req,res)=>{
try{

    var {email,password} = req.body;
    {
    if(!email){
        res.json({
            message:'Failed',
            doc:'Please send email'
        })
    }else{
        if(!password){
            res.json({
            message:'Failed',
            doc:'No password'
            })
        }else{
            var token = jwt.sign({ email }, process.env.PRIVATE_KEY,{expiresIn:60*60*24});
            const user = await userSchema.findOne({ email });
            if (user==null || user==undefined) {
                res.json({
            message:'Failed',
            doc: "User not found"
                })
            }
            else{
                var ciphertext = CryptoJS.AES.decrypt(user.password,process.env.PRIVATE_KEY).toString(CryptoJS.enc.Utf8);
                if(ciphertext==password){
                        res.json({
                            message:'Success',
                            doc:user,
                            token
                        })    
            }
            else{
                res.json({
                    message:'Failed',
                    doc:'Incorrect password'
                })        
        }    
            }
        }
    }
}

}catch(err){
    res.json({
        message:'Failed',
        doc:err.message
    })        
}
}

// register by admin
exports.userRegister = async(req,res)=>{
    
    var {username,password,email} = req.body;

    var checkEmail = await userSchema.findOne({email})
    if(checkEmail){
        res.json({
            message:'Failed',
            doc:'This email address is already in use'
        })
    }else{
        var ciphertext = CryptoJS.AES.encrypt(password,process.env.PRIVATE_KEY).toString();
        password = ciphertext
            try{
                var createUser = new userSchema({username,password,email})
                var response = await createUser.save()

                if(response){
                    res.json({
                        doc:response,
                        message:'Success'
                    })
                }
                else{
                    res.json({
                        message:'Failed',
                        doc:'There is an issue with email sending'
                    })    
                }
            }catch(err){
                res.json({
                    message:'Failed',
                    doc:err.message
                })  
            }
    }
}

// get user 
exports.getAllUsers = async(req,res)=>{
    try{

        var getUsers = await userSchema.find();

        getUsers = getUsers.map((user)=>{
            return {email:user.email,
                username:user.username}
        })

        if(getUsers){
            res.json({
                message:'Success',
                doc:{
                    users:getUsers,
                }
            })    
        }else{
            res.json({
                message:'Failed',
                doc:'Error in fetching users'
            })    
        }
    }catch(err){
        res.json({
            message:'Failed',
            doc:'Error in fetching users'
        })
    }
}
