var cc     = require('config-multipaas'),
    Hapi   = require('hapi'),
    path   = require('path'),
    benchMark = require('./benchmark.module');
var config = cc()
var server = Hapi.createServer(config.get('IP'),  process.env.PORT || 3001, {
  cors:  true,
  files: { relativeTo: path.resolve('.','public')}
});

// Routes
server.route({
  method: 'GET',
  path: '/status', 
  handler: function (request, reply) { 
    reply( {"status": "OK"} )
  }
});

server.route({
    method: 'POST',
    path: '/v1/benchMark',
    config: {
        handler: benchMark.callBenchMark
    }
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: { directory: { path: '.' }} // relativeTo: '/static/'
});

server.start(function () {
  console.log('Server started at: ' + server.info.uri);
});
