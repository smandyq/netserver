var net = require('net');
var port = process.env.PORT || 8123;
var path = require('path');

var tls = require('tls');
var fs = require('fs');

//what a terrible idea!
tls.maxConnections = Infinity;


var options = {
key: fs.readFileSync(path.resolve(__dirname, 'server-key.pem')),
cert: fs.readFileSync(path.resolve(__dirname, 'server-cert.pem'))};//,
//requestCert: true};

//var server = net.createServer(function(c) 

var server = tls.createServer(options, function(cleartextStream)
{ //'connection' listener
  console.log('server connected',
      cleartextStream.authorized ? 'authorized' : 'unauthorized');
  cleartextStream.write("welcome!\n");
  cleartextStream.setEncoding('utf8');
  cleartextStream.pipe(cleartextStream);
  cleartextStream.on("data", function(d)
  {
    console.log(d.toString());
  });
});
server.listen(port, function() { //'listening' listener
  console.log('server bound to port: ' + server.address().port);
});

/*

var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.listen(port, function() { //'listening' listener
  console.log('server bound to ' + server.address().port);
});
*/
