const client = require('../db');

const User = {
  async getAllUsers() {
    return await client.query('SELECT * FROM users');
  },


async addUser(data) {
  const { username, email } = data;
  const result = await client.query(
    'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
    [username, email]
  );
  return result.rows[0];
},
};


module.exports = User;
