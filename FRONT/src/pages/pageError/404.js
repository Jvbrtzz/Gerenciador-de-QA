import React from 'react';
import './404.css';
import { navigateToHome } from '../../utils/redirectHome';
import { Button } from '@mui/material';

const navigate = navigateToHome;

const Erro404 = () => {
  return (
    <div className="erro-container">
      <h1 className="erro-title">PÁGINA NÃO ENCONTRADA</h1>
      <Button 
        variant="contained" 
        onClick={navigate} 
        className="erro-button"
      >
        Voltar para tela inicial
      </Button>
    </div>
  );
};

export default Erro404;
