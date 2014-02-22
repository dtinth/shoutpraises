
angular.module('shoutpraises', ['synchroscope'])
  .controller('MainController', function($scope, $ync) {

    var blank = $scope.blank = { song: '', text: [], id: 'blank', blank: true }
    $scope.black = false
    $scope.version = window.version
    $scope.current = $scope.splash = { song: '', text: [], id: 'splash', splash: true }

    $scope.toggleBlack = function() {
      $scope.black = !$scope.black
    }
    $scope.active = function(id) {
      return $scope.current.id == id
    }
    $scope.display = function(group) {
      $scope.current = group
    }
    $scope.custom = function() {
      $scope.current = { song: '', id: 'custom', text: [prompt('?')] }
    }
    $ync($scope, ['current', 'black'], 'shoutpraises')
  })
  .directive('spGroup', function($parse) {
    function format(item) {
      var other = ''
      var text = item.text
      text = text.replace(/^\|/, function() { other += ' align-left'; return '' })
      return '<td colspan="' + item.cols + '" class="line' + other + '">' + text + '</td>'
    }
    return function(scope, element, attrs) {
      scope.$watch(attrs.spGroup, function(value) {
        var trs
        var cols = 1
        var rows = value.text.map(function(x) {
          return x.split('&&').map(function(text) {
            return { text: text, cols: 1 }
          })
        })
        rows.forEach(function(row) {
          if (row.length > cols) cols = row.length
        })
        rows.forEach(function(row) {
          if (row.length == 1) {
            row[0].cols = cols
          }
        })
        var trs = rows.map(function(row) {
          return '<tr>' + row.map(format).join('') + '</tr>'
        }).join('')
        element.html('<table class="text-group">' + trs + '</table>')
      })
    }
  })
