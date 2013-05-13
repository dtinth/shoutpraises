
var socket = io.connect()
  , dataMap = {}

document.write('<div id="main" class="main">')
lyrics.forEach(function(song) {
  document.write('<div class="song"><h2>' + song.name + '</h2>')
  song.contents.forEach(function(section) {
    document.write('<div class="section">')
    section.forEach(function(group) {
      group.song = song.name
      dataMap[group.id] = group
      document.write('<div class="group" data-group="' + group.id + '" onclick="">')
      group.text.forEach(function(line) {
        document.write('<div class="line">' + line + '</div>')
      })
      document.write('</div>')
    })
    document.write('</div>')
  })
  document.write('</div>')
})
document.write('</div>')

socket.on('data', function(data) {
  $('[data-group]').removeClass('active')
  if (data && data.id) {
    $('[data-group="' + data.id + '"]').addClass('active')
  }
})

dataMap['blank'] = { id: 'blank' }

$(document).on('touchstart click', '[data-group]', function() {
  var data = dataMap[$(this).data('group')]
  socket.emit('set data', data)
  return false
})
