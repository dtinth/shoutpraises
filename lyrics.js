
var Q = require('q')
  , iofs = require('q-io/fs')
  , Qx = require('qx')
  , crypto = require('crypto')

exports.scan = function(dir) {
  return iofs.listTree(dir, function(path, stat) {
    return !!(/\.txt$/.test(path))
  }).then(function(list) {
    return Qx.map(list, read)
  })
}

function read(file) {
  return iofs.read(file)
    .then(function(data) {
      data = data.replace(/\r\n|\r|\n/g, '\n').replace(/^\s+|\s+$/g, '')
      // parse header lines
      var output = {}
      output.filename = file.replace(/\.txt$/, '').replace(/^.*\//, '')
      data = data.replace(/(\w+:\s+.+\n)*/, function(data) {
        data.replace(/(\w+):\s+(.+)\n/g, function(a, key, value) {
          output[key] = value
        })
        return ''
      })
      output.contents = group(data)
      return output
    })
}

function group(data) {
  data = data.replace(/^\s+|\s+$/g, '')
  return data.split('\n\n\n').map(function(section) {
    return section.split('\n\n').map(function(group) {
      var hash = crypto.createHash('md5')
      hash.update(group, 'utf-8')
      var data = group.split('\n').map(function(text) {
        var timing = []
        text = text.replace(/\/([\.,]+)$/, function(a, code) {
          var total = code.length
          var times = []
          var i
          for (i = 0; i < total; i ++) {
            if (code.charAt(i) == ',') {
              times.push(i / total)
            }
          }
          times.push(1)
          for (i = 0; i + 1 < times.length; i ++) {
            timing.push(times[i + 1] - times[i])
          }
          return ''
        })
        return { text: text, timing: timing }
      })
      return {
        id: hash.digest('hex')
      , text: data.map(function(x) { return x.text })
      , timing: data.map(function(x) { return x.timing })
      }
    })
  })
}












