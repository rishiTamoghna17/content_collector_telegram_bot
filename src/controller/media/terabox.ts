import axios from "axios";
import { x_rapidapi_key } from "../../config";

export async function terabox(link: string) {
  try {
    const options = {
      method: "POST",
      url: "https://terabox-downloader-direct-download-link-generator.p.rapidapi.com/fetch",
      headers: {
        "x-rapidapi-key": x_rapidapi_key,
        "x-rapidapi-host":
          "terabox-downloader-direct-download-link-generator.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        url: link,//"https://www.terabox.app/sharing/link?surl=nplD_s47LNg2BEINC-eR0g" , "https://1024terabox.com/s/1n-U0a8HesHa1zGFUD008ww "
      },
    };

    const response = await axios.request(options);
    // console.log(response.data);
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
      return results;
    }
  } catch (error) {
    console.error(error);
    return {
      data: `error in terabox function`,
      success: false,
      statusCode: 500,
    };
  }
}
