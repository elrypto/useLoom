import React from  'react';
import { ILoomObject } from '../../common/Interfaces';
import { notify } from '../../common/Actions';


export enum EventType{
  Skill = "Skill",
  User = "User"
};

export default function useLoomEventLog(loomObj:ILoomObject|any, eventType:EventType){
  
  React.useEffect(() => {
    if (loomObj){
      console.log("Adding loom event listener for:", eventType);
      if (eventType===EventType.Skill){
        loomObj.instance.events.SkillAdded((err:any, evt:any) => {
          handleEvent("Skill", err, evt);
        }) 
      }else if (eventType===EventType.User){
        loomObj.instance.events.UserAdded((err:any, evt:any) => {
          handleEvent("User", err, evt);
        }) 
      }else {
        console.error("Invalid EventType in useLoomEventLog Hook");
      }
    }
  }, [loomObj]);


  const handleEvent = (name:string, err:any, evt:any) => {
    if (err){
      console.error(`error while listening to ${name} events:`, err);
    }else{
      console.log(`got ${name} event!:`, evt);
      notify(`${name} event (added): ` + evt.returnValues[0], false);
    }
  }
}