const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ message: "image file is required (form-data key: image)" });
    }

    console.log("File: ", file);

    const base64Image = Buffer.from(file.buffer).toString("base64");

    const caption = await generateCaption(base64Image);

    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    const post = await postModel.create({
      caption: caption,
      image: result.url,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Post created !",
      post,
    });
  } catch (error) {
    console.error("createPostController error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
}

module.exports = {
  createPostController,
};
