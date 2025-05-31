import { createUser } from "../models/userRepository.js";

export const createUserService = async (req, res) => {
    try {
        const { userNick, passWD } = req.body;
        const result = await createUser(userNick, passWD);
        
        if (!result) {
            return res.status(400).json({
                success: false,
                message: 'Error al crear el usuario'
            });
        }

        res.json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: result
        });
    } catch (error) {
        console.log('❌ Error Al Registrar Usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
}