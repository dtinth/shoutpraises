
var touch = angular.module('touch', [])

touch.directive('touch', function() {
  return function(scope, element, attrs) {
    var fireon = attrs.touch == 'down' ? 'start' : 'end'
    element.on('touchstart', function(e) {
      element.addClass('touching')
      if (fireon == 'start') element.click()
      return false
    })
    element.on('touchend', function(e) {
      element.removeClass('touching')
      if (fireon == 'end') element.click()
      return false
    })
    var clicking = false
    element.on('mousedown', function(e) {
      clicking = true
      element.addClass('touching')
      if (fireon == 'start') element.click()
      return false
    })
    $(document).on('mouseup', function(e) {
      if (!clicking) return false
      clicking = false
      element.removeClass('touching')
      if (fireon == 'end') element.click()
      return false
    })
  }
})

