import { useState, useEffect } from "react";
import { ILoomObject } from "../../common/Interfaces";


export default function useLoomToLoad(loomObj:ILoomObject|any, asyncCallback:any) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (loomObj && loomObj.instance) {
      const callAsyncToLoad = async () => {
        let temp = await asyncCallback();  
        setValue(temp);
      };
      callAsyncToLoad();
    }
  }, [loomObj]);

  return value;
}
