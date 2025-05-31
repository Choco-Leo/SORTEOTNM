import { getFiltroMultiple, getAllDeportesByGrupo } from '../models/grupRepository.js';
import { authSesion } from "../middleware/cookies.js";

export const getFiltroResult = [authSesion, async (req, res) => {
  try {
      if (!req.session.user) {
        return res.status(401).json({
          success: false,
          message: 'No autorizado - Debe iniciar sesión'
        });
      }

    const filtros = {
      deport_select: req.body.deport_select?.toUpperCase() || req.body.deport_Select?.toUpperCase(),
      grupo_Select: req.body.grupo_select?.toUpperCase() || req.body.grupo_Select?.toUpperCase(),
      it_Part: req.body.it_Part?.toUpperCase() || req.body.it_part?.toUpperCase()
    };

    let result;

    // Verificar si al menos un filtro está presente
    if (!filtros.deport_select && !filtros.grupo_Select && !filtros.it_Part) {
      result = await getAllDeportesByGrupo();
    } else {
      result = await getFiltroMultiple(filtros);
    }

    res.json(result);
  
  } catch (error) {
    console.log('❌ Error Al Obtener Grupos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}];