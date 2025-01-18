import React, { useState } from 'react';
import './index.css';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';
import { Toaster } from 'react-hot-toast';
import { userLogin } from '../../api/user';
import Button from '@mui/material/Button';

function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = () => {
    userLogin(username, password);
  };

  return (
    <>
      <Toaster />

        <Grid item xs={11} sm={7} className="container">
          <div className='login-container'>
            <CottageIcon className='icon' fontSize={'large'}></CottageIcon>
            <h1>Olá!</h1>
            <p>Faça seu login!</p>
            <div className='spacer' />
            <TextField
              id='username'
              label='Usuário'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
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

            <div className='warning-text'><strong>AVISO IMPORTANTE:</strong> Por favor espere um pouco antes de reiniciar a página, pois nosso servidor pode estar inativo e demorando alguns instantes para retornar a atividade.</div>
          </div>
        </Grid>
    </>
  );
}



export default LoginPage;