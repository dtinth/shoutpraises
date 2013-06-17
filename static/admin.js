

function TimeUnit(size, group, line, id, song) {
  this.size = size
  this.group = group
  this.line = line
  this.id = id
  this.next = null
  this.song = song
}

angular.module('shoutpraises.admin', ['shoutpraises', 'touch'])
  .controller('SongController', function($scope) {
    $scope.all = []
    $scope.load = function() {
      $.ajax('/lyrics').then(function(data) {
        $scope.$apply(function() {
          $scope.lyrics = data
        })
      })
      $.ajax('/library').then(function(data) {
        $scope.$apply(function() {
          $scope.library = data
          var all = []
          var timingList = []
          var nodes = []
          var id = 0
          data.forEach(function(song) {
            var last = null
            song.contents.forEach(function(section) {
              section.forEach(function(group) {
                id += 1
                group.text.forEach(function(text) {
                  all.push({ text: text, normalized: normalize(text), song: song })
                })
                group.timing.forEach(function(timing, line) {
                  timing.forEach(function(timeUnit, index) {
                    var current = new TimeUnit(timeUnit, group, line, id, song)
                    if (last) last.next = current
                    last = current
                    if (index === 0) timingList.push(current)
                  })
                })
              })
            })
          })
          $scope.all = all
          $scope.timing = timingList
          $scope.libraryVersion++
        })
      })
    }
    function normalize(what) {
      return (''+what).toLowerCase()
    }
    $scope.displayLyric = function(group, song) {
      group.song = song.name
      $scope.$parent.display(group)
    }
    $scope.extra = []
    $scope.selectSong = function(song) {
      if (song == null) {
        $scope.extra = []
        return
      }
      $scope.extra = [song]
      $scope.searchImport = ''
    }
    $scope.library = []
    $scope.libraryVersion = 0
    $scope.matchLibrary = []
    $scope.searchImport = ''
    $scope.$watch('[searchImport, libraryVersion]', function() {
      var text = normalize($scope.searchImport)
      $scope.library.forEach(function(song) {
        song.matching = []
      })
      if (text === '') {
        $scope.matchLibrary = $scope.library
      } else {
        var matching = []
        $scope.all.forEach(function(item) {
          if (item.normalized.indexOf(text) >= 0) {
            matching.push(item.song)
            if (item.song.matching.length < 3) item.song.matching.push(item.text)
          }
        })
        $scope.matchLibrary = $scope.library.filter(function(c) {
          return normalize(c.name).indexOf(text) >= 0 || matching.indexOf(c) >= 0
        })
      }
    }, true)
    $scope.load()


    $scope.resetTap = function() {
      $scope.taps = []
      $scope.tapResult = []
    }
    $scope.resetTap()
    $scope.tap = function() {
      $scope.taps.push(new Date().getTime())
      var taps = $scope.taps
      var items = $scope.timing
      if (taps.length < 4) {
        $scope.tapResult = []
        return
      }
      var mine = []
      var first = taps[0], last = taps[taps.length - 1]
      var result = []
      taps.forEach(function(time) {
        mine.push(((time - first) / (last - first)) * 7)
      })
      items.forEach(function(item) {
        var timing = [0], time = 0, last = item, i
        for (i = 1; i < mine.length; i ++) {
          if (item == null) return
          timing.push(time += item.size)
          last = item
          item = item.next
        }
        for (i = 1; i < timing.length; i ++) {
          timing[i] /= time
          timing[i] *= 7
        }
        var score = 0
        for (i = 0; i < timing.length; i ++) {
          score += Math.pow(timing[i] - mine[i], 2)
        }
        result.push({ score: score, item: item || last })
      })
      var stat = {}
      result.forEach(function(current) {
        if (!stat[current.item.id] || current.score < stat[current.item.id].score) {
          stat[current.item.id] = current
        }
      })
      result = Object.keys(stat).map(function(key) { return stat[key] })
      result.sort(function(a, b) { return a.score - b.score })
      $scope.tapResult = []
      result.slice(0, 6).forEach(function(x) {
        var score = Math.round(100 * Math.exp(-x.score))
        var opacity = Math.max(Math.min(score / 90, 1), 0.25)
        $scope.tapResult.push({
          text: x.item.group.text[x.item.line]
        , group: x.item.group
        , song: x.item.song
        , score: score
        , opacity: opacity
        })
      })
    }

  })

  



