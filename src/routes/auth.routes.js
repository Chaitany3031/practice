const express = require('express')
const { registerController, loginController } = require('../controllers/auth.controllers.js')


const router = express.Router()

router.post('/register',registerController)

// router.get('/user',async (req,res)=>{
//     const token = req.cookies.token

//     if(!token){
//         return res.status(401).json({
//             message:"unauthorized token not found"
//         })
//     }

//     try {
//         const decoded = jwt.verify(token,process.env.JWT_SECRET)

//         const user = await userModel.findOne({
//             _id:decoded.id
//         })

//         return res.status(200).json({
//             message:"user fetched successfully",
//             user
//         })

//     } catch (error) {
//           res.status(401).json({
//             message:"unauthorized"
//         })
//     }

// })

router.post('/login',loginController)

// router.post('/',(req,res)=>{
    
// })


// router.get('/logout',(req,res)=>{
//     res.clearCookie("token")

//     res.status(200).json({
//         message:"user logged out"
//     })
// })

module.exports = router