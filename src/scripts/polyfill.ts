import 'whatwg-fetch';
import 'es6-promise';

/**
 * forEach の polyfill
 * IE11で NodeList に forEach を使うとエラーになるバグ修正
 */
if ('NodeList' in window && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/**
 * Element.prototype.matches
 */
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector;
}

/**
 * Element.prototype.closest
 */
if (!Element.prototype.closest) {
  Element.prototype.closest = function (s: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let el: any = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
