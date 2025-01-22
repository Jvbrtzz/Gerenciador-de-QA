const connection = require('../db/dbConnection');

function getUserCard(req, res) {
    const { id } = req.params;

    connection.query('SELECT id, title, description, status FROM `cards` WHERE user_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }

        res.send(results);
    });
}



function createCard(req, res) {
    const { user_id, title, description, status } = req.body;
    console.log(user_id, title, description, status);

    const query = 'INSERT INTO `cards` (title, description, status, user_id) VALUES (?, ?, ?, ?)';
    const values = [title, description, status, user_id];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }

        res.send(results);
    });
}

function deleteCard(req, res) {
    const { cardId } = req.params;
    if (!cardId) {
        res.status(400).send('Card ID is required.');
        return;
    }

    const query = 'DELETE FROM `cards` WHERE id = ?';
    const values = [cardId];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send('Card not found.');
            return;
        }

        res.send({ message: 'Card deleted successfully.' });
    });
}

function updateCardStatus(req, res) {
    const { cardId } = req.params;
    const { status } = req.body;

    if (!cardId) {
        res.status(400).send('Card ID is required.');
        return;
    }
    
    if (!status) {
        res.status(400).send('Card Status is required.');
        return;
    }

    connection.query('UPDATE `cards` SET status = ? WHERE id = ?', [status ,cardId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send('Card not found.');
            return;
        }

        res.send({ message: 'Card updated successfully.' });
    });
}

function updateCard(req, res) {
    const { cardId } = req.params;
    const { title, description, status } = req.body;

    if (!cardId) {
        res.status(400).send('Card ID is required.');
        return;
    }
    
    if (!status) {
        res.status(400).send('Card Status is required.');
        return;
    }

    connection.query('UPDATE `cards` SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status ,cardId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send('Card not found.');
            return;
        }

        res.send({ message: 'Card updated successfully.' });
    });
}

function getCommentsByCard(req, res) {
    const { cardId } = req.params;

    connection.query(`
        SELECT 
            cm.id,
            cm.comment,
            cm.updated_at AS coment_update,
            cm.edited AS edited,
            cm.created_at AS comment_date,
            u.nome AS commenter_name
        FROM 
            comments cm
        JOIN 
            user u ON cm.user_id = u.id
        WHERE 
            cm.card_id = ?; -- Filtra os comentários de um card específico`, [cardId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.send(results);
    });
}

function postCommentsByCard(req, res) {
    const { cardId } = req.params;
    const { user_id, comment } = req.body;
    
    connection.query(`INSERT INTO comments (card_id, user_id, comment, created_at) VALUES (?, ?, ?, NOW()) `, [cardId, user_id, comment], (err, results) => {
        if (err) {
            console.error('Error inserting comment:', err);
            res.status(500).send('Erro ao inserir o comentário.');
            return;
        }
        
        res.status(201).json({
            success: true,
            message: 'Comentário adicionado com sucesso!',
            commentId: results.insertId 
        });
    });
}

function updateComment(req, res) {
    const { commentId } = req.params;
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
        return res.status(400).send("O campo 'comment' é obrigatório.");
    }


    connection.query(`UPDATE comments SET comment = ?, updated_at = NOW(), edited = TRUE WHERE id = ?`, [comment, commentId], (err, results) => {
        if (err) {
            console.error('Error updating comment:', err);
            res.status(500).send('Erro ao atualizar o comentário.');
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Comentário não encontrado.');
        }

        res.status(200).json({
            success: true,
            message: 'Comentário atualizado com sucesso!'
        });
    });
}

module.exports = {
    getUserCard,
    createCard,
    deleteCard,
    updateCard,
    updateCardStatus,
    getCommentsByCard,
    postCommentsByCard,
    updateComment
};
