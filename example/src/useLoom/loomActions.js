export async function createContractInstance(Loom) {
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

export async function getCurrentNetwork(Loom) {
  return await Loom.web3.eth.net.getId();
}