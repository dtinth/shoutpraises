
angular.module('shoutpraises.display', ['shoutpraises', 'ngAnimate'])
  .controller('TextController', function($scope) {

    $scope.$watch('$parent.current', function(value) {
      $scope.show = [ value ]
    })

  })
