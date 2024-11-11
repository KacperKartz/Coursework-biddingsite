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

  async getUserId(req, res) {
    const { username } = req.params;
  
    try {
      const result = await User.getUserId(username);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }


      const userId = result.rows[0].id;
      res.status(200).json({ userId });
    } catch (err) {
      console.error('Error fetching user ID:', err);
      res.status(500).send('Server Error');
    }
  },  
  async getUserIdEmail(req, res) {
    const { email } = req.params;
  
    try {
      const result = await User.getUserIdEmail(email);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }


      const userId = result.rows[0].id;
      res.status(200).json({ userId });
    } catch (err) {
      console.error('Error fetching user ID:', err);
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
