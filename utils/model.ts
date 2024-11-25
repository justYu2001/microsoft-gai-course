import 'dotenv/config';
import {GoogleGenerativeAI} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
