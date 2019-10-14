import routerx from 'express-promise-router';
import EntryController from '../controllers/EntryController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.checkUserGrocer, EntryController.add);
router.get('/query', auth.checkUserGrocer, EntryController.query);
router.get('/list', auth.checkUserGrocer, EntryController.list);
router.get('/list/date', auth.checkUser, EntryController.listByDate);
router.put('/activate', auth.checkUserGrocer, EntryController.activate);
router.put('/deactivate', auth.checkUserGrocer, EntryController.deactivate);
router.get('/statistics', auth.checkUserGrocer, EntryController.statistics);

export default router;