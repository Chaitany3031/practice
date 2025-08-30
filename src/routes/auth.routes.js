const express = require('express')
const userModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register',async (req,res)=>{
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
        username,password
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)//this is to check whether the token created is only created by the server or ! 
    
    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user
    })

})

module.exports = router