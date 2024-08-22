import dotenv from "dotenv";
dotenv.config();
const appRoot = process.cwd();
export const FILE_SAVE_PATH = `${appRoot}/src`;
export const X_RAPID_API_KEY_TERABOX = process.env["x-rapidapi-key-terabox"];
export const X_RAPID_API_KEY_YOUTUBE = process.env["x-rapidapi-key-youtube"];
export const IG_USERNAME = process.env.IG_USERNAME || "";
export const IG_PASSWORD = process.env.IG_PASSWORD || "";
export const BOT_TOKEN = process.env.BOT_TOKEN || "";

export const MY_HEADERS={
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'csrfToken=chMljgg9pLuQczl3pLyPMcfv; browserid=Gvi3NUpFutA9vp70SDD6w04XiwVm4kh6vsmtv-NvQk0RN3r5GZ-iZoWgBTo=; lang=en; TSID=fsElVQwggVO0iarCtbi4eK2bOXmEHcOB; __bid_n=190b5e1604fdf709a14207; _ga=GA1.1.550002563.1721038366; ndus=Y40khCMteHui8ylqBGkjtMh0Sl_bZ2ldXJVG9Is-; ndut_fmt=27959D71C253E51D4C301F2D113FA65537BE9B1174AC22FCBC9A579417B2C58C; ab_sr=1.0.1_YTljMmZkYmRlYjc5ZjI5ZmYwYzdhMzkwODk5MDYxNTQyOTFmMmY2ZjM1YTgyZWIwM2NlZGM2MDQ4ODA5NDVkYmEzNjNiMWNlMTJjNDViZTE1YjcyNmM3MWVlOWJjOWJlZjU2MTU2Y2U4ODk1NjcwOWI3MzMyNjFiOTY3Y2FiMjk0MWUwOWIwOGU5M2RmMGFkMjRhZDllNTUyODMwZThjZA==; _ga_06ZNKL8C2E=GS1.1.1721038366.1.1.1721040572.36.0.0',
    'Referer': 'https://www.1024tera.com/sharing/link?surl=n-U0a8HesHa1zGFUD008ww',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
}
export const COOKIE="csrfToken=iGh-Yo7ewy85F3hdhN_hnLIR; browserid=Gvi3NUpFutA9vp70SDD6w04XiwVm4kh6vsmtv-NvQk0RN3r5GZ-iZoWgBTo=; lang=en; TSID=fsElVQwggVO0iarCtbi4eK2bOXmEHcOB; __bid_n=190b5e1604fdf709a14207; _ga=GA1.1.550002563.1721038366; ndus=Y40khCMteHui8ylqBGkjtMh0Sl_bZ2ldXJVG9Is-; ndut_fmt=068AD0CBEF30F69813ABE5D5D740E7AEC588C234F472677EF77BA3269DDDFDCB; ab_sr=1.0.1_MzNiODFhOGU3MDcxNmJhNWY5MDcxMjIwODVkNmRjNjlhYWY2NmI4ZTQxYWFhMTk4NjFhNDk0YzliNWFjYTlmMTdiOWE4OTExZjU1ODUyNTNlMzA1MTQ1ZjY1MzBhN2Q1MDNkM2VkYmY4Y2Y3NTdiYjU5NmJiMzAwNjgyYTQ4Y2QzZWYwMmI1NDFiMjRmZjhkM2QyZWVjNzdiMzU3ZTQ4Nw==; _ga_06ZNKL8C2E=GS1.1.1721043365.2.1.1721044301.40.0.0"

