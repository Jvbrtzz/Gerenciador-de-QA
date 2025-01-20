import http from "./api";
import toast from "react-hot-toast";
import { navigateToHome } from "../utils/redirectHome";

function createUser(nome, email, senha){
    http.post('/registerUser', {
        nome,
        email,
        senha
    }).then(response => {
        const data = response.data;
        if (data.success) {
            console.log('Register successful:', data.user);
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

const userLogin = (nome, senha) => {
    http.post('/userLogin', {
        nome,
        senha,
    })
        .then(response => {
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

export {
    createUser,
    userLogin
};
