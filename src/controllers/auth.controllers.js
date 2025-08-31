const userModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req,res){
    const {username,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        username
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
        message:"username already in use"
        })
    }
    
    const user = await userModel.create({
        username,password : await bcrypt.hash(password,10)
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)//this is to check whether the token created is only created by the server or ! 
    
    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user
    })

}


async function loginController(req,res) {
    const {username,password} = req.body
    const user = await userModel.findOne({username})

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const isValidPassword = await bcrypt.compare(password,user.password) 

    if(!isValidPassword){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"user login successful",
        user:{
            username:user.username,
            id:user._id
        }
    })
}


module.exports = {
    registerController,
    loginController
}