import fs from "fs";
import fsPromises from "fs/promises";
export const deleteFile = async (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      await fsPromises.unlink(filePath);
      return true;
    } else {
      console.error(`You are trying to delete non-exist file "${filePath}"`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting file "${filePath}":`, { error });
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
    return false;
  }
};

export const sendFile = async (item: any, ctx: any) => {
  if (item) {
    try {
      // await ctx.replyWithDocument(item);
      await ctx.reply(JSON.stringify(item, null, 2)); // await ctx.replyWithPhoto(item);
    } catch (e: any) {
      ctx.replyWithMarkdown(
        `⚠️ ${e.message}\n\n👉 Try manually downloading from [here](${item})\n\n👉 *Maybe This File Is Too Large Or Cannot Accessible From Terabox*`
      );
    }
  }
};
