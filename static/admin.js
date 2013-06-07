
angular.module('shoutpraises.admin', ['shoutpraises', 'touch'])
  .controller('SongController', function($scope) {
    $scope.load = function() {
      $.ajax('/lyrics').then(function(lyrics) {
        $scope.$apply(function() {
          $scope.lyrics = lyrics
        })
      })
    }
    $scope.load()
    $scope.display = function(group, song) {
      group.song = song.name
      $scope.$parent.display(group)
    }
  })
