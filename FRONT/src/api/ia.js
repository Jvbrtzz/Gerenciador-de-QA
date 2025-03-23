import http from "./api";

export async function iaText(userId, text) {
    try {
        const response = await http.post('/iaservice', { userId, text });
        return response.data.response;
    } catch (error) {
        console.error('Erro na chamada da IA:', error);
        throw error;
    }
}

export async function GetIaText(userId) {
    try {
        const response = await http.get(`/getiaresponse/${userId}`);        
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
}