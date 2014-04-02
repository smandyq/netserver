var net = require('net');
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
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});
