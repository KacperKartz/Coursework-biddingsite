const client = require('../db');

const User = {
  async getAllUsers() {
    return await client.query('SELECT * FROM users');
  },

  async getUserId(username) {
    return client.query("SELECT id FROM users WHERE username = $1", [username]);
  },
  async getUserIdEmail(username) {
    return client.query("SELECT id FROM users WHERE email = $1", [username]);
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
