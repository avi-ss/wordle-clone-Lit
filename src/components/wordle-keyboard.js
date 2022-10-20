import { html, css, LitElement } from "lit";

export class WordleKeyboard extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  onKeyPressed(event) {
    const key = event.currentTarget.id.toLowerCase();
    this.dispatchEvent(new CustomEvent("on-key-pressed", { detail: key }));
  }

  setKeyState(letter, state) {
    const key = this.shadowRoot.getElementById(letter.toUpperCase());
    key.classList.add(state);
  }

  render() {
    return html`
      <div class="keyboard">
        <button @click=${this.onKeyPressed} class="key" id="Q">Q</button>
        <button @click=${this.onKeyPressed} class="key" id="W">W</button>
        <button @click=${this.onKeyPressed} class="key" id="E">E</button>
        <button @click=${this.onKeyPressed} class="key" id="R">R</button>
        <button @click=${this.onKeyPressed} class="key" id="T">T</button>
        <button @click=${this.onKeyPressed} class="key" id="Y">Y</button>
        <button @click=${this.onKeyPressed} class="key" id="U">U</button>
        <button @click=${this.onKeyPressed} class="key" id="I">I</button>
        <button @click=${this.onKeyPressed} class="key" id="O">O</button>
        <button @click=${this.onKeyPressed} class="key" id="P">P</button>
        <div class="space"></div>
        <button @click=${this.onKeyPressed} class="key" id="A">A</button>
        <button @click=${this.onKeyPressed} class="key" id="S">S</button>
        <button @click=${this.onKeyPressed} class="key" id="D">D</button>
        <button @click=${this.onKeyPressed} class="key" id="F">F</button>
        <button @click=${this.onKeyPressed} class="key" id="G">G</button>
        <button @click=${this.onKeyPressed} class="key" id="H">H</button>
        <button @click=${this.onKeyPressed} class="key" id="J">J</button>
        <button @click=${this.onKeyPressed} class="key" id="K">K</button>
        <button @click=${this.onKeyPressed} class="key" id="L">L</button>
        <div class="space"></div>
        <button @click=${this.onKeyPressed} id="enter" class="key large">
          ENTER
        </button>
        <button @click=${this.onKeyPressed} class="key" id="Z">Z</button>
        <button @click=${this.onKeyPressed} class="key" id="X">X</button>
        <button @click=${this.onKeyPressed} class="key" id="C">C</button>
        <button @click=${this.onKeyPressed} class="key" id="V">V</button>
        <button @click=${this.onKeyPressed} class="key" id="B">B</button>
        <button @click=${this.onKeyPressed} class="key" id="N">N</button>
        <button @click=${this.onKeyPressed} class="key" id="M">M</button>
        <button @click=${this.onKeyPressed} id="backspace" class="key large">
          ←
        </button>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 1em;
      }
      .keyboard {
        display: grid;
        grid-template-columns: repeat(20, minmax(auto, 1.25em));
        grid-auto-rows: 3em;
        gap: 0.25em;
      }
      .key {
        font-size: 16px;
        grid-column: span 2;
        border: none;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: grey;
        color: white;
        cursor: pointer;
        user-select: none;
        border-radius: 5px;
      }
      .key.large {
        grid-column: span 3;
      }
      .key:hover {
        background-color: lightgray;
        color: black;
      }
      .key.wrong {
        background-color: rgb(57, 57, 60);
      }
      .key.wrong-location {
        background-color: rgb(181, 159, 59);
      }
      .key.correct {
        background-color: rgb(83, 141, 78);
      }
    `;
  }
}

customElements.define('wordle-keyboard', WordleKeyboard);
