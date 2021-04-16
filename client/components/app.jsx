import React from 'react';
import { redacter, nonCasedRedacter } from './helpers.js';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      words: [],
      currentWord: '',
      original: '',
      redacted: '',
      cased: false,
    };
    this.wordSubmit = this.wordSubmit.bind(this);
    this.wordType = this.wordType.bind(this);
    this.documentSubmit = this.documentSubmit.bind(this);
    this.documentType = this.documentType.bind(this);
    this.caseSwap = this.caseSwap.bind(this);
  }

  wordSubmit() {
    let words = this.state.words;
    words.push(this.state.currentWord);
    let form = document.getElementById("wordText");
    form.value = '';
    this.setState({words: words, currentWord: ''});
    console.log(this.state);
  }

  wordType(event) {
    this.setState({currentWord: event.target.value});
  }

  documentSubmit() {
    let redacted = '';
    if (this.state.cased) {
      redacted = nonCasedRedacter(this.state.original);
    } else {
      redacted = redacter(this.state.original);
    }
    console.log(redacted);
  }

  documentType(event) {
    this.setState({original: event.target.value});
  }

  caseSwap() {
    let current = this.state.cased;
    this.setState({cased: !current});
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div>
          <h2>Document Redacter</h2>
        </div>
        <div>
          <div>
            <h4>Sensitive Words</h4>
            <input id="wordText" type="text" onChange={this.wordType}></input>
            <button onClick={this.wordSubmit}>Enter</button>
          </div>
          <div>
            <h4>Original Document</h4>
            <input type="text" onChange={this.documentType}></input>
            <button onClick={this.documentSubmit}>Enter</button>
          </div>
        </div>
        <div>
          <div>{this.state.cased? 'Currently Observing Case Sensitivity' : 'Currently Ignoring Case Sensitivity'}</div>
          <button onClick={this.caseSwap}>Case Swap</button>
          <button>Redact!</button>
        </div>
      </div>
    )
  }
}

export default App;