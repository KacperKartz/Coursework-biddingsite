const User = require('../models/User');

const userController = {
  async getUsers(req, res) {
    try {
      const result = await User.getAllUsers();
      res.json(result.rows);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }, 

  async addUser(req, res) {
    const { username, email } = req.body;

    try {
      const newUser = await User.addUser({ username, email });
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
};
module.exports = userController;
