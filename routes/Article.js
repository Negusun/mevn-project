import routerx from 'express-promise-router';
import ArticleController from '../controllers/ArticleController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.checkUserGrocer, ArticleController.add);
router.get('/query', auth.checkUserGrocer, ArticleController.query);
router.get('/list', auth.checkUserGrocer, ArticleController.list);
router.put('/update', auth.checkUserGrocer, ArticleController.update);
router.delete('/remove', auth.checkUserGrocer, ArticleController.remove);
router.put('/activate', auth.checkUserGrocer, ArticleController.activate);
router.put('/deactivate', auth.checkUserGrocer, ArticleController.deactivate);

export default router;