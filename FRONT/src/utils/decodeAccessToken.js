import { jwtDecode } from 'jwt-decode';

function decodeToken() {
  const accessToken = localStorage.getItem('accessToken');
  try {
    return accessToken ? jwtDecode(accessToken) : null;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}

export default decodeToken;
