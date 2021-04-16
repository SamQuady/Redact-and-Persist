import React from 'react';
import { redacter, nonCasedRedacter } from './helpers.js';
import styled from 'styled-components';

const Title = styled.h2`
font-family: Copperplate, fantasy;
font-size: 30px;
text-align: center;
`;

const Subtitle = styled.h3`
font-family: Lucida Console, monospace;
padding-left: 5px;
`

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
font-family: Lucida Console, monospace;
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
font-family: Lucida Console, monospace;
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
font-family: Lucida Console, monospace;
font-size: 20x;
font-weight: 400;
height: 200px;
width: 400px;
`;

const InputHolder = styled.div`
width: 50%;
height: auto;
float: left;
`;

const ControlsHolder = styled.div`
width: 100%;
height: auto;
padding-top: 77px;
`;

const ControlsButtonHolder = styled.div`
width: 100%;
padding-top: 2px;
`;

const RedactedHolder = styled.div`
width: 100%;
`;

const RedactedText = styled.div`
text-align: center;
width: auto;
padding-top: 100px;
font-family: Lucida Console, monospace;
font-size: 24x;
font-weight: 400;
`;

const ButtonHoldingDiv = styled.div`
padding-top: 20px;
`;





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
    return (
      <div>
        <div>
          <Title>Document Redacter</Title>
        </div>
        <div>
          <InputHolder>
            <Subtitle>Sensitive Words</Subtitle>
            <WordInput id="wordText" type="text" onChange={this.wordType}></WordInput>
            <ButtonHoldingDiv>
              <Button onClick={this.wordSubmit}>Enter</Button>
            </ButtonHoldingDiv>
            <ControlsHolder>
              <Subtitle>{this.state.cased? 'Currently Observing Case Sensitivity' : 'Currently Ignoring Case Sensitivity'}</Subtitle>
              <ControlsButtonHolder>
                <Button onClick={this.caseSwap}>Case Swap</Button>
                <Button onClick={this.redact}>Redact!</Button>
              </ControlsButtonHolder>
            </ControlsHolder>
          </InputHolder>
          <InputHolder>
            <Subtitle>Original Document</Subtitle>
            <DocInput id="docText" type="text" onChange={this.documentType}></DocInput>
            <ButtonHoldingDiv>
              <Button onClick={this.documentSubmit}>Enter</Button>
            </ButtonHoldingDiv>
          </InputHolder>
        </div>
        <div>
          <RedactedHolder>
            <RedactedText>
              {this.state.redaction? this.state.redacted : ''}
            </RedactedText>
          </RedactedHolder>
        </div>
      </div>
    )
  }
}

export default App;