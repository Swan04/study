var http = require("http");
var url = require("url");

function start(route,handle) {
	http.createServer(function (request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
	　  response.writeHead(200, {'Content-Type': 'text/plain'});

		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+ postDataChunk + "'.");
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}).listen(8888, "127.0.0.1");
	console.log("Server has started.");
}
exports.start = start;
