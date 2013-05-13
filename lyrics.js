
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
      return {
        id: hash.digest('hex')
      , text: group.split('\n')
      }
    })
  })
}
