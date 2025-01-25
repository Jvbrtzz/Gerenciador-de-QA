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
    console.log(userId);

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
        console.log(results)
        res.send(results); 
    });
}

function createShareCardStatus(req, res) {
    const { cardId, userId, permission } = req.body;
    console.log(cardId, userId, permission);

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

module.exports = {
    getShareUserCard,
    createShareCardStatus,
    getSharedCardsForUser
};
