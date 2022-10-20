[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

#### Wordle Clone is an implementation of the world-known game Wordle in Lit.

## Quickstart

To get started:

```bash
npm install
npm run start
# requires node 10 & npm 6 or higher
```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory

## Details

The objective of the game is to discover the 5-letter secret word. When you input a word, there can be 3 posibilities for each letter. Either it's green, so that means the letter is correct and it is in the correct position. If it's yellow that means the word contains the letter, but it isn't in the right position. Or else its grey so that means the word doens't contain the letter at all.

You have 6 tries to discover the secret word.

_(In the original game, the word is randomly set each day, this app is just a demonstration of the functionality of the game made in Lit)_
