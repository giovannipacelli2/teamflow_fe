import React, { createContext, useState } from "react";
import { AlertProps } from "../components/Alert/Alert";

interface AlertProviderProps {
    children: React.ReactNode;
  }



const AlertContext = createContext<{
  openAlert : () => void;
  closeAlert : () => void;
  alertElem : boolean;
  setAlertElem : React.Dispatch<React.SetStateAction<boolean>>;
  alertType : AlertProps;
  setAlertType : React.Dispatch<React.SetStateAction<AlertProps>>;

}>({
    openAlert : ()=>{},
    closeAlert : ()=>{},
    alertElem : false,
    setAlertElem : ()=>{},
    alertType : {
      title:'',
      subtitle:'',
      type:'success'
    },
    setAlertType : ()=>{},
});


const AlertProvider = ( {children}: AlertProviderProps ) => {
    const [alertElem, setAlertElem] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<AlertProps>({
      title:'',
      subtitle:'',
      type:'success'
    })

    const openAlert = ()=>{
      setAlertElem(true);
    }
    const closeAlert = ()=>{
      setAlertElem(false);
    }


  return (
    <AlertContext.Provider value={{
      alertElem, setAlertElem,
      alertType, setAlertType,
      openAlert, closeAlert

    }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider, AlertContext };