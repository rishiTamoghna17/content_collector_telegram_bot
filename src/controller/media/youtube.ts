import axios from "axios";

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
        "x-rapidapi-key": "4f389f0de8msh8d2ab355afa56f0p1dd943jsna2f3f4340c1b",
        "x-rapidapi-host": "yt-api.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);
    console.log(response.data);

    return { status: 200, data: response.data.adaptiveFormats };
  } catch (error) {
    console.log("error in youtube function:-", error);
    return {
      data: `error in youtube function`,
      success: false,
      statusCode: 500,
    };
  }
}
