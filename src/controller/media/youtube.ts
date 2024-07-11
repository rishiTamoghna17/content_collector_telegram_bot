import axios from "axios";
import { X_RAPID_API_KEY_YOUTUBE } from "../../config";

export async function youtube(link: string) {
  try {
    let regex =
      /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    const match = regex.exec(link);
    if (!match) {
      console.log("No match found");
      return { status: 400, data: "Invalid video link format" };
    }

    const videoId = match[3];
    console.log("videoId-->>", videoId);
    const options = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/dl",
      params: { id: videoId },
      headers: {
        "x-rapidapi-key": X_RAPID_API_KEY_YOUTUBE,
        "x-rapidapi-host": "yt-api.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);
    console.log("yt response------->>>", response.data.adaptiveFormats);

    return { status: 200, data: response.data.adaptiveFormats.slice(0, 6) };
  } catch (error) {
    console.log("error in youtube function:-", error);
    return {
      data: `error in youtube function`,
      success: false,
      statusCode: 500,
    };
  }
}
