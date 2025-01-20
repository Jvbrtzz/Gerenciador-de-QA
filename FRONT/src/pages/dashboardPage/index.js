
import React from 'react';
import './index.css';
import {navigateToHome} from '../../utils/redirectHome';

const CadastroConcluido = () => {
  return (
    <div className="cadastro-concluido-container">
      <h1>Cadastro Concluído!</h1>
      <p>Seu cadastro foi realizado com sucesso.</p>
      <button className="voltar-btn" onClick={navigateToHome}>Voltar para a página inicial</button>
    </div>
  );
};

export default CadastroConcluido;
