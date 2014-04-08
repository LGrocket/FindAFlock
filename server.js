// Some of this is from WaterRush
// Some of this is from the frontpage of http://nodejs.org/

var http = require('http');
var util = require('util');
var connect = require('connect');

var config = {
	server: {
		ip: '0.0.0.0',
		port: 8080,
	}
};

var server = connect.createServer(connect.static(__dirname));


/**
 * Listening
 */

server.listen(config.server.port, config.server.ip);

console.log('Server listening on ' + config.server.ip + ':' + config.server.port + '...');
