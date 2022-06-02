// Head to https://store.steampowered.com/account/licenses/ and open the console on your browser and enter the code below.
//CONTROL+SHIFT+I OR F12 for chrome & CONTROL+SHIFT+J for firefox.

(function()
{
  var links = [];
  $J('div.free_license_remove_link').find('a').each(function(i, el){
	  var match = el.href.match( /javascript:RemoveFreeLicense\( ([0-9]+), '/ );
	  if( match !== null ) { links.push(el); }
  });
  for (var i = 0, l = links.length; i < l; i++)
  {
	var rgx = /\(.(\d+),.*\'(.+)\'/
	var matches = links[i].href.match(rgx);
    console.log(matches[1] + ', // ' + atob(matches[2]));
  }}());
// Afterwards, copy the games printed into SteamGamesRemoval.js on line 6.
