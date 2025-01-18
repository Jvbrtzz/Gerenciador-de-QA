import { jwtDecode } from 'jwt-decode';

function decodeToken(){    
    const accessToken = localStorage.getItem('accessToken');
    const decodedToken = accessToken ? jwtDecode(accessToken) : {}

    return decodedToken

}

export default decodeToken;