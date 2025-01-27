const connection = require('../db/dbConnection');

function getShareUserCard(req, res) {
    const { cardId } = req.params;
    connection.query(`SELECT 
            u.id AS user_id,
            u.nome AS user_name,
            u.email AS user_email,
            cu.permission AS user_permission
        FROM 
            card_users cu
        JOIN 
            user u ON cu.user_id = u.id
        WHERE 
            cu.card_id = ? ; `, [cardId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.send(results);
    });
}

function getSharedCardsForUser(req, res) {
    const { userId } = req.params;

    connection.query(`
        SELECT 
            c.id AS id,
            c.title AS title,
            c.description AS description,
            c.status AS status
        FROM 
            card_users cu
        JOIN 
            cards c ON cu.card_id = c.id
        WHERE 
            cu.user_id = ?;
    `, [userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.send(results); 
    });
}

function createShareCardStatus(req, res) {
    const { cardId, userId, permission } = req.body;

    if (!cardId) {
        return res.status(400).send('Card ID is required.');
    }

    if (!userId) {
        return res.status(400).send('User ID is required.');
    }

    connection.query('INSERT INTO card_users (card_id, user_id, permission) VALUES (?, ?, ?)',[cardId, userId, permission],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).send('Error executing query.');
                }
                return res.send({
                    message: 'User associated with card successfully.',
                    cardUserId: results.insertId,
                });
            }
        );  
}

function deleteShareUser(req, res) {
    const { userId, cardId } = req.params;

    if (!userId || !cardId) {
        return res.status(400).json({ success: false, message: 'Parâmetros inválidos' });
    }

    connection.query(
        'DELETE FROM card_users WHERE user_id = ? AND card_id = ?',
        [userId, cardId],
        (err, results) => {
            if (err) {
                console.error('Erro ao executar a query:', err);
                return res.status(500).json({ success: false, message: 'Erro no servidor' });
            }

            if (results.affectedRows > 0) {
                return res.json({ success: true, message: 'Usuário removido com sucesso' });
            } else {
                return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
            }
        }
    );
}


module.exports = {
    getShareUserCard,
    createShareCardStatus,
    getSharedCardsForUser,
    deleteShareUser
};
