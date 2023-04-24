const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const authenticationRouter = () => {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    const { email } = req.body;
    const { weeklyBudget } = req.body;

    if (!username || !password || !email) {
      res.status(401).json({
        success: false,
        message: `Missing required information.`,
      });
    }

    try {
      const user = await new User({
        username,
        password,
        email,
        weeklyBudget,
      }).save();
      console.error(`New user: ${user}`);
      const token = user.generateJWT();
      res.json({
        success: true,
        message: 'User saved successfully.',
        token: token,
        username: user.username,
      });
    } catch (err) {
      console.error(`Failed to save user: ${err}`);
      res.status(500).json({
        success: false,
        message: 'Error saving user to database.',
        error: err,
      });
    }
  });

  router.post('/login', async (req, res) => {
    const { username } = req.body;
    const { password } = req.body;

    if (!username || !password) {
      res
        .status(401)
        .json({ success: false, message: `No username or password supplied.` });
    }

    try {
      const user = await User.findOne({ username: username }).exec();
      if (!user) {
        console.error(`User not found.`);
        return res.status(401).json({
          success: false,
          message: 'User not found in database.',
        });
      }
      if (!user.validPassword(password)) {
        console.error(`Incorrect password.`);
        return res.status(401).json({
          success: false,
          message: 'Incorrect password.',
        });
      }
      console.log('User logged in successfully.');
      const token = user.generateJWT();
      res.json({
        success: true,
        message: 'User logged in successfully.',
        token: token,
        username: user.username,
      });
    } catch (err) {
      console.error(`Error looking up user: ${err}`);
      return res.status(500).json({
        success: false,
        message: 'Error looking up user in database.',
        error: err,
      });
    }
  });

  // a route to handle logging out requests to /auth/logout
  router.get('/logout', (req, res) => {
    // nothing really to do here... logging out with JWT authentication is handled entirely by the front-end by deleting the token from the browser's memory
    res.json({
      success: true,
      message:
        "There is actually nothing to do on the server side... you simply need to delete your token from the browser's local storage!",
    });
  });

  return router;
};

// export the router
module.exports = authenticationRouter;
