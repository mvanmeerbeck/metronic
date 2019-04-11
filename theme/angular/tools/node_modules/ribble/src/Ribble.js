let supportsPassive = false;
let opts = Object.defineProperty({}, "passive", {
  get: function() {
    supportsPassive = true;
  }
});
try {
  window.addEventListener("test", null, opts);
} catch (e) {}


export default {
  name: 'ribble',

  bind(el, binding) {
    let eventTriggers = ['mousedown', 'touchstart']
    let definedTriggers = Object.keys(binding.modifiers)
    eventTriggers = definedTriggers.length ? definedTriggers : eventTriggers
    attachEvent(el, binding.value, eventTriggers)
  },
  attachEvent
}

function attachEvent(el, options, triggers = ['mousedown', 'touchstart']) {
  triggers = Array.isArray(triggers) ? triggers : [triggers]
  for (let evType of triggers) {
    el.addEventListener(evType, event => {
      switch (evType) {
        case 'mousedown':
          if (event.button === 0) startRipple(event, el, options)
          break
        default:
          startRipple(event, el, options)
      }
    }, supportsPassive ? opts : false)
  }
}

function startRipple(
  event,
  el,
  {
    duration = 400,
    zIndex = '9999',
    bgColor = 'currentColor',
    maxOpacity = '0.4',
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)'
  } = {}
) {
  // This code is an adaptation of PygmySlowLoris' code: https://github.com/PygmySlowLoris/vue-ripple-directive/blob/master/src/ripple.js
  let target = el
  let eventType = event.type
  // Get border to avoid offsetting on ripple container position
  let targetBorder = +window.getComputedStyle(target).borderWidth.replace('px', '')

  // Get necessary variables
  let rect = target.getBoundingClientRect(),
    left = rect.left,
    top = rect.top,
    width = target.offsetWidth,
    height = target.offsetHeight,
    dx = event.clientX - left,
    dy = event.clientY - top,
    maxX = Math.max(dx, width - dx),
    maxY = Math.max(dy, height - dy),
    style = window.getComputedStyle(target),
    radius = Math.sqrt(maxX * maxX + maxY * maxY),
    border = targetBorder > 0 ? targetBorder : 0

  // Create the ripple and its container
  let ripple = document.createElement('div'),
    rippleContainer = document.createElement('div')
  rippleContainer.className = 'ripple-container'
  ripple.className = 'ripple'

  //Styles for ripple
  ripple.style.marginTop = '0px'
  ripple.style.marginLeft = '0px'
  ripple.style.width = '1px'
  ripple.style.height = '1px'
  ripple.style.opacity = '0.2'
  ripple.style.transform = 'scale(0)'
  ripple.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`
  ripple.style.borderRadius = '50%'
  ripple.style.pointerEvents = 'none'
  ripple.style.position = 'relative'
  ripple.style.zIndex = zIndex
  ripple.style.backgroundColor = bgColor

  //Styles for rippleContainer
  rippleContainer.style.position = 'absolute'
  rippleContainer.style.left = 0 - border + 'px'
  rippleContainer.style.top = 0 - border + 'px'
  rippleContainer.style.height = '0'
  rippleContainer.style.width = '0'
  rippleContainer.style.pointerEvents = 'none'
  rippleContainer.style.overflow = 'hidden'

  // Store target position to change it after
  let storedTargetPosition =
    target.style.position.length > 0
      ? target.style.position
      : window.getComputedStyle(target).position
  // Change target position to relative to guarantee ripples correct positioning
  if (storedTargetPosition !== 'relative') {
    target.style.position = 'relative'
  }

  rippleContainer.appendChild(ripple)
  target.appendChild(rippleContainer)

  ripple.style.marginLeft = dx + 'px'
  ripple.style.marginTop = dy + 'px'

  rippleContainer.style.width = width + 'px'
  rippleContainer.style.height = height + 'px'
  rippleContainer.style.borderTopLeftRadius = style.borderTopLeftRadius
  rippleContainer.style.borderTopRightRadius = style.borderTopRightRadius
  rippleContainer.style.borderBottomLeftRadius = style.borderBottomLeftRadius
  rippleContainer.style.borderBottomRightRadius = style.borderBottomRightRadius

  ripple.style.width = radius * 2 + 'px'
  ripple.style.height = radius * 2 + 'px'
  ripple.style.marginLeft = dx - radius + 'px'
  ripple.style.marginTop = dy - radius + 'px'

  setTimeout(function() {
    ripple.style.opacity = maxOpacity
    ripple.style.transform = 'scale(1)'
  }, 0)

  let release = function(ev) {
    el.removeEventListener('mouseup', release, false)
    el.removeEventListener('touchend', release, false)

    ripple.style.opacity = '0'

    // Timeout set to get a smooth removal of the ripple
    setTimeout(function() {
      rippleContainer.parentNode.removeChild(rippleContainer)
    }, duration)

    // After removing event set position to target to it's original one
    // Timeout it's needed to avoid jerky effect of ripple jumping out parent target
    setTimeout(function() {
      let clearPosition = true
      for (let i = 0; i < target.childNodes.length; i++) {
        if (target.childNodes[i].className === 'ripple-container') {
          clearPosition = false
        }
      }

      if (clearPosition) {
        if (storedTargetPosition !== 'static') {
          target.style.position = storedTargetPosition
        } else {
          target.style.position = ''
        }
      }
    }, duration)
  }

  let releaseEvent =
    eventType === 'mousedown'
      ? 'mouseup'
      : eventType === 'touchstart' ? 'touchend' : false
  if (releaseEvent) {
    el.addEventListener(releaseEvent, release, supportsPassive ? opts : false)
  } else {
    release()
  }
}
