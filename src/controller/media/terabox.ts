import axios, { AxiosInstance } from "axios";

import { MY_HEADERS, COOKIE } from "../../config";

const mySession: AxiosInstance = axios.create({
  headers: MY_HEADERS,
  withCredentials: true,
});

mySession.defaults.headers.common["Cookie"] = COOKIE;

const findBetween = (string: string, start: string, end: string): string => {
  const startIndex = string.indexOf(start) + start.length;
  const endIndex = string.indexOf(end, startIndex);
  return string.substring(startIndex, endIndex);
};

export const terabox = async (url: string): Promise<any[] | null> => {
  try {
    console.log("mySession-->>", mySession);
    console.log("Cookie-->>", process.env.COOKIE);

    const response = await mySession.get(url); //"https://www.terabox.app/sharing/link?surl=nplD_s47LNg2BEINC-eR0g" ,
    //"https://1024terabox.com/s/1n-U0a8HesHa1zGFUD008ww "
    const responseData = response.data;
    console.log("response-->", responseData);

    const jsToken = findBetween(responseData, "fn%28%22", "%22%29");
    const logId = findBetween(responseData, "dp-logid=", "&");

    if (!jsToken || !logId) {
      return null;
    }

    const requestUrl = response.request.res.responseUrl;
    const surl = requestUrl.split("surl=")[1];

    const params = {
      app_id: "250528",
      web: "1",
      channel: "dubox",
      clienttype: "0",
      jsToken: jsToken,
      dplogid: logId,
      page: "1",
      num: "20",
      order: "time",
      desc: "1",
      site_referer: requestUrl,
      shorturl: surl,
      root: "1",
    };
    console.log("params-->", params);

    const response2 = await mySession.get(
      "https://www.1024tera.com/share/list",
      { params }
    );
    const responseData2 = response2.data;

    console.log("res2", responseData2);

    if (!responseData2.list) {
      return null;
    }

    if (responseData2.list[0].isdir === "1") {
      const newParams: any = {
        ...params,
        dir: responseData2.list[0].path,
        order: "asc",
        by: "name",
      };
      delete newParams.desc;
      delete newParams.root;

      const response3 = await mySession.get(
        "https://www.1024tera.com/share/list",
        { params: newParams }
      );
      const responseData3 = response3.data;

      console.log("res3", responseData3);

      if (!responseData3.list) {
        return null;
      }

      return responseData3.list;
    }

    return responseData2.list;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching download link: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};
