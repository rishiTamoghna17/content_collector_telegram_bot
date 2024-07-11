import dotenv from "dotenv";
dotenv.config();
const appRoot = process.cwd();
export const FILE_SAVE_PATH = `${appRoot}/src`;
export const X_RAPID_API_KEY_TERABOX = process.env["x-rapidapi-key-terabox"];
export const X_RAPID_API_KEY_YOUTUBE = process.env["x-rapidapi-key-youtube"];
export const IG_USERNAME = process.env.IG_USERNAME || "";
export const IG_PASSWORD = process.env.IG_PASSWORD || "";
