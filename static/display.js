
var socket = io.connect()

socket.on('data', function(data) {
  if (data) {
    $('#text').html(data.text ? data.text.join('<br>') : '')
    $('#song').html(data.song ? data.song : '')
  }

})

