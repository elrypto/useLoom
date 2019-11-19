import useLoom from "./useLoom";
import {
  LOOM_NETWORK,
  LOOM_DEV_NETWORK_ID,
  LOOM_DEV_READ_URL,
  LOOM_DEV_WRITE_URL,
  LOOM_EXTDEV_NETWORK_ID,
  LOOM_EXTDEV_READ_URL,
  LOOM_EXTDEV_WRITE_URL
} from "./config";


const connectionInfo = {
  networkAlias: '',
  networkId: '',
  writeUrl: '',
  readUrl: ''
}

export default function useLoomWithConfig() {

  if (LOOM_NETWORK==="DEV"){
    //console.log("DEV");
    connectionInfo.networkAlias = LOOM_NETWORK;
    connectionInfo.networkId = LOOM_DEV_NETWORK_ID;
    connectionInfo.writeUrl = LOOM_DEV_WRITE_URL;
    connectionInfo.readUrl = LOOM_DEV_READ_URL;
  }else if(LOOM_NETWORK==="EXTDEV"){
   // console.log("EXTDEV");
    connectionInfo.networkAlias = LOOM_NETWORK;
    connectionInfo.networkId = LOOM_EXTDEV_NETWORK_ID;
    connectionInfo.writeUrl = LOOM_EXTDEV_WRITE_URL;
    connectionInfo.readUrl = LOOM_EXTDEV_READ_URL;
  }else {
    console.error("Invalid LOOM_NETWORK entry in .env config file");
  }
  
  return useLoom(connectionInfo);
}
