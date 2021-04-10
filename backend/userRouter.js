let userRouter = require('express').Router();

var userController = require('./userController');

userRouter.route('/register-admin').post(userController.add);
userRouter.route('/login').post(userController.login);

module.exports = userRouter;
