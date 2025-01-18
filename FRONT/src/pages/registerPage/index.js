import React, { useState } from 'react';
import './index.css';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Toaster } from 'react-hot-toast';
import { createUser } from '../../api/user';
import Button from '@mui/material/Button';

function RegisterPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleFormSubmit = () => {
    createUser(username, email, password);
  };

  return (
    <>
      <Toaster />

        <Grid item xs={11} sm={7} className="container">
          <div className='login-container'>
            <SchoolIcon className='icon' fontSize={'large'}></SchoolIcon>
            <h1>Olá!</h1>
            <p>Faça seu Cadastro!</p>
            <div className='spacer' />
            <TextField
              id='username'
              label='Usuário'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              id='email'
              label='E-mail'
              type='email'
              variant='outlined'
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id='password'
              label='Senha'
              type='password'
              variant='outlined'
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='spacer' />
            <Button onClick={handleFormSubmit} variant="contained">Enviar</Button>

            <div className='warning-text'><strong>AVISO:</strong> Por favor espere um pouco antes de reiniciar a página, pois nosso servidor pode estar inativo e demorando alguns instantes para retornar a atividade.</div>
          </div>
        </Grid>
    </>
  );
}



export default RegisterPage;