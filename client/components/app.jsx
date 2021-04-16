import React from 'react';
import { redacter, nonCasedRedacter } from './helpers.js';
import styled from 'styled-components';

const Button = styled.button`
line-height: 30px;
background-color: white;
border-radius: 2px;
border-style: solid;
border-color: rgb(104, 104, 104);
border-width: 1px;
margin-left: 10px;
color: rgb(41, 41, 41);
cursor: pointer;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 20x;
font-weight: 400;
height: 34px;
width: auto;
&:hover {box-shadow: inset 0 0 3px #000000;}
`;

const WordInput = styled.input`
line-height: 30px;
background-color: white;
border-radius: 2px;
border-style: solid;
border-color: rgb(104, 104, 104);
border-width: 1px;
margin-left: 10px;
color: rgb(41, 41, 41);
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 20x;
font-weight: 400;
height: 34px;
`;

const DocInput = styled.textarea`
line-height: 30px;
background-color: white;
border-radius: 2px;
border-style: solid;
border-color: rgb(104, 104, 104);
border-width: 1px;
margin-left: 10px;
color: rgb(41, 41, 41);
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 20x;
font-weight: 400;
height: 200px;
width: 400px;
`;

const InputHolder = styled.div`
width: 50%;
float: left;
`




class App extends React.Component {
  constructor() {
    super();
    this.state = {
      words: [],
      currentWord: '',
      original: '',
      redacted: '',
      cased: false,
      redaction: false
    };
    this.wordSubmit = this.wordSubmit.bind(this);
    this.wordType = this.wordType.bind(this);
    this.documentSubmit = this.documentSubmit.bind(this);
    this.documentType = this.documentType.bind(this);
    this.caseSwap = this.caseSwap.bind(this);
    this.redact = this.redact.bind(this);
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
    let answer = window.confirm("Are you sure about this document?");
    if (answer) {
      let form = document.getElementById("docText");
      form.value = '';
      form.readOnly = true;
      event.preventDefault();
    }
  }

  documentType(event) {
    this.setState({original: event.target.value});
  }

  caseSwap() {
    let current = this.state.cased;
    this.setState({cased: !current});
  }

  redact() {
    let redacted = '';

    if (!this.state.cased) {
      redacted = nonCasedRedacter(this.state.words, this.state.original);
    } else {
      redacted = redacter(this.state.words, this.state.original);
    }
    this.setState({redacted: redacted, redaction: true});
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div>
          <h2>Document Redacter</h2>
        </div>
        <div>
          <InputHolder>
            <h4>Sensitive Words</h4>
            <WordInput id="wordText" type="text" onChange={this.wordType}></WordInput>
            <Button onClick={this.wordSubmit}>Enter</Button>
          </InputHolder>
          <InputHolder>
            <h4>Original Document</h4>
            <DocInput id="docText" type="text" onChange={this.documentType}></DocInput>
            <Button onClick={this.documentSubmit}>Enter</Button>
          </InputHolder>
        </div>
        <div>
          <div>{this.state.cased? 'Currently Observing Case Sensitivity' : 'Currently Ignoring Case Sensitivity'}</div>
          <Button onClick={this.caseSwap}>Case Swap</Button>
          <Button onClick={this.redact}>Redact!</Button>
        </div>
        <div>
          <div>
            {this.state.redaction? this.state.redacted : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default App;