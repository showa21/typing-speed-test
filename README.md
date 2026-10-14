# Typing Speed Test

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) ![Built with](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

![typing-speed-test screenshot](screenshot.png)

A 30-second typing game that measures **WPM** and **accuracy** live and remembers your best score.

- Per-character feedback (correct / incorrect / cursor) rendered safely via DOM nodes
- Standard WPM formula (5 characters = 1 word); pure scoring logic in `stats.js` with unit tests
- Personal best stored in `localStorage`; keyboard-first, dark UI

## Run / test
Open `index.html`. Tests: `npm test`.
