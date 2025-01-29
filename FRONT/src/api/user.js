import http from "./api";
import toast from "react-hot-toast";
import { navigateToHome, navigateToLogin } from "../utils/redirectHome";

function getAllusers(){
    return http.get('/users').then(response => {
        const data = response.data;
        if (data && data.length > 0) {            
            return data; 
        } else {
            toast.error('Credenciais inválidas.');
        }
    })
    .catch(error => {
        toast.error('Erro ao fazer login.');
        console.error('Error:', error);
    });
}

function createUser(nome, email, senha){
    http.post('/registerUser', {
        nome,
        email,
        senha
    }).then(response => {
        const data = response.data;
        if (data.success) {
            console.log('Register successful:', data.user);
            navigateToLogin()
        } else {
            toast.error('Credenciais inválidas.');        
        }
    })
    .catch(error => {
        toast.error('Erro ao fazer login.');
        console.error('Error:', error);
    });
}

const userLogin = (nome, senha) => {
    http.post('/userLogin', {
        nome,
        senha,
    }).then(response => {
            const data = response.data;
            if (data.success) {
                console.log('Login successful:', data.user);
                localStorage.setItem('accessToken', data.accessToken);
                navigateToHome()
            } else {
                toast.error('Credenciais inválidas.');
            }
        })
        .catch(error => {
            toast.error('Erro ao fazer login.');
            console.error('Error:', error);
        });
}

function getAllShareUsers(cardId){
    return http.get(`/sharedUsers/${cardId}`).then(response => {
        const data = response.data;
        if (data && data.length > 0) {            
            return data; 
        } else {
            toast.error('Credenciais inválidas.');
        }
    })
    .catch(error => {
        toast.error('Erro ao fazer login.');
        console.error('Error:', error);
    });
}

function getAllShareCards(userId){
    return http.get(`/sharedCards/${userId}`).then(response => {
        const data = response.data;
        if (data && data.length > 0) {            
            return data; 
        } else {
            toast.error('Credenciais inválidas.');
        }
    })
    .catch(error => {
        toast.error('Erro ao fazer login.');
        console.error('Error:', error);
    });
}


function createShareUser(cardId, userId, permission){
    return http.post('/share', {
        cardId,
        userId,
        permission
    }).then(response => {
        const data = response.data;
        if (data.success) {
            console.log('Register successful:', data.user);
        } else {
            toast.error('Credenciais inválidas.');
        }
    })
    .catch(error => {
        toast.error('Erro ao fazer login.');
        console.error('Error:', error);
    });
}

function deleteShareUser(userId, cardId) {    
    return http.delete(`/deleteShare/${userId}/${cardId}`)
        .then(response => {
            const data = response.data;
            if (data.success) {        
                console.log('Delete successful');               
            } else {
                toast.error('Delete inválida.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Erro ao tentar deletar o compartilhamento.');
        });
}


export {
    createUser,
    userLogin,
    getAllusers,
    createShareUser,
    getAllShareUsers,
    getAllShareCards,
    deleteShareUser
};
