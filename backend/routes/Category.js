import routerx from 'express-promise-router';
import CategoryController from '../controllers/CategoryController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.checkUserGrocer, CategoryController.add);
router.get('/query', auth.checkUserGrocer, CategoryController.query);
router.get('/list', auth.checkUserGrocer, CategoryController.list);
router.put('/update', auth.checkUserGrocer, CategoryController.update);
router.delete('/remove', auth.checkUserGrocer, CategoryController.remove);
router.put('/activate', auth.checkUserGrocer, CategoryController.activate);
router.put('/deactivate', auth.checkUserGrocer, CategoryController.deactivate);

export default router;