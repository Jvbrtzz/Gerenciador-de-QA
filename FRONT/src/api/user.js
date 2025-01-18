import http from "./api";
import toast from "react-hot-toast";

const navigateTo = () => {
    window.location.href = '/';
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
            navigateTo();
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
                navigateTo();
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
