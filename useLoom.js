import React from "react";
import { CryptoUtils, Client, LoomProvider, LocalAddress } from "loom-js";
import Web3 from "web3";
import EsembleContractJson from "../../contracts/EsembleApp.json";

/* based on loom truffle example, contract.js file, adapted to react hooks
   https://github.com/loomnetwork/truffle-dappchain-example/blob/master/src/contract.js
*/

//default connection info, if not is passed in
export const DEFAULT_LOCAL_DEV = {
  networkAlias: "DEFAULT_LOCAL_DEV",
  writeUrl: "ws://127.0.0.1:46658/websocket",
  readUrl: "ws://127.0.0.1:46658/queryws",
  networkId: "default"
};

export const DEFAULT_CONTRACT = EsembleContractJson;

export default function useLoom(contractJson, connectionInfo) {
  const [loomObj, setLoomObj] = React.useState(null);

  if (!contractJson) {
    contractJson = DEFAULT_CONTRACT;
  }

  if (!connectionInfo) {
    connectionInfo = DEFAULT_LOCAL_DEV;
  }

  const Loom = {
    contract: null,
    client: null,
    privateKey: null,
    publicKey: null,
    currentUserAddress: "",
    web3: null,
    instance: null,
    currentNetwork: "",
    connectionInfo: null
  };

  React.useEffect(() => {
    //TODO!!!: set onEvent
    Loom.contract = contractJson;
    Loom.connectionInfo = connectionInfo;

    //console.log("useLoom.useEffect([])");
    // console.log("useLoom with contract:", Loom.contract);
    // console.log("useLoom with connectionInfo:", Loom.connectionInfo);

    const initialize = async () => {
      //console.log("useLoom.useEffect([]).initialize()");
      await createClient();
      Loom.currentUserAddress = LocalAddress.fromPublicKey(
        Loom.publicKey
      ).toString();
      Loom.web3 = new Web3(new LoomProvider(Loom.client, Loom.privateKey));
      await createContractInstance();
      setLoomObj(Loom);
    };
    initialize();
  }, []);

  return loomObj;

  async function createClient() {
    Loom.privateKey = CryptoUtils.generatePrivateKey();
    Loom.publicKey = CryptoUtils.publicKeyFromPrivateKey(Loom.privateKey);
    Loom.client = new Client(
      Loom.connectionInfo.networkId,
      Loom.connectionInfo.writeUrl,
      Loom.connectionInfo.readUrl
    );

    Loom.client.on("error", msg => {
      console.error("Error on connect to client", msg);
      console.warn("Please verify if loom command is running");
    });
  }

  async function createContractInstance() {
    const networkId = await getCurrentNetwork();
    Loom.currentNetwork = Loom.contract.networks[networkId];
    //console.log("network:", Loom.currentNetwork);

    if (!Loom.currentNetwork) {
      console.error(
        "not a valid network: , network id was:",
        Loom.currentNetwork,
        networkId
      );
      throw Error("Contract not deployed on DAppChain (network id error)");
    }

    Loom.instance = new Loom.web3.eth.Contract(
      Loom.contract.abi,
      Loom.currentNetwork.address,
      {
        from: Loom.currentUserAddress
      }
    );
  }

  async function getCurrentNetwork() {
    return await Loom.web3.eth.net.getId();
  }
}
