import fs, { createReadStream, readFileSync } from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { erroHandler } from "../config/errorHander";
export const deleteFile = async (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      await fsPromises.unlink(filePath);
      return true;
    } else {
      console.log(`You are trying to delete non-exist file "${filePath}"`);
      return false;
    }
  } catch (error) {
    console.log("error in delete file", error);
    return false;
  }
};

export const isFileExist = (
  filePath: string,
  compareSize: number = 0
): boolean | number => {
  try {
    if (!fs.existsSync(filePath)) {
      return false; // File does not exist
    }

    const stats = fs.statSync(filePath);
    const fileSizeInBytes: number = stats && stats.size ? stats.size : 0;

    return (compareSize || compareSize === 0) && fileSizeInBytes > compareSize;
  } catch (e) {
    erroHandler({ error: e, success: false, statusCode: 500 });
    return false;
  }
};

export const sendFile = async (item: any, ctx: any) => {
  try {
    // await ctx.replyWithDocument(item);
    console.log("item-->>", item);
    if (
      item &&
      item.platform === "youtube" &&
      item.data &&
      item.success === true
    ) {
      const videoPath = path.resolve(item.data);
      const videoStream = createReadStream(videoPath);
      await ctx.replyWithVideo({ source: videoStream });
      await deleteFile(item.data);
    } else if (item && item.platform === "instagram") {
      await ctx.replyWithMarkdown(
        `👉 [Download Here](${item.data.data.url_list})`
      );
    } else if (item && item.platform === "facebook") {
      const { url, sd, hd, title, thumbnail } = item.data.data;
      const facebookMessage = `
**${title}**

![Thumbnail](${thumbnail})

[Watch on Facebook](${url})

**Download:**
- [SD Video](${sd})
- [HD Video](${hd})
      `;
      await ctx.replyWithMarkdown(facebookMessage);
    } else if (item && item.platform === "terabox") {
      console.log("terabox----data->>", item.data.data);
      const teraboxData = item.data.data;
      let teraboxMessage = "**TeraBox Files:**\n\n";
      teraboxData.forEach((file: any) => {
        teraboxMessage += `
**File Name:** ${file.server_filename}
**Size:** ${Math.round(file.size / 1024 / 1024)} MB

![Thumbnail](${file.thumbs.icon})

[Download Link](${file.dlink})

---
       `;
      });
      await ctx.replyWithMarkdown(teraboxMessage);
    } else await ctx.reply(JSON.stringify(item, null, 2));
  } catch (e: any) {
    console.log("error from sendFile: ", e);
    ctx.replyWithMarkdown(
      `⚠️ ${e.message}\n\n👉 Try manually downloading from [here](${item})\n\n👉 *Maybe This File Is Too Large Or Cannot Accessible From ${item.platform}*`
    );
  }
};
