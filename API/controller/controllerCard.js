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

module.exports = {
    getUserCard,
    createCard,
    deleteCard,
    updateCard,
    updateCardStatus
};
