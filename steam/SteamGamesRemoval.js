// Use SteamLicensePraser.js to get the packageid before using this script. Once you do paste it on line 6.
(function()
{
  var deletePackages =
  [
    76757, // Paste the output of the other script here (cleaned up as necessary)
    76556, // These ids are just samples, REPLACE THEM with your own list.
  ];

  var i = 0,
      done = 0,
	  package = 0,
	  total = deletePackages.length,
	  modal = ShowBlockingWaitDialog( 'Removing...',
	    	'Please wait until all requests finish.' );
  var ExecuteRequest = function()
  {
	  package = deletePackages[i];
	  jQuery.ajax(
		{
			url: 'https://store.steampowered.com/account/removelicense',
			type: 'POST',
			data:
			{
				sessionid : g_sessionID,
				packageid : package
			}
		}
	  ).always(function()
		{
			done++;
			modal.Dismiss();
			if( done >= total )
			{
				ShowAlertDialog( 'Complete!', done + ' packages have been removed.' );
			}
			else
			{
				modal = ShowBlockingWaitDialog( 'Removing Packages...',
					'Removed ' + done + '/' + total + '. Do not navigate away or refresh this page.' );
				i++;
				ExecuteRequest();
			}
		});
  };
  setTimeout( ExecuteRequest, 1500 );
}());
