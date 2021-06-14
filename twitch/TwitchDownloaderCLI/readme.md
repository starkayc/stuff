# Batch files for doing things automatically. 
### Purpose of each batch file
* AIO For Twitch: Downloads vod and chat, then renders chat into a mp4 and then gets burned into the vod file.
* Download VOD: Downloads the vod.
* Download Chat: Downloads the chat.
* Render Chat: Renders chat into mp4 format and is transparent.
* Download Chat and Render: Downloads the chat and renders it into mp4 format and is transparent.
* Download SUB VODS: Downloads sub-only vod. Enter oauth in cookies.txt. https://youtu.be/1MBsUoFGuls


### How to Use
Add the VOD ID to the ID.txt file and run whichever batch file suits your needs.

![VODID](https://i.starkayc.moe/t3eCET.png)


### Where to get batch links for VODS
I personally use [Twitch ANZ](https://www.twitchanz.com/vods) to get batch links of vods. Afterwards, you can open the downloaded file in Notepad++ and remove the url part leaving the VOD ID only.

![Picture](https://i.starkayc.moe/PlFB9L.png)

### Outcome
![Picture](https://i.starkayc.moe/wqygPO.png)
![Picture](https://i.starkayc.moe/1hdBnR.png)
![Picture](https://i.starkayc.moe/4NpXwk.png)
![Picture](https://i.starkayc.moe/EN5Ywg.jpg)

### Stuff Used
- [TwitchDownloader](https://github.com/lay295/TwitchDownloader)
- [FFmpeg](https://ffmpeg.org/download.html) | You can also download using `TwitchDownloaderCLI --download-ffmpeg`
