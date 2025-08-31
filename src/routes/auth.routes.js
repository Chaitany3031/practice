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

router.get('/user',async (req,res)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"unauthorized token not found"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findOne({
            _id:decoded.id
        })

        return res.status(200).json({
            message:"user fetched successfully",
            user
        })

    } catch (error) {
          res.status(401).json({
            message:"unauthorized"
        })
    }

})

router.post('/login',async (req,res)=>{
    const {username,password} = req.body

    const user = await userModel.findOne({username})

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const isValidPassword = user.password === password 

    if(!isValidPassword){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"user login successful"
    })
})

router.get('/logout',(req,res)=>{
    res.clearCookie("token")

    res.status(200).json({
        message:"user logged out"
    })
})

module.exports = router