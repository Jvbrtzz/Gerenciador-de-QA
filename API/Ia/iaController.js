const connection = require('../db/dbConnection');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function saveMessage(userId, sender, message) {
    const query = 'INSERT INTO chat_messages (user_id, sender, message) VALUES (?, ?, ?)';
    const values = [userId, sender, message];

    try {
        await connection.query(query, values);
    } catch (error) {
        console.error('Erro ao salvar mensagem:', error);
    }
}

function getMessages(req, res) {
    const { user_id } = req.params;
    
    connection.query(
        'SELECT sender, message FROM chat_messages WHERE user_id = ? ORDER BY created_at ASC',
        [user_id],
        (err, result) => {
            if (err) {
                console.error('Erro ao buscar mensagens:', err);
                return res.status(500).json({ error: 'Erro ao buscar mensagens' });
            }

            // Verifique se result é um array
            if (!Array.isArray(result)) {
                console.error('Esperado um array de mensagens');
                return res.status(500).json({ error: 'Esperado um array de mensagens' });
            }

            // Enviar as mensagens para a resposta
            res.json(result);
        }
    );
}

async function callIa(req, res) {
    const { userId, text } = req.body;

    if (!text) return res.status(400).json({ error: 'Texto não enviado' });

    try {
        // Salva a mensagem do usuário no banco
        await saveMessage(userId, 'user', text);

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: process.env.MODEL,
            systemInstruction: "Você é um especialista em flashcards e organização, seja breve, atencioso e objetivo, respeitando a norma UTF-8 na resposta, sem emojis.",
        });

        const result = await model.generateContent(text);
        const output = await result.response.text();

        // Salva a resposta da IA no banco
         await saveMessage(userId, 'ia', output);

        res.json({ response: output });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao gerar resposta da IA' });
    }
}

module.exports = {
    callIa,
    getMessages,
};
