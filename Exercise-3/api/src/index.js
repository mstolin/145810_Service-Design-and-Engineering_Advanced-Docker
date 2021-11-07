const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// database
const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const databasename = process.env.MYSQL_DATABASE;
const pool = mysql.createPoolPromise({
    host: host,
    user: user,
    password: password,
    database: databasename
});

// express app
const app = express();
app.use(cors())
app.use(bodyParser.json())

function executeQuery(query) {
    return pool.getConnection()
        .then(conn => {
            const data = conn.query(query);
            conn.release();
            return data;
        });
}

// routes
app.get('/books/all', function(_, response) {
    let query = 'SELECT * from Books';
    executeQuery(query).then(data => {
        response.status(200).json(data[0])
    }).catch(error => {
        response.status(400).send({'error': error});
    });
});
/*app.get('/books/:bookId', function(request, response) {
    let bookId = request.params.bookId;
    let query = `SELECT * from Books WHERE id = ${bookId}`;
    executeQuery(query).then(data => {
        response.status(200).json(data[0])
    }).catch(error => {
        response.status(400).send({'error': error});
    });
});*/

// start
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});