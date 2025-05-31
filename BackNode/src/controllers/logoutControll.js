import { authSesion } from "../middleware/cookies.js";

export const logoutController = [authSesion,async (req, res) => {
  console.log('Intentando borrar la cookie');
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Debe iniciar sesión'
      });
    }
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    });
    console.log('Set-Cookie enviado');
    res.json({
      success: true,
      message: 'Logout successful'
    });
  }catch (error) {
    console.log('❌ Error al cerrar sesión:', error);
  }
}];