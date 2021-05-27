@echo off
:: Goes Through the ID.txt and does the commands below until there's no more work to do. So if you've 10 VOD ID it'll do the commands for each of them.
for /f %%a in (ID.txt) do ( 
:: Display a message mentioning the VODI ID it's downloading and rendering.
echo Downloading and Rendering %%a currently...
:: Downloads Chat and outputs vod id as json file
TwitchDownloaderCLI -m ChatDownload --id %%a -o %%a.json
:: Renders the Chat with mask and transparent background to be able to burn into VOD later on. So, there will be two files one called ID_chat.mp4 & ID_chat_mask.
TwitchDownloaderCLI -m ChatRender -i %%a.json -h 400 -w 300 --framerate 60 --update-rate 0 --font-size 12 --outline --generate-mask --background-color "#00000000" -o %%a_chat.mp4
)
pause