import { loginUser } from "../models/userRepository.js";
import jwt from 'jsonwebtoken';
import { config } from "../config/env.js";

export const loginController = async (req, res) => {
  try {
    if (req.session.user) {
      return res.status(401).json({
        success: true,
        message: 'Ya estás autenticado'
      });
    }

    const { userNick, passWD } = req.body;

    if (!userNick || !passWD) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña son requeridos'
      });
    }
    
    const user = await loginUser(userNick, passWD);
    
    if (user.success === false) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const token = jwt.sign({ user }, config.JWT_SECRET, { expiresIn: '4h' });
    res.cookie('token', token, { 
      httpOnly: true,// La cookie solo se puede acceder desde el servidor
      sameSite: 'lax',
      path: '/',
      maxAge : 1000 * 60 * 60 * 4 // La cookie expirará en 4 horas
     }).json({user,token });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
    console.log('❌ Error al iniciar sesión:', error);
    
  }
  

}