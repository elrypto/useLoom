import React from 'react';
import loomLogo from './loomLogo.png';
import './App.css';
import useLoom from './useLoom/useLoom';
import useLoomWithConfig from './useLoom/useLoomWithConfig';
import SimpleStore from './contracts/SimpleStore';
import { createContractInstance } from './useLoom/loomActions';

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
            let c = await createContractInstance(loomObj, SimpleStore);
            console.log("testcontract", c);
            await c.methods.set(90001).send({from: loomObj.currentUserAddress})
          }}
        >
          Call Set on Contract (testing contract instance and invocation)
        </button>


        <button
          className="loomButton"
          onClick={ async()=> {
            console.log('testing contract invocation');
            let c2 = await createContractInstance(loomObj, SimpleStore);
            console.log("testcontract", c2);
            let val =  await c2.methods.get().call();
            alert('contract returned' + JSON.stringify(val));
          }}
        >
          Call Get on Contract (testing contract instance and invocation)
        </button>
      </header>
    </div>
  );
}

export default App;
