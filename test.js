'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { correctChars, wpm, accuracy } = require('./stats');

test('correctChars compares by position', () => {
  assert.strictEqual(correctChars('hello', 'hxllo'), 4);
  assert.strictEqual(correctChars('hi', 'hi there'), 2);
});
test('wpm uses 5 chars per word', () => {
  assert.strictEqual(wpm(250, 60), 50);
  assert.strictEqual(wpm(50, 0), 0);
});
test('accuracy', () => {
  assert.strictEqual(accuracy(0, 0), 100);
  assert.strictEqual(accuracy(9, 10), 90);
});
