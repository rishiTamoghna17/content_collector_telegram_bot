import axios from "axios";
import { parse } from "node-html-parser";
import cheerio from "cheerio";
// const instagramPostLink = "https://www.instagram.com/p/CD5um-vHA33/";

export async function instagram(url: string) {
  try {
    url = url + "embed" + "/captioned";

    const response = await axios.get(url);
    const responseData = response.data;

    if (!responseData) {
      throw new Error("No data received from Instagram.");
    }

    const root = parse(responseData);
console.log("root:-", root);
    let link = "";
    if (responseData.search("video_url") !== -1) {
      link = getVideoLinkFromHtml(responseData);
    } else {
      const imgElement = root.querySelector("img.EmbeddedMediaImage");
      if (imgElement) {
        link = imgElement.getAttribute("src") as any;
      } else {
        throw new Error("Image element not found in HTML.");
      }
    }

    while (link.search("&amp;") !== -1) {
      link = link.replace("&amp;", "&");
    }

    const caption = await getCaptionFromHtml(responseData);

    return { link, caption };
  } catch (e:any) {
    console.log("instagram error:-", e);
    return {
      data: `error in instagram function: ${e.message}`,
      success: false,
      statusCode: 500,
    };
  }
}

async function getCaptionFromHtml(html: any) {
  const root = parse(html);

  let caption = root.querySelector(".Caption")?.text;
  if (caption == undefined) caption = "No caption";

  caption = caption.replace("view all comments", "");
  return caption;
}

function getVideoLinkFromHtml(html: any) {
  let crop =
    '{"' +
    html.substring(html.search("video_url"), html.search("video_url") + 1000);

  crop = crop.substring(0, crop.search(",")) + "}";

  return JSON.parse(crop).video_url;
}


