
angular.module('shoutpraises', ['synchroscope'])
  .controller('MainController', function($scope, $ync) {
    var blank = $scope.blank = { id: 'blank' }
    $scope.current = blank
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
