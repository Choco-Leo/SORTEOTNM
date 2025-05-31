import pool from '../config/db.js';


export const createGrupo = async (it_Part, deport_select, grupo_Select) => {
  try {
    const query = 'INSERT INTO gruposST (it_Part, deport_Select, grupo_Select) VALUES ($1, $2, $3) RETURNING *';
    const values = [it_Part, deport_select, grupo_Select];
    const result = await pool.query(query, values);
    return result.rows[0];

  } catch (error) {
    console.log('❌ Error Al Registrar Grupo:', error);
    return {
      success: false,
      message: 'Error al obtener los grupos'
    };
  }
}

export const getFiltroMultiple = async (filtros) => {
  try {
    let query = `
      SELECT 
        deport_Select,
        grupo_Select,
        array_agg(it_Part) as institutos,
        array_agg(id) as ids
      FROM gruposST 
      WHERE 1=1`;
    const values = [];
    let paramCount = 1;

    if (filtros.deport_select) {
      query += ` AND UPPER(deport_Select) = $${paramCount}`;
      values.push(filtros.deport_select);
      paramCount++;
    }

    if (filtros.grupo_Select) {
      query += ` AND UPPER(grupo_Select) = $${paramCount}`;
      values.push(filtros.grupo_Select);
      paramCount++;
    }

    if (filtros.it_Part) {
      query += ` AND UPPER(it_Part) = $${paramCount}`;
      values.push(filtros.it_Part);
      paramCount++;
    }

    query += ` GROUP BY deport_Select, grupo_Select ORDER BY deport_Select, grupo_Select`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return {
        success: true,
        message: 'No se encontraron registros con los filtros proporcionados',
        data: {}
      };
    }

    // Organizar los resultados por deporte
    const deportesAgrupados = {};
    result.rows.forEach(row => {
      if (!deportesAgrupados[row.deport_select]) {
        deportesAgrupados[row.deport_select] = {};
      }
      deportesAgrupados[row.deport_select][row.grupo_select] = row.institutos;
    });

    return {
      success: true,
      data: deportesAgrupados
    };
    
  } catch (error) {
    console.log('❌ Error Al Obtener Filtros:', error);
    return {
      success: false,
      message: 'Error al obtener los grupos'
    };
  }
}

export const updateGrupo = async (id, deport_select, grupo_Select, it_Part) => {
  try {
    // Validar que el ID exista
    if (!id) {
      return {
        success: false,
        message: 'El ID es requerido para la actualización'
      };
    }

    let query = 'UPDATE gruposST SET';
    const values = [];
    let paramCount = 1;
    let updates = [];

    if (deport_select) {
      updates.push(` deport_select = $${paramCount}`);
      values.push(deport_select);
      paramCount++;
    }

    if (grupo_Select) {
      updates.push(` grupo_Select = $${paramCount}`);
      values.push(grupo_Select);
      paramCount++;
    }

    if (it_Part) {
      updates.push(` it_Part = $${paramCount}`);
      values.push(it_Part);
      paramCount++;
    }

    if (updates.length === 0) {
      return {
        success: false,
        message: 'Debe proporcionar al menos un campo para actualizar'
      };
    }

    query += updates.join(',');
    query += ` WHERE id = $${paramCount} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'No se encontró el grupo para actualizar'
      };
    }

    return {
      success: true,
      message: 'Grupo actualizado exitosamente',
      data: result.rows[0]
    };
    
  } catch (error) {
    console.log('❌ Error Al Actualizar Grupo:', error);
    return {
      success: false,
      message: 'Error al editar los grupos'
    };
  }
}

export const deleteGrupo = async (id) => {
  try {
    // Validar que el ID exista
    if (!id) {
      return {
        success: false,
        message: 'El ID es requerido para eliminar'
      };
    }
    //Validar que el ID tenga el formato correcto
    if (!/^[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}$/i.test(id)) {
      return {
        success: false,
        message: 'Formato de ID inválido'
      };
    }

    const query = 'DELETE FROM gruposST WHERE id = $1 RETURNING *';
    const values = [id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'No se encontró el grupo con el ID proporcionado'
      };
    }

    return {
      success: true,
      message: 'Grupo eliminado exitosamente',
      data: result.rows[0]
    };
    
  } catch (error) {
    console.log('❌ Error Al Eliminar Grupo:', error);
    return {
      success: false,
      message: 'Error al eliminar el grupo'
    };
  }
}

export const getAllDeportesByGrupo = async () => {
  try {
    const query = `
      SELECT 
        deport_select,
        grupo_Select,
        array_agg(it_Part) as institutos,
        array_agg(id) as ids
      FROM gruposST 
      GROUP BY deport_select, grupo_Select
      ORDER BY deport_select, grupo_Select`;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return {
        success: true,
        message: 'No hay grupos registrados',
        data: []
      };
    }

    // Organizar los resultados por deporte
    const deportesAgrupados = {};
    result.rows.forEach(row => {
      if (!deportesAgrupados[row.deport_select]) {
        deportesAgrupados[row.deport_select] = {};
      }
      deportesAgrupados[row.deport_select][row.grupo_select] = row.institutos;
    });

    return {
      success: true,
      data: deportesAgrupados
    };
    
  } catch (error) {
    console.log('❌ Error Al Obtener Grupos:', error);
    return {
      success: false,
      message: 'Error al obtener los grupos'
    };
  }
}

export const getIDGrupoByParams = async (filtros) => {
  try {
    let query = `
      SELECT 
        deport_select,
        grupo_Select,
        json_agg(json_build_object(id, it_Part)) as id_institutos
      FROM gruposST 
      WHERE 1=1`;
    const values = [];
    let paramCount = 1;

    if (filtros.deport_select) {
      query += ` AND UPPER(deport_Select) = $${paramCount}`;
      values.push(filtros.deport_select);
      paramCount++;
    }

    if (filtros.grupo_Select) {
      query += ` AND UPPER(grupo_Select) = $${paramCount}`;
      values.push(filtros.grupo_Select);
      paramCount++;
    }

    if (filtros.it_Part) {
      query += ` AND UPPER(it_Part) = $${paramCount}`;
      values.push(filtros.it_Part);
      paramCount++;
    }

    query += ` GROUP BY deport_select, grupo_Select ORDER BY deport_select, grupo_Select`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return {
        success: true,
        message: 'No se encontraron IDs con los filtros proporcionados',
        data: {}
      };
    }

    // Organizar los resultados por deporte
    const deportesAgrupados = {};
    result.rows.forEach(row => {
      if (!deportesAgrupados[row.deport_select]) {
        deportesAgrupados[row.deport_select] = {};
      }
      deportesAgrupados[row.deport_select][row.grupo_select] = {
        ids: row.id_institutos
      };
    });

    return {
      success: true,
      data: deportesAgrupados
    };
    
  } catch (error) {
    console.log('❌ Error Al Obtener IDs Por Filtro:', error);
    return {
      success: false,
      message: 'Error al obtener los IDs de los grupos por filtro'
    };
  }
}
