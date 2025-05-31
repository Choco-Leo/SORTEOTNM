import { updateGrupo } from '../models/grupRepository.js';
import { authSesion } from "../middleware/cookies.js";

export const editGrupController = [authSesion, async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Debe iniciar sesión'
      });
    }
    

    // Extraer directamente los valores del body
    const { deport_select, grupo_Select, it_Part, id } = req.body;

    // Validar que tengamos el ID como identificador principal
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'El ID es requerido para actualizar'
      });
    }

    // Validar que haya al menos un campo para actualizar
    if (!deport_select && !grupo_Select && !it_Part) {
      return res.status(400).json({
        success: false,
        message: 'Debe proporcionar al menos un campo para actualizar'
      });
    }

    // Llamar a la función de actualización con ID
    const result = await updateGrupo(id, deport_select, grupo_Select, it_Part);
    res.json(result);
  
  } catch (error) {
    console.log('❌ Error al editar el grupo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}];