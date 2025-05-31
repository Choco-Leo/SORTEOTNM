import { Router } from "express";
//Session y Usuarios
import { createUserService } from "../controllers/registerControll.js";
import { loginController } from "../controllers/loginControll.js";
import { logoutController } from "../controllers/logoutControll.js";
import { auth } from "../middleware/cookies.js";
//Grupos
import { createGrupoController } from "../controllers/registerGrupControll.js";
import { getFiltroController} from "../controllers/dashControll.js"
import { editGrupController } from "../controllers/editGrupControll.js";
import { deleteGrupController } from "../controllers/deleteGrupControll.js";
import { getFiltroResult } from "../controllers/resultControll.js";
import { getIDGrupByParamsController } from "../controllers/getIDGrupByParamsControll.js";

const router = Router();                            
//RUTAS LOGICA 
//------------------------------
// Ruta de login
router.post('/',getFiltroController);
router.post('/loginST',loginController);
router.post('/logoutST',logoutController);
router.post('/registerST',createUserService);//temp

// Combinar rutas de Muestra, edición y eliminación
router.post('/registerGrupoST',createGrupoController);
router.route('/edit-GruposST')
  .put(editGrupController)
  .post(getIDGrupByParamsController);
router.delete('/edit-GruposST/:id',deleteGrupController)
  
router.post('/resultadosST',getFiltroResult);
//------------------------------
//Ruta de Validacion de token
router.get('/checkSession', (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ isLoggedIn: true });
  } else {
    res.status(401).json({ isLoggedIn: false });
  }
});

export default router;