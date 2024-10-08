const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;
require('dotenv').config();



// Connecting to the database
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: String(process.env.PASSWORD),
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});


 client.connect();



 //// endpoint for getting users
 app.get('/users', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM users');
      res.json(result.rows); // Send the result as JSON
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });