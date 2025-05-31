import { deleteGrupo } from '../models/grupRepository.js';
import { authSesion } from "../middleware/cookies.js";

export const deleteGrupController = [authSesion, async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Debe iniciar sesión'
      });
    }

    const id = req.params.id;

    // Validar que tengamos el ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'El ID es requerido para eliminar'
      });
    }

    const result = await deleteGrupo(id);
    res.json(result);
  
  } catch (error) {
    console.log('❌ Error al eliminar el grupo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}];