import { isObject, isString } from "lodash";

  export type KeyValue<K, V> = {
    key : K,
    value : V
  }

  /*---------------------------ADD-SIGNATURE-TO-TEXT----------------------------*/

  export function addSignature(text:string, signature:string){
  
      if (text){
  
        let lines = text.split('\n');
  
        lines = lines.map((line:string, index:number)=>{
  
          if (!line.includes(signature) && (index === lines.length-1)){
            return signature  + ': ' + line;
          }
  
          return line;
        });
  
        let notes = lines.join('\n');
        
        return notes;
      }
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