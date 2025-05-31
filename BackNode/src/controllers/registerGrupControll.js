import { createGrupo } from "../models/grupRepository.js"; 
import { authSesion } from "../middleware/cookies.js";

export const createGrupoController = [authSesion, async (req, res) => {
    try {
        if (!req.session.user) {
            
            return res.status(401).json({
                success: false,
                message: 'No autorizado - Debe iniciar sesión'

            });
        }
        
        const { it_Part, deport_select, grupo_Select } = req.body;
        const newGrupo = await createGrupo(it_Part, deport_select, grupo_Select);
        
        if (!newGrupo) {
            return res.status(400).json({
                success: false,
                message: 'Error al crear el grupo'
            });
        }

        res.json({
            success: true,
            message: 'Grupo creado exitosamente',
            data: newGrupo
        });
  
    } catch (error) {
        console.log('❌ Error Al Registrar Grupo:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
}];