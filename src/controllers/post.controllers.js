const postModel = require('../models/post.model')
const generateCaption = require('../services/ai.service')

async function createPostController(req,res) {
    const file = req.file
    console.log("File: ",file)

    const base64Image = new Buffer.from(file.buffer).toString('base64')

    const caption = await generateCaption(base64Image)

    // console.log(caption)

    res.json({
        caption
    })

    // console.log(base64Image)
}

module.exports = {
    createPostController
}