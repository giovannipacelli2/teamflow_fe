import { Alert, AlertTitle } from '@mui/material'
import "./Alert.scss";
import React, { useEffect } from 'react'

export interface AlertProps {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
    type ?: "error" | "warning" | "success" | "info"
    activated?:boolean,
    duration?:number,
    onClose ?: ()=>void
}

const defaultProps : AlertProps = {
    children:<></>,
    title: 'Successo',
    subtitle: '',
    type : "success",
    activated:false,
    duration : 2000,
    onClose:()=>{}
}

const AlertComponent = (props: AlertProps) => {

    props = {
        ...props,
        duration : props.duration ?? defaultProps.duration,
        activated : props.activated ?? defaultProps.activated,
        title : props.title ?? defaultProps.title,
        subtitle : props.subtitle ?? defaultProps.title,
        type : props.type ?? defaultProps.type,
    }


    useEffect(()=>{

        if(props.activated){
            setTimeout(()=>{
                props.onClose && props.onClose();
            },props.duration);
        }

    },[props.activated])

  return (
    <div className={'alert-component' +  (props.activated ? ' rigth-to-left' : '')}>
        <Alert severity={props.type}>
            <AlertTitle>{props.title}</AlertTitle>
            {props.subtitle}
        </Alert>
    </div>
  )
}

export default AlertComponent
