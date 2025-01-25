import React, { useEffect, useState } from 'react';
import './share.css';
import { Button } from '@mui/material';
import { getAllusers } from '../../api/user';

const Share = () => {
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    async function fetchAllusers() {
      try {
        const fetchedUsers = await getAllusers();
        setUsers(fetchedUsers);
        
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setUsers([]);
      }
    }

    fetchAllusers();
  }, []); 
  

  return (
    <div className="share-container">
      <h1>Lista de Usuários</h1>
      {users.length > 0 ? ( 
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p><strong>Nome:</strong> {user.nome}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  );
};

export default Share;
