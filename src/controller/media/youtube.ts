import { exec } from "child-process-promise";
import fs from "fs";
import { FILE_SAVE_PATH } from "../../config";
import { deleteFile, isFileExist } from "../../utils";
import path from "path";
import { erroHandler } from "../../config/errorHander";

export async function youtube(link: string) {
  try {
    const downloadDir = path.join(FILE_SAVE_PATH, "download");
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const timestamp = new Date().getTime();
    const videoFilePath = path.join(downloadDir, `${timestamp}_video.mp4`);
    const audioFilePath = path.join(downloadDir, `${timestamp}_audio.m4a`);
    const outputFilePath = path.join(downloadDir, `${timestamp}.mp4`);

    // Command to download video and audio separately
    const videoCommand = `yt-dlp -f bestvideo[ext=mp4][vcodec*=avc] -o "${videoFilePath}" "${link}"`;
    const audioCommand = `yt-dlp -f bestaudio[ext=m4a] -o "${audioFilePath}" "${link}"`;

    console.log("videoCommand:-", videoCommand);

    // Execute the commands
    await exec(videoCommand);
    console.log("audioCommand:-", audioCommand);
    await exec(audioCommand);
    console.log("wowwwwwwwwwwwwww");
    // Merge the video and audio using ffmpeg
    const ffmpegCommand = `ffmpeg -i "${videoFilePath}" -i "${audioFilePath}" -c copy "${outputFilePath}"`;
    console.log("ffmpegCommand:-", ffmpegCommand);

    await exec(ffmpegCommand);

    await deleteFile(videoFilePath);
    await deleteFile(audioFilePath);

    if (isFileExist(outputFilePath, 10000)) {
      return {
        data: outputFilePath,
        success: true,
        statusCode: 200,
      };
    } else {
      return {
        data: `Merged file does not exist`,
        success: false,
        statusCode: 400,
      };
    }
  } catch (error: any) {
    if (error.stderr) {
      console.log(`stderr: ${error.stderr}`);
    }
    console.log("error in youtube function:-", error);
    erroHandler({ error, success: false, statusCode: 500 });
    return {
      data: `your file is too large to download!!!`,
      success: false,
      statusCode: 500,
    };
  }
}
