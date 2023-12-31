const AuthService = require('../services/AuthService');
const { StatusCodes } = require('http-status-codes');
const { validateLogin, validateRegister } = require('../validate/AuthValidator');

const AuthController = {
  async register(req, res) {
    try {
      const {name,email,password} = req.body;
      const { error } = validateRegister({name,email,password});
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
        return;
      }

      const user = await AuthService.register({name,email,password});
      res.status(StatusCodes.CREATED).json({ message: 'Registered successfully', user });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message});
    }
  },

  async login(req, res) {
    try {
      const {email,password} = req.body;
      const { error } = validateLogin({email,password});
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
        return;
      }

      const token = await AuthService.login(email, password);
     
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
  async verifyEmail(req, res){
    const success = await AuthService.verifyEmail(req.token);
    if(!success){
      res.status(StatusCodes.NOT_FOUND).json({message:"Wrong link or expired link or verified"});
      return;
    }

    res.status(StatusCodes.OK).json({message:"Your email verified"});
  }
};

module.exports = AuthController;