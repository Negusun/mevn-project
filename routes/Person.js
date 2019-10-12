import routerx from 'express-promise-router';
import PersonController from '../controllers/PersonController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.checkUser, PersonController.add);
router.get('/query', auth.checkUser, PersonController.query);
router.get('/list', auth.checkUser, PersonController.list);
router.get('/list/clients', auth.checkUser, PersonController.listClients);
router.get('/list/providers', auth.checkUser, PersonController.listProviders);
router.put('/update', auth.checkUser, PersonController.update);
router.delete('/remove', auth.checkUser, PersonController.remove);
router.put('/activate', auth.checkUser, PersonController.activate);
router.put('/deactivate', auth.checkUser, PersonController.deactivate);

export default router;