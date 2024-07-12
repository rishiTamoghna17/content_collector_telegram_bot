import { exec } from "child-process-promise";
import fs from "fs";
import { FILE_SAVE_PATH } from "../../config";
import { deleteFile, isFileExist } from "../../utils";
import path from "path";

export async function youtube(link: string) {
  try {
    const downloadDir = path.join(FILE_SAVE_PATH, "download");
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const videoFilePath = path.join(
      downloadDir,
      `${new Date().getTime()}_video.mp4`
    );
    const audioFilePath = path.join(
      downloadDir,
      `${new Date().getTime()}_audio.m4a`
    );
    const outputFilePath = path.join(
      downloadDir,
      `${new Date().getTime()}.mp4`
    );

    // Command to download video and audio separately
    const videoCommand = `yt-dlp -f bestvideo[ext=mp4][vcodec*=avc] -o "${videoFilePath}" ${link}`;
    const audioCommand = `yt-dlp -f bestaudio[ext=m4a] -o "${audioFilePath}" ${link}`;

    console.log("videoCommand:-", videoCommand);
    console.log("audioCommand:-", audioCommand);

    // Execute the commands
    await exec(videoCommand);
    await exec(audioCommand);

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
    if (error as { stderr: string }) {
      console.error(`stderr: ${error.stderr}`);
    }
    console.log("error in youtube function:-", error);
    return {
      data: `error in youtube function: ${error.message}`,
      success: false,
      statusCode: 500,
    };
  }
}
