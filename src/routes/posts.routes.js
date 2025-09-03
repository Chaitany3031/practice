const express = require('express')
const authMiddleware = require('../middleware/auth.middleware.js')
const postController = require('../controllers/post.controllers.js')
const router = express.Router()
const multer = require('multer')

const upload = multer({storage:multer.memoryStorage()})

router.post('/',authMiddleware,upload.single('image')) 

module.exports = router