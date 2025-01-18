const connection = require('../db/dbConnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

function getUsers(req, res) {
    connection.query('SELECT nome, email FROM `user`', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }

        res.send(results);
    });
}

async function userLogin(req, res) {
    const { nome, senha } = req.body;

    connection.query('SELECT * FROM `user` WHERE nome = ?', [nome], async (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Error executing query');
        }

        if (results.length > 0) {
            const user = results[0];
            const isPasswordValid = await bcrypt.compare(senha, user.senha);

            if (isPasswordValid) {
                const accessToken = jwt.sign( { user_id: user.id, username: user.nome }, 'access-token', { expiresIn: '360h' }
                );

                return res.json({
                    success: true,
                    message: 'Login successful',
                    user,
                    accessToken,
                });
            }
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
    });
}



async function createUser(req, res) {
    const { nome, email, senha } = req.body;
    if (!senha) {
        return res.status(400).json({ error: "Senha é obrigatória" });
    }

    try {
        const hashSenha = await bcrypt.hash(senha, 10);
        
        connection.query('INSERT INTO `user` (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashSenha], (err, results) => {
            if (err) {
                console.error('Erro ao registrar usuário:', err);
                return res.status(500).send('Erro ao registrar usuário');
            }

            res.json({ success: true, message: 'User created successfully' });
        });
    } catch (err) {
        console.error('Erro ao gerar hash da senha:', err);
        res.status(500).send('Erro ao gerar hash da senha');
    }
}
function getUserById(req, res) {
    const { id } = req.params;
    connection.query('SELECT nome, email FROM `user` WHERE id=(?)',[id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }

        res.send(results);
    });
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    userLogin
}