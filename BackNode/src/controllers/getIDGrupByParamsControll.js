import { getIDGrupoByParams } from '../models/grupRepository.js';
import { authSesion } from "../middleware/cookies.js";

export const getIDGrupByParamsController = [authSesion, async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Debe iniciar sesión'
      });
    }

    const filtros = {
      deport_select: req.body.deport_select,
      grupo_Select: req.body.grupo_select,
      it_Part: req.body.it_Part
    };

    const result = await getIDGrupoByParams(filtros);
    res.json(result);
    
  } catch (error) {
    console.log('❌ Error Al Obtener IDs Por Filtro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}];