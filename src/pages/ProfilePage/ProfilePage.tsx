import { Box, Button, FormControl, FormLabel, Stack, TextField, Typography } from '@mui/material'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { formObj } from '../../interfaces/FormInterfaces';
import { useTheme } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import { AppContext } from '../../context/context';
import { deleteAccountI, updateAccountI } from '../../interfaces/AccountInterfaces';
import useAccount from '../../hooks/useAccount';
import AlertComponent, { AlertProps } from '../../components/Alert/Alert';
import { getMsgFromObjValues } from '../../library/library';
import { Routes } from '../../routerConfig/routes';
import { useNavigate } from 'react-router-dom';
import useModal from '../../components/Modal/Modal';

type formNames = "username" | "name" | "surname" | "email" |"password" | "rePassword";

type formTypes = {
  [key in formNames]: string;
};


const ProfilePage = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const { authState, accountState } = useContext(AppContext);
  const { deleteAccount } = useAccount();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { control, handleSubmit, setValue, getValues, formState:{errors}, setError } = useForm({defaultValues:{
    username: String(accountState.username),
    name: String(accountState.name),
    surname: String(accountState.surname),
    email: String(accountState.email),
    password:'',
    rePassword:'',
  }});

  //modals
  const { handleOpen:openDelete, ModalComponent: ModalDelete } = useModal();

  //alerts
  const [alertElem, setAlertElem] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertProps>({
    title:'',
    subtitle:'',
    type:'success'
  })

  const { updateAccount } = useAccount()

  const formObj : formObj<formNames, formTypes>[] = [
    {
      name:'username',
      label:'Username',
      type:'text',
    },
    {
      name:'name',
      label:'Nome',
      type:'text',
    },
    {
      name:'surname',
      label:'Cognome',
      type:'text',
    },
    {
      name:'email',
      label:'Email',
      type:'email',
    },
    {
      name:'password',
      label:'Password',
      type:'password',
    },
    {
      name:'rePassword',
      label:'Ripeti Password',
      type:'password',
    }
  ];
  const openAlert = ()=>{
    setAlertElem(true);
  }
  const closeAlert = ()=>{
    setAlertElem(false);
  }
  
  useEffect(()=>{
    if (updateAccount.data?.status){
  
      if(updateAccount.data?.status <= 201){
        setAlertType({
          title:'Successo',
          subtitle: 'Dati modificati con successo',
          type: 'success'
        })
      } else {

        let msg = getMsgFromObjValues(updateAccount.data.data.message);

        msg = msg ?? 'Non è stato possibile modificare i tuoi dati';

        setAlertType({
          title:'Errore',
          subtitle: msg,
          type: 'error'
        })
      }
      openAlert();
    }
  }, [updateAccount.data?.status])

  useEffect(()=>{
    if (deleteAccount.data?.status){
  
      if(deleteAccount.data?.status <= 201){

        let msg = 'Account eliminato correttamente';
  
        setAlertType({
          title:'Successo',
          subtitle: msg,
          type: 'success'
        })

        setTimeout(()=>{
          navigate(Routes.LOGIN);
        },2500)
      } else {

        let msg = getMsgFromObjValues(deleteAccount.data.data.message);

        msg = msg ?? 'Non è stato possibile eliminare l\'account';

        setAlertType({
          title:'Errore',
          subtitle: msg,
          type: 'error'
        })

        setIsSubmitted(false);
      }
      openAlert();
    }
  }, [deleteAccount.data?.status])

  const handleConfirm = useCallback((event: FieldValues)=>{

    if (event.password !== event.rePassword){

      setError('rePassword', {
        type: 'validate',
        message: 'Le password non coincidono'
      });

      return;
    }

    for(let field in event){
      if(!event[field]){
        delete event[field];
      }
    }
    delete event['rePassword'];

    if (authState.accountId){
      let body : updateAccountI = {
        accountId : String(authState.accountId),
        body : event
      }

      updateAccount.mutate(body);
    }

  },[]);

  const onDelete = ()=>{

    let body : deleteAccountI = {
      accountId: String(authState.accountId)
    }
    setIsSubmitted(true);
    deleteAccount.mutate(body);
  }


  return (
    <Stack
      spacing={{ xs: 2, sm: 8 }}
      direction='column'
      justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
      alignItems={{ xs: 'center', sm: 'center' }}
      sx={{ 
        flexWrap: 'wrap', 
        padding:'2em',
        paddingTop:'0',
      }}
    >

      <Box
        sx={{
          width:'100%',
          display:'flex',
          flexDirection:'column',
          gap:'0.5em',
        }}
      >
        <Typography
          variant="h5" component="h4"
        >I tuoi dati</Typography>
        <div className="line"
          style={{background:theme.palette.grey[500]}}
        ></div>
      </Box>

      <form 
        style={{
          width:'100%',
          display:'flex',
          flexDirection:'column',
          gap:'1em'
        }}
        onSubmit={handleSubmit((e)=>handleConfirm(e))}
      >
        <Box
          sx={{
            display:'flex',
            justifyContent:'flex-end'
          }}
        >
          <Button type='submit' variant="contained"
            sx={{
              background:theme.palette.success.light
            }}
          >
            <SaveIcon></SaveIcon>
          </Button>
        </Box>
        <Stack
          //spacing={{ xs: 2, sm:'inherit'}}
          direction={{ xs: 'column' }}
          justifyContent={{ xs: 'flex-start' }}
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          sx={{ 
            flexWrap: 'wrap', 
            rowGap: { xs: '1.5em' },
          }}
          width={{ xs: '100%', sm: '90%'}}
        >
          {
            formObj.map((formElem, index)=>{
              return (
                <FormControl 
                  key={index}
                  sx={{
                    width: {xs:'100%', md:'40em'},
                    marginLeft: {xs:'0', md:'1.5em'},
                    display:'flex',
                    flexDirection:{xs:'column', md:'row'},
                    gap:{xs:'0', md:'1em'},
                  }}
                >
                  <FormLabel 
                    htmlFor={formElem.name}
                    sx={{
                      width:{xs:'100%', md:'10em'},
                      display:'flex',
                      justifyContent:'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    {formElem.label}
                  </FormLabel>

                  <Controller
                    name={formElem.name}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={formElem.type}
                        fullWidth
                        autoComplete='off'
                        size='small'
                        variant="filled"
                        color="primary"
                        error={!!errors[formElem.name]}
                        helperText={errors[formElem.name]?.message}
                      />
                    )}
                    rules={formElem.rules}
                  />
               </FormControl>);
            })
          }
        </Stack>

      </form>

      <Box
        sx={{
          width:'100%',
          display:'flex',
          flexDirection:'column',
          gap:'0.5em',
        }}
      >
        <Typography
          variant="h5" component="h4"
          sx={{
            color:theme.palette.error.main
          }}
        >Danger Zone</Typography>
        <div className="line"
          style={{background:theme.palette.error.main}}
        ></div>
      </Box>

      <Box
        sx={{
          display:'flex',
          flexDirection:{xs:'column', sm:'row'},
          justifyContent:'flex-start',
          gap:'1em',
          width:'100%',
        }}
      >

        <Typography
          variant="h6" component="h4"
        >Questa azione è irreversibile</Typography>

        <Button type='button' variant="contained"
          disabled={isSubmitted}
          onClick={openDelete}
            sx={{
              background:theme.palette.error.main
            }}
          >
            Elimina Account
        </Button>

      </Box>

      <ModalDelete
        title='Sei davvero sicuro?'
        onConfirm={onDelete}
        isDelete={true}
      >
        <Typography
          variant="subtitle1" component="span"
        >Questa azione eliminerà per sempre il tuo account</Typography>
      </ModalDelete>

      <AlertComponent 
        activated={alertElem}
        onClose={closeAlert}
        duration={2500}
        title={alertType.title}
        subtitle={alertType.subtitle}
        type={alertType.type}
      >
      </AlertComponent>
    </Stack>
  )
}

export default ProfilePage
