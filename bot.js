var HTTPS = require('https');
//var cool = require('cool-ascii-faces');
var members = {};
var workouts = [
	'3 x 21 min',
	'2x6k (4 x 3k)',
	'5 x 11min',
	'Blasters Distance',
	'4 x 16 min',
	'5 x 2k',
	'4 x 10 min/5m r',
	'10k (4x2.5k)',
	'2 x 30 min / 5min rest',
	'Blasters Time',
	'3 x 20min',
	'10,9,8,7'
];

var cool = function (name) {
	var current;
	if(members.name) {
	} else {
		members.name = workouts;
	}
		
	current = (members.name).shift();
	(members.name).push(current);
	return current;
};


var botID = '6ce321f96e7292e64d409a5bc3';

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /give me a workout$/;
	console.log(request);

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(request.name);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
				console.log(res);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
