import React from 'react';
import ButtonDemo from './demos/ButtonDemo';
import MenuDemo from './demos/MenuDemo';

function App () {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Hello world</h1>
        <h2>Hello world</h2>
        <h3>Hello world</h3>
        <hr/>
        <code>
          const a = 'b'
        </code> */}

        <MenuDemo />

        <ButtonDemo />

      </header>
    </div>
  );
}

export default App;
