import React from 'react';
import './index.css';
import Navbar from '../../components/navbar';
import Card from '../../components/card/card';
import decodeToken from '../../utils/decodeAccessToken';

const navigateTo = () => {
  window.location.href = '/login';
}

const token = decodeToken()

if(!token){
  navigateTo()
}

const MainPage = () => {
  return (
    <>
      <Navbar />    
      <div className="main-content">
        <Card />
      </div>
    </>
  );
};

export default MainPage;
