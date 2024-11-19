import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { Configuration, OpenAIApi } from "openai";


dotenv.config();

// Setup open ai api key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export const generateImage = async (req, res, next) => {
  console.log("generateImage function triggered"); // Log when function is hit
  try {
      const response = await openai.createImage({
          prompt: "A futuristic cityscape at sunset",
          n: 1,
          size: "1024x1024",
          response_format: "b64_json",
      });

      
      
      const generatedImage = response.data.data[0].b64_json;
      res.status(200).json({ photo: generatedImage });
  } catch (error) {
      console.error("Error in generateImage:", error.message || error);
      next(error); // Pass error to middleware
  }
};
