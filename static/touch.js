
var touch = angular.module('touch', [])

touch.directive('touch', function() {
  return function(scope, element, attrs) {
    element.on('touchstart', function(e) {
      element.addClass('touching')
      return false
    })
    element.on('touchend', function(e) {
      element.removeClass('touching')
      element.click()
      return false
    })
    var clicking = false
    element.on('mousedown', function(e) {
      clicking = true
      element.addClass('touching')
    })
    $(document).on('mouseup', function(e) {
      if (!clicking) return
      clicking = false
      element.removeClass('touching')
    })
  }
})
