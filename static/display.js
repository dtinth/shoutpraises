
angular.module('shoutpraises.display', ['shoutpraises'])
  .controller('TextController', function($scope) {

    $scope.$watch('$parent.current', function(value) {
      $scope.show = [ value ]
    })

  })
