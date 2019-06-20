var now_playing_ep = "http://ec2-34-219-151-22.us-west-2.compute.amazonaws.com:8082/nowplaying"

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
       	else {
       		callback("Nothing")
       	}
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function update(json_playing_data) {
	var playing_str = json_playing_data['track'] + " - " + json_playing_data['artist']
	var ele = document.getElementById('spotify-data')
	if (json_playing_data['track'] != undefined && ele.innerHTML != playing_str) {
		ele.innerHTML = playing_str
	}
}

setInterval(function() {
  httpGetAsync(now_playing_ep, update);
}, 5000);
