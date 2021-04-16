import React from 'react';
import redacter from '../../helpers/main.js';
import nonCasedRedacter from '../../helpers/main.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      original: '',
      redacted: '',
    }
  }

  render() {
    return (
      <div>
        <div>
          <h2>Document Redacter</h2>
        </div>
        <div>
          <div>
            <h4>Sensitive Words</h4>
            <input type="text"></input>
            <button>Enter</button>
          </div>
          <div>
            <h4>Original Document</h4>
            <input type="text"></input>
            <button>Enter</button>
          </div>
        </div>
        <div>
          <button>Redact!</button>
        </div>
      </div>
    )
  }
}

export default App;