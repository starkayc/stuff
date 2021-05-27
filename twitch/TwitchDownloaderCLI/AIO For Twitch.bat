@echo off
:: Goes Through the ID.txt and does the commands below until there's no more work to do. So if you've 10 VOD ID it'll do the commands for each of them.
for /f %%a in (ID.txt) do (
:: Display something to show the program is doing something.
echo DOING HACKERMANS STUFF ON %%a...
:: Downloads the VOD
 TwitchDownloaderCLI -m VideoDownload --id %%a  --ffmpeg-path "ffmpeg.exe" -o %%a_vod.mp4
:: Downloads the Chat
TwitchDownloaderCLI -m ChatDownload --id %%a  -o %%a.json
:: Renders the Chat
TwitchDownloaderCLI -m ChatRender -i %%a.json -h 400 -w 300 --framerate 60 --update-rate 0 --font-size 12 --outline --generate-mask --background-color "#00000000" -o %%a_chat.mp4
:: Merge Rendered Chat & Mask with VOD.
ffmpeg -i %%a_chat.mp4 -i %%a_chat_mask.mp4 -i %%a_vod.mp4 -filter_complex "[0][1]alphamerge[ia];[2][ia]overlay=main_w-overlay_w:(H-h)/2" -c:a copy -c:v libx264 -preset slow -crf 26 %%a_burned.mp4
)
pause

:: CONFIGS

:: display chat top left 
:: ffmpeg -i %%a_chat.mp4 -i %%a_chat_mask.mp4 -i %%a_vod.mp4 -filter_complex "[0][1]alphamerge[ia];[2][ia]overlay=x=10" -c:a copy -c:v libx264 -preset slow -crf 26 %%a_burned.mp4

:: display chat top right
:: ffmpeg -i %%a_chat.mp4 -i %%a_chat_mask.mp4 -i %%a_vod.mp4 -filter_complex "[0][1]alphamerge[ia];[2][ia]overlay=main_w-overlay_w" -c:a copy -c:v libx264 -preset slow -crf 26 %%a_burned.mp4

:: display chat bottom left
:: ffmpeg -i %%a_chat.mp4 -i %%a_chat_mask.mp4 -i %%a_vod.mp4 -filter_complex "[0][1]alphamerge[ia];[2][ia]overlay=x=10:main_h-overlay_h" -c:a copy -c:v libx264 -preset slow -crf 26 %%a_burned.mp4

:: display chat bottom right
:: ffmpeg -i %%a_chat.mp4 -i %%a_chat_mask.mp4 -i %%a_vod.mp4 -filter_complex "[0][1]alphamerge[ia];[2][ia]overlay=main_w-overlay_w:main_h-overlay_h" -c:a copy -c:v libx264 -preset slow -crf 26 %%a_burned.mp4

:: display chat middle left
:: ffmpeg -i %%a_chat.mp4 -i %%a_chat_mask.mp4 -i %%a_vod.mp4 -filter_complex "[0][1]alphamerge[ia];[2][ia]overlay=x=10:(H-h)/2" -c:a copy -c:v libx264 -preset slow -crf 26 %%a_burned.mp4

:: display chat middle right
:: ffmpeg -i %%a_chat.mp4 -i %%a_chat_mask.mp4 -i %%a_vod.mp4 -filter_complex "[0][1]alphamerge[ia];[2][ia]overlay=main_w-overlay_w:(H-h)/2" -c:a copy -c:v libx264 -preset slow -crf 26 %%a_burned.mp4