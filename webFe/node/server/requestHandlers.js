var exec = require("child_process").exec;
var querystring = require("querystring");

function start(response,postData) {
	var body = '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" content="text/html; '+
				'charset=UTF-8" />'+
				'</head>'+
				'<body>'+
				'<form action="/upload" method="post">'+
				'<textarea name="text" rows="20" cols="60"></textarea>'+
				'<input type="submit" value="Submit text" />'+
				'</form>'+
				'</body>'+
				'</html>';

		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();
}
function upload(response,postData) {
	var content =  "Hello Upload " + querystring.parse(postData).text; 
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write(content);
	response.end();	
}
exports.start = start;
exports.upload = upload;