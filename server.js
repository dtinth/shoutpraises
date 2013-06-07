
var connect = require('connect')
  , http = require('http')
  , lyrics = require('./lyrics')
  , version = require('./package').version

var app = connect.createServer()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)

require('synchroscope').listen(io.of('/synchroscope'))

app.use(connect.static(__dirname + '/static'))

var dir = process.argv[2] || (__dirname + '/lyrics')

app.use('/version', function(req, res, next) {
  res.setHeader('Content-Type', 'text/javascript')
  res.end('version = ' + JSON.stringify(version) + ';')
})
app.use('/lyrics', function(req, res, next) {
  lyrics.scan(dir)
    .then(function(data) {
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(data))
      res.end()
    })
    .fail(next)
})

var currentData = {}

console.log('\033[0;38;5;242m\n---\n\033[1;38;5;10mshoutpraises \033[0;38;5;10mv' + version + '\n\n\
\033[38;5;247mLet every living creature\n\
praise the Lord.\n\
    \033[1;38;5;250mShout praises \033[0;38;5;247mto the Lord!\n\
             \033[38;5;242m--Psalm 150:6 (CEV)\n---\033[0m\n')

server.listen(1506, function() {
  var address = server.address()
  console.log('listening to ' + address.address + ':' + address.port)
})


