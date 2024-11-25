import React, { ChangeEvent } from 'react';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { TodoResponse } from '../../../api';
import { editFormI } from '../../../pages/MyTodos/MyTodosPage';

interface defaultPropsI {
    todo : TodoResponse,
    editForm : editFormI,
    handleChange : (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const TodoForm = ({todo, editForm, handleChange}:defaultPropsI) => {
  return (
    <section>
        <FormControl>
            <FormLabel htmlFor="title">Titolo</FormLabel>
            <TextField
                id="title"
                type="text"
                name="title"
                autoComplete="off"
                required
                fullWidth
                variant="outlined"
                color={'primary'}
                sx={{ ariaLabel: 'title' }}
                value={editForm.title}
                onChange={(event)=>{handleChange(event)}}
            />
        </FormControl>
            <FormControl>
                <FormLabel htmlFor="description">Password</FormLabel>
                <TextField
                    id="description"
                    type="text"
                    name="description"
                    autoComplete="off"
                    required
                    fullWidth
                    variant="outlined"
                    color={'primary'}
                    sx={{ ariaLabel: 'description' }}
                    value={editForm.description}
                    onChange={(event)=>{handleChange(event)}}
                />
        </FormControl>
    </section>
  )
}

export default TodoForm
