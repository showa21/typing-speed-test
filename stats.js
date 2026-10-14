(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Stats = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /** Count characters in `typed` that match `target` at the same position. */
  function correctChars(target, typed) {
    let n = 0;
    for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) n++;
    return n;
  }

  /** Standard WPM: 5 characters = 1 word. */
  function wpm(correct, seconds) {
    return seconds > 0 ? Math.round((correct / 5) / (seconds / 60)) : 0;
  }

  function accuracy(correct, typedLength) {
    return typedLength === 0 ? 100 : Math.round((correct / typedLength) * 100);
  }

  return { correctChars, wpm, accuracy };
});
