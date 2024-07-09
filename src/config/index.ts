import dotenv from "dotenv";
dotenv.config();
const appRoot = process.cwd();
export const FILE_SAVE_PATH = `${appRoot}/src`
export const x_rapidapi_key = process.env["x-rapidapi-key"];
