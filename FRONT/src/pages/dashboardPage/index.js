
import React from 'react';
import './index.css';

const navigateTo = () => {
    window.location.href = '/login';
} 
const CadastroConcluido = () => {
  return (
    <div className="cadastro-concluido-container">
      <h1>Cadastro Concluído!</h1>
      <p>Seu cadastro foi realizado com sucesso.</p>
      <button className="voltar-btn" onClick={navigateTo}>Voltar para a página inicial</button>
    </div>
  );
};

export default CadastroConcluido;
