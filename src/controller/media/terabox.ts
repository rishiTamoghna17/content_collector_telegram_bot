import axios from "axios";
import { X_RAPID_API_KEY_TERABOX } from "../../config";

export async function terabox(link: string) {
  try {
    const options = {
      method: "POST",
      url: "https://terabox-downloader-direct-download-link-generator.p.rapidapi.com/fetch",
      headers: {
        "x-rapidapi-key": X_RAPID_API_KEY_TERABOX,
        "x-rapidapi-host":
          "terabox-downloader-direct-download-link-generator.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        url: link, //"https://www.terabox.app/sharing/link?surl=nplD_s47LNg2BEINC-eR0g" , "https://1024terabox.com/s/1n-U0a8HesHa1zGFUD008ww "
      },
    };

    const response = await axios.request(options);
    console.log("terabox res -->>", response.data);
    const results: any[] = [];
    if (response.data && response.data.length > 0) {
      response.data.forEach((item: any) => {
        const resp = {
          filename: item.server_filename,
          dlink: item.dlink,
          fastdlink: item.fastdlink,
        };
        results.push(resp);
      });
      return { status: 200, data: results };
    }
  } catch (error: any) {
    console.error(error);
    return {
      data: `error in terabox function: ${error.message}`,
      success: false,
      statusCode: 500,
    };
  }
}
