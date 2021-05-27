@echo off
:: Goes Through the ID.txt and does the commands below until there's no more work to do. So if you've 10 VOD ID it'll do the commands for each of them.
for /f %%a in (ID.txt) do (
:: Displays message for user end.
echo Downloading Chat for VOD ID %%a currently...
:: Downloads the Chat
TwitchDownloaderCLI -m ChatDownload --id %%a  -o %%a.json
)
pause