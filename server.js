const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000; // Pode ser o número de porta desejado
app.use(express.static('public'));

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost', // host do MySQL
    user: 'root', // usuário do MySQL
    password: '1234', // senha do MySQL
    database: 'user' // nome do banco de dados
});

// Estabelecer conexão com o banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida!');
});

// Configurar o middleware para lidar com dados JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Rota para processar o envio do formulário e inserir dados no banco de dados
app.post('/registrar', async (req, res) => {
    const { nome, email, telefone, mensagem } = req.body;
    const insertQuery = 'INSERT INTO usuarios (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)';
/*
    connection.query(insertQuery, [nome, email, telefone, mensagem], async (err, result) => {
        try {
            res.send('Usuário registrado com sucesso!');
        } catch (err) {
            console.error('Erro ao inserir dados:', err);
            res.send('Erro ao registrar o usuário.');
            return;
        }
    });
*/
    connection.query(insertQuery, [nome, email, telefone, mensagem], (err, result) => {
        if (err) {
          console.error('Erro ao inserir dados:', err);
          res.send('Erro ao registrar o usuário.');
          return;
        }
        res.send('Usuário registrado com sucesso!');
      });
});

// Rota para servir a página HTML com o formulário
app.get('/', async (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
