const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// database
const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const databasename = process.env.MYSQL_DATABASE;
const pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: databasename
});

// express app
const app = express();
app.use(cors())
app.use(bodyParser.json())

// route
app.get('/books/all', function(request, response) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error(error);
            response.status(400).send(new Error(error));
        } else {
            connection.query('SELECT * from BOOKS', (error, data) => {
                connection.release();
                if(error) {
                    console.error(error);
                    response.status(400).send(new Error(error));
                } else {
                    response.json({
                        status: 200,
                        data,
                        message: "Books list retrieved successfully"
                    });
                }
            });
        }
    });
});

// start
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});