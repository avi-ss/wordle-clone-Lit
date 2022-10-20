import { LitElement, html, css } from "lit";

import "./components/wordle-cell";
import "./components/wordle-keyboard";

export class WordleApp extends LitElement {
  static get properties() {
    return {
      secretWord: {
        type: String,
      },
      isCorrectWord: {
        type: Boolean,
      },
      correctWordText: {
        type: String,
      },
    };
  }

  constructor() {
    super();

    // this should be randomized
    this.secretWord = "tomas";

    this.isCorrectWord = false;
    this.correctWordText = "";
  }

  render() {
    return html`
      <div class="game">
        <div class="grid">
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
          <wordle-cell></wordle-cell>
        </div>
        <h1>${this.correctWordText}</h1>
        <wordle-keyboard @on-key-pressed=${this.handleKey}></wordle-keyboard>
      </div>
    `;
  }

  handleKey({ detail: key }) {
    // Comprobamos que no se ha ganado todavía
    if (this.isCorrectWord) return;

    const wordleTiles = this.shadowRoot.querySelectorAll("wordle-cell");
    const activeTiles = [];
    let lastTile = undefined;

    wordleTiles.forEach((tile) => {
      if (tile.state === "active") {
        activeTiles.push(tile);
      }

      if (tile.letter === "" && lastTile === undefined) {
        lastTile = tile;
      }
    });

    switch (key) {
      case "backspace": {
        // check if empty array
        if (activeTiles.length === 0) return;

        const lastActiveTile = activeTiles[activeTiles.length - 1];
        lastActiveTile.letter = "";
        lastActiveTile.state = "";
        break;
      }
      case "enter": {
        if (activeTiles.length === 5) {
          this.checkWord(activeTiles);
        }
        break;
      }
      default: {
        if (lastTile === undefined) return;
        if (activeTiles.length === 5) return;
        lastTile.letter = key;
        lastTile.state = "active";
        break;
      }
    }
  }

  checkWord(activeTiles) {
    const letters = activeTiles.map((tile) => tile.letter);
    const secretLetters = [...this.secretWord];

    letters.forEach((letter, index) => {
      if (letter === this.secretWord[index]) {
        secretLetters[index] = "";
      }
    });

    const keyboard = this.shadowRoot.querySelector("wordle-keyboard");

    activeTiles.forEach((tile, index) => {
      if (tile.letter === this.secretWord[index]) {
        setTimeout(() => {
          tile.flipTile("correct");
          keyboard.setKeyState(tile.letter, "correct");
        }, (index * 500) / 2);
      } else if (secretLetters.indexOf(tile.letter) !== -1) {
        setTimeout(() => {
          tile.flipTile("wrong-location");
          keyboard.setKeyState(tile.letter, "wrong-location");
        }, (index * 500) / 2);
      } else {
        setTimeout(() => {
          tile.flipTile("wrong");
          keyboard.setKeyState(tile.letter, "wrong");
        }, (index * 500) / 2);
      }
    });

    // Comprobamos que todos los tiles son correctos
    setTimeout(() => {
      this.isCorrectWord = activeTiles
        .map((tile) => tile.state === "correct")
        .every((tile) => tile);

      if (!this.isCorrectWord) return;

      this.setDancingTiles(activeTiles);
      this.correctWordText = "You won!";
    }, (6 * 500) / 2);
  }

  setDancingTiles(tiles) {
    tiles.forEach((tile, index) => {
      setTimeout(() => tile.setWinAnimation(), (index * 500) / 5);
    });
  }

  static get styles() {
    return css`
      .game {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .grid {
        display: grid;
        justify-content: center;
        align-content: center;
        flex-grow: 1;
        grid-template-columns: repeat(5, 4em);
        grid-template-rows: repeat(6, 4em);
        gap: 0.5em;
        margin: 2em;
      }

      h1 {
        color: white;
        font-weight: bolder;
        font-size: 3em;
        margin: 0;
      }
    `;
  }
}

customElements.define('wordle-app', WordleApp);
