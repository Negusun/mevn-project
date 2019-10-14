import routerx from 'express-promise-router';
import UserController from '../controllers/UserController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.checkUserAdmin, UserController.add);
router.get('/query', auth.checkUserAdmin, UserController.query);
router.get('/list', auth.checkUserAdmin, UserController.list);
router.put('/update', auth.checkUserAdmin, UserController.update);
router.delete('/remove', auth.checkUserAdmin, UserController.remove);
router.put('/activate', auth.checkUserAdmin, UserController.activate);
router.put('/deactivate', auth.checkUserAdmin, UserController.deactivate);
router.post('/login', UserController.login);

export default router;