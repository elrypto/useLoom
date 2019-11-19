import React from 'react';
import loomLogo from './loomLogo.png';
import './App.css';
import useLoom from './useLoom/useLoom';
import useLoomWithConfig from './useLoom/useLoomWithConfig';


function App() {
  //const loomObj = useLoom();
  const loomObj = useLoomWithConfig();

  return (

    <div className="App">
      <header className="App-header">
        <img src={loomLogo} className="App-logo" alt="logo" />
        <p>
         Example app for using React Hooks with Loom. 
        </p>
        <button
          className="loomButton"
          onClick={ async()=> {
            console.log('testing connection');
            console.log('our loom obj', loomObj);
            let w3 = loomObj.web3;
            let bh = await w3.eth.getBlockNumber()
            alert('blockheight:' + bh);
          }}
        >
          useLoom Hooks getBlockHeight (testing connection)
        </button>



        <button
          className="loomButton"
          onClick={ async()=> {
            console.log('testing contract invocation');
          }}
        >
          useLoom Hooks getContract Value (testing contract instance and invocation)
        </button>
      </header>
    </div>
  );
}

export default App;
