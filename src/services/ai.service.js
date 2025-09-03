//01.16.48

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({apiKey:"AIzaSyCJiE7i2ns5RKDQ68_-h09dY4-PcvxdPmo"});

async function generateCaption(base64ImageFile){


  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config:{
      systemInstruction:`You are an expert in generating caption for images.
      You generate single line caption for image.
      Your caption can be short an concise.
      You use hashtags and emojis in captions.`
    }
  });
 return (response.text);
}

module.exports = generateCaption

