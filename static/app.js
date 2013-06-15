
angular.module('shoutpraises', ['synchroscope'])
  .controller('MainController', function($scope, $ync) {
    var blank = $scope.blank = { song: '', text: [], id: 'blank' }
    $scope.current = $scope.splash = { song: '', text: [], id: 'splash', splash: true }
    $scope.active = function(id) {
      return $scope.current.id == id
    }
    $scope.display = function(group) {
      $scope.current = group
    }
    $scope.custom = function() {
      $scope.current = { song: '', id: 'custom', text: [prompt('?')] }
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
