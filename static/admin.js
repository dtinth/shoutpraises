
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
          data.forEach(function(song) {
            song.contents.forEach(function(section) {
              section.forEach(function(group) {
                group.text.forEach(function(text) {
                  all.push({ text: normalize(text), song: song })
                })
              })
            })
          })
          $scope.all = all
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
          if (item.text.indexOf(text) >= 0) {
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
  })

  



