
angular.module('shoutpraises', ['synchroscope'])
  .controller('MainController', function($scope, $ync) {
    var blank = $scope.blank = { song: '', text: [], id: 'blank' }
    $scope.current = { song: '', text: ['shoutpraises v' + version], id: 'splash' }
    $scope.activeClass = function(other, group) {
      return other + ($scope.current.id == group.id ? ' active' : '')
    }
    $scope.display = function(group) {
      $scope.current = group
    }
    $scope.displayBlank = function() {
      $scope.current = blank
    }
    $ync($scope, ['current'], 'shoutpraises')
  })
  .directive('spGroup', function($parse) {
    function format(text) {
      var other = ''
      text = text.replace(/^\|/, function() { other += ' align-left'; return '' })
      return '<tr><td class="line' + other + '">' + text + '</td></tr>'
    }
    return function(scope, element, attrs) {
      scope.$watch(attrs.spGroup, function(value) {
        element.html('<table class="text-group">' + value.text.map(format).join('') + '</table>')
      })
    }
  })
