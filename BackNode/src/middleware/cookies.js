import { config } from '../config/env.js';
import jwt from 'jsonwebtoken';

export const authSesion = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    req.session = {user: null};
    
    if (token) {
      const data = jwt.verify(token, config.JWT_SECRET);
      req.session.user = data;
    }
    next(); 

  } catch (error) {
    console.log('❌ Error en la Autentificacion:', error);
    next();
  }
}

export const auth = async (req, res, next) => {

if (req.session && req.session.user) {
    res.status(200).json({ isLoggedIn: true });
  } else {
    res.status(401).json({ isLoggedIn: false });
  }
}