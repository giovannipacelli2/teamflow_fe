import { isObject, isString } from "lodash";
import { format } from 'date-fns';

  export type KeyValue<K, V> = {
    key : K,
    value : V
  }

  /*------------------------------DATE-MANAGEMENT-------------------------------*/


  export function formatDate(date : Date | string , mode : "full" | "date" | "hours" | "full_no_seconds"= "full") : string{

    let dateFormat = 'dd/MM/yyyy HH:mm:SS';
    switch(mode){
      case "full":{
        dateFormat = 'dd/MM/yyyy HH:mm:SS';
        break;
      }

      case "date":{
        dateFormat = 'dd/MM/yyyy';
        break;
      }

      case "hours":{
        dateFormat = 'HH:mm:SS';
        break;
      }

      case "full_no_seconds":{
        dateFormat = 'dd/MM/yyyy HH:mm';
        break;
      }
    }
    
    return format(date, dateFormat);
  }

  /*----------------------------KEY-VALUE-GENERATOR-----------------------------*/

  export function processData<T>(data : T, fields : KeyValue<string, string>[]) : KeyValue<string, string>[] {

    let tmp : KeyValue<string, string> []= [];

    for(let field of fields){

      let f : any = field.key;
      let key : keyof T = f;

      tmp.push(
        {
          key: field.value,
          value: String(data[key])
        }
      );
    }

    return tmp;

  }

  export function getMsgFromObjValues(msgObj:{[key:string]:string} | string | undefined ):string{

      if (!msgObj) return '';

      if (isObject(msgObj)){

        let messages = Object.values(msgObj);
        return messages.join(', ');
      } else if(isString(msgObj)){
        return msgObj;
      }

      return '';
  }


  export function getErrMsgFromRequest<T>(reqMess : string | T) : any{
    if (isObject(reqMess)){

      let message : string = '';

      for (let msg in reqMess){

        let f : any = String(msg);
        let key : keyof T = f;

        let text = String(reqMess[key]);

        if (text !== ''){

          message = message !== '' ? message + '</br>' + text : text;
        }
      }

      return message;

    } else if (isString(reqMess)){

      return reqMess;
    } else {
      return '';
    }
  }