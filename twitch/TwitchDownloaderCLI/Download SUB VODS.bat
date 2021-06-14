@echo off
set /p cookies=< %cookies.txt
:: Goes Through the ID.txt and does the commands below until there's no more work to do. So if you've 10 VOD ID it'll do the commands for each of them.
for /f %%a in (ID.txt) do (
:: Displays message for user end.
echo Downloading the VOD %%a currently...
:: Downloads the VOD
TwitchDownloaderCLI -m VideoDownload --id %%a  --ffmpeg-path "ffmpeg.exe" -o %%a_vod.mp4 --oauth %cookies%
)
pause