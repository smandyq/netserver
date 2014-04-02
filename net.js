var net = require('net');
var port = process.env.PORT || 8123;

console.log("port = " + port);

/*
var tls = require('tls');
var fs = require('fs');

var options = {
key: fs.readFileSync('server-key.pem'),
cert: fs.readFileSync('server-cert.pem')};//,
//requestCert: true};

//var server = net.createServer(function(c) 

var server = tls.createServer(options, function(cleartextStream)
{ //'connection' listener
  console.log('server connected',
      cleartextStream.authorized ? 'authorized' : 'unauthorized');
  cleartextStream.write("welcome!\n");
  cleartextStream.setEncoding('utf8');
  cleartextStream.pipe(cleartextStream);
});
server.listen(process.env.port || 80, function() { //'listening' listener
  console.log('server bound to port: '.concat(server.address().port.toString()));
});

*/

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
  console.log('server bound');
});
