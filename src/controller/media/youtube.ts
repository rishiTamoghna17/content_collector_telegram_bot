import { exec } from "child-process-promise";
import fs from "fs";
import { FILE_SAVE_PATH } from "../../config";
import { deleteFile, isFileExist } from "../../utils";
import path from "path";

const bufferSize = () => {
  return 1024 * 1024 * 200; // Default 200KB and we set to 1024 * 1024(1MB) * 200 = total 20MB
};

export async function youtube(link: string) {
  try {
    const downloadDir = path.join(FILE_SAVE_PATH, "download");
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const filePath = path.join(downloadDir, `${new Date().getTime()}.mp4`);

    const consoleLogFile = `${filePath}.console`;
    const command = `LC_ALL=en_US.UTF-8 yt-dlp --no-mtime --concurrent-fragments 2 --no-cache-dir -f "bestvideo[ext=mp4][vcodec*=avc]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "${filePath}" ${link} >> "${consoleLogFile}"`;
    console.log("command:-", command);

    await exec(command);

    const ytdlpConsoleLogs = fs.readFileSync(consoleLogFile, "utf8");
    console.log({ ytdlpConsoleLogs });

    await deleteFile(consoleLogFile);

    if (isFileExist(filePath, 1000)) {
      return {
        data: `File successfully downloaded!`,
        success: true,
        statusCode: 200,
      };
    } else {
      return { data: `File not exist`, success: false, statusCode: 400 };
    }
  } catch (error) {
    if (error as { stderr: string }) {
      console.error(`stderr: ${error as { stderr: string }}`);
    }
    console.log("error in youtube function:-", error);
    return {
      data: `error in youtube function`,
      success: false,
      statusCode: 500,
    };
  }
}
