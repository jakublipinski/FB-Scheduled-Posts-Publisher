var FB = require('fb');
FB.setAccessToken(process.env.FB_TOKEN);

var GoogleSpreadsheet = require("google-spreadsheet");
var sheet = new GoogleSpreadsheet(process.env.SPREADSHEET_KEY);

sheet.getRows( 1, function(err, row_data){

	for(i=0;i<row_data.length;i++){
		if(row_data[i].publish == "Y"){
			time = new Date(2015,row_data[i].month-1,row_data[i].day,10,0).getTime() / 1000;
	    	console.log(row_data[i].post);
	    	console.log(row_data[i].url);

			FB.api('Waclaw.Lipinski/feed', 'post', { 
				message: row_data[i].post, 
				link: row_data[i].url,
				published: "false", 
				scheduled_publish_time: time }, function (res) {
					if(!res || res.error) {
					    console.log(!res ? 'error occurred' : res.error);
					    return;
		  			}
		  			console.log('Post Id: ' + res.id);
	  			}
	    	)
		}
	}
});