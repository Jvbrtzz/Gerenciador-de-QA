import React from 'react';
import './index.css';
import Navbar from '../../components/navbar';
import Card from '../../components/card/card';
import decodeToken from '../../utils/decodeAccessToken';
import { navigateToLogin } from '../../utils/redirectHome';

const MainPage = () => {

  const token = decodeToken()   

  React.useEffect(()=>{
    if(!token){
      navigateToLogin()
    }
  }, [token])

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
