import React, { useState } from 'react';
import './index.css';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { ToastContainer, toast } from 'react-toastify';
import { createUser } from '../../api/user';
import Button from '@mui/material/Button';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail } from '../../utils/regex';

function RegisterPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);

  const handleFormSubmit = () => {
    const validatePassword = password !== confirmPassword;
    if(validatePassword){
      toast.error("Senhas não batem!", { position: "top-center", autoClose: 3000 });
    }else if(!username || !password || !email || !confirmPassword){
      toast.error("Preencha o formulário todo!", { position: "top-center", autoClose: 3000 });
    }else{
      createUser(username, email, password);
    }
  };

  const handleClickEmail = (e) =>{
      setEmail(e)
      const emailValidation = validateEmail(e)
      if (emailValidation && username  && password && email && confirmPassword) {
        setInvalidEmail(false)
      } else {
        setInvalidEmail(true)
    }
  }
  return (
    <>
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
              required={true}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              id='email'
              label='E-mail'
              type='email'
              variant='outlined'
              value={email}
              required={true}
              fullWidth
              onChange={(e) => handleClickEmail(e.target.value)}
            />
            <TextField
              id='password'
              label='Senha'
              type='password'
              variant='outlined'
              value={password}
              required={true}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id='password'
              label='Confirmar senha'
              type='password'
              variant='outlined'
              value={confirmPassword}
              required={true}
              fullWidth
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className='spacer' />
            <ToastContainer />

            <Button disabled={invalidEmail}  onClick={handleFormSubmit} variant="contained">Enviar</Button>
            <div className='warning-text'><strong>AVISO:</strong> Por favor espere um pouco antes de reiniciar a página, pois nosso servidor pode estar inativo e demorando alguns instantes para retornar a atividade.</div>
          </div>
        </Grid>
    </>
  );
}



export default RegisterPage;