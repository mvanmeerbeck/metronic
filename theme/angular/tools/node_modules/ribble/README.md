# Ribble

> Material ripple effect with ease (Vanilla js, works also as a Vue.js directive)

## Install

This package is available on npm.

Using npm:

`npm install --save ribble`

Using yarn:

`yarn add ribble`

For browser, import `node_modules/ribble/dist/ribble.js` in your html.

## Example

[Live Demo](#) (TODO)

With Vue.js as a directive:

```html
  <button v-ribble>A button</button>
  <button v-ribble="{bgColor:'blue'}">A button</button>
  <button v-ribble.mouseenter>A button</button>
```

In Vanilla js, after the DOMContentLoaded event:

```javascript
Ribble.attachEvent(el, options, triggers)
// triggers can be an event or an array of events (ex: mouseenter, doubleclick, etc). It will default to ['mousedown', 'touchstart']

// NOTE: for the mousedown event, it will only listen for the left button.
```

### Options

The default options are:

```js
{
  duration: 400, // transition duration
  zIndex: "9999",
  bgColor: "currentColor",
  maxOpacity: "0.4", // the opacity will change from '0.2' to maxOpacity and then to '0'
  easing: "cubic-bezier(0.4, 0, 0.2, 1)" // css easing
}
```
