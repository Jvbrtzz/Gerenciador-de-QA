import React from 'react';
import './users.css';
import { navigateToHome } from '../../utils/redirectHome';
import { Button } from '@mui/material';
import Share from '../../components/share/share';

const navigate = navigateToHome;

const GetUsers = () => {
  return (
    <div className="users-container">
      <h1 className="users-title">Usuários:</h1>
      <Share/>
    </div>
  );
};

export default GetUsers;
