import http from "./api";
import toast from "react-hot-toast";

function getUserCard(id) {
    return http.get(`getUserCard/${id}`)
        .then(response => {
            const data = response.data;
            if (data && data.length > 0) {
                return data; 
            } else {
                toast.error('Nenhum card encontrado.');
                return []; 
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Erro ao buscar dados.');
            throw error;
        });
}

function createCard(user_id, title, description, status){
    http.post('/createCards', {
        user_id,
        title,
        description,
        status        
    }).then(response => {
        const data = response.data;
        if (data.success) {
            console.log('Register successful:', data.user);
        } else {
            toast.error('Card inválido.');
        }
    })
    .catch(error => {
        toast.error('Erro ao cadastrar card.');
        console.error('Error:', error);
    });
}

function updateCard(cardId, title, description, status){
    http.put(`/updateCard/${cardId}`, {
        title,
        description,
        status        
    }).then(response => {
        const data = response.data;
        if (data.success) {
            console.log('Register successful:', data.user);
        } else {
            toast.error('Card inválido.');
        }
    })
    .catch(error => {
        toast.error('Erro ao cadastrar card.');
        console.error('Error:', error);
    });
}


function updateCardStatus(cardId, status){
    http.put(`/updateCardStatus/${cardId}`, {
        status        
    }).then(response => {
        const data = response.data;
        if (data.success) {
            console.log('Register successful:', data.user);
        } else {
            toast.error('Card inválido.');
        }
    })
    .catch(error => {
        toast.error('Erro ao cadastrar card.');
        console.error('Error:', error);
    });
}



function deleteCard(cardId) {    
    return http.delete(`/deleteCarts/${cardId}`);
  }
  
  
export {
    getUserCard,
    createCard,
    deleteCard,
    updateCard,
    updateCardStatus
};
