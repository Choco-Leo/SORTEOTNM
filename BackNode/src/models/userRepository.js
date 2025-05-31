import  pool  from '../config/db.js';
import bcrypt from 'bcrypt';
import {config} from '../config/env.js';

export const createUser = async (userNick, passWD) => {
  try {
    //Validaciones
    const VAL = new Validacion();
    VAL.Val_CreateUserNick(userNick);

    //Seguridad con bcrypt
    const saltRounds = config.SALT;
    const saltRoundsINT = parseInt(saltRounds);
    const hashedPassword = await bcrypt.hash(passWD, saltRoundsINT);

    const query = 'INSERT INTO loginST (userNick, passWD) VALUES ($1, $2) RETURNING *';
    const values = [userNick, hashedPassword];
    const result = await pool.query(query, values);
    
    delete result.rows[0].passwd;
    delete result.rows[0].id;
    return result.rows[0];
  
  }catch (error) {
    console.log('❌ Error Al Regisrar Usuario:', error);
  }
}
export const loginUser = async (userNick,passWD) => {
  try {

    const query = 'SELECT * FROM loginST WHERE userNick = $1';
    const values = [userNick];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {

      return {
        success: false,
        message: 'Usuario no encontrado'
      };
    }

    const storedHash = result.rows[0].passwd;// Obtener contraseña almacenada del usuario
    const isMatch = await bcrypt.compare(passWD, storedHash);// Comparar contraseñas
    
    if (!isMatch) {
      return {
        success: false,
        message: 'Contraseña Incorrecta'
      };
    }else{
      return {
        success: true,
        message: 'Inicio de Sesion Exitoso',
        data: result.rows[0]
      };
    }
    
  }catch (error) {
    console.log('❌ Error Al Iniciar Sesion:', error);
    return {
      success: false,
      message: 'Error al iniciar sesión'
    };
  }
}

class Validacion {
    async Val_CreateUserNick(userNick) {
        //Validar Longitud
        if (userNick.length < 6) {
          console.log('El usuario debe tener almenos 6 caracteres');
          return;
        }
        //Validar que no tenga espacios
        if (userNick.includes(' ')) {
          console.log('El usuario no puede tener espacios');
            return;
        }
        //Validar que no exista el usuario
        const query = 'SELECT * FROM loginST WHERE userNick = $1';
        const values = [userNick];
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
          console.log('El usuario ya existe');
          return;
        } 
    }
}

export default Validacion;