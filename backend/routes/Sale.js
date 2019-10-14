import routerx from 'express-promise-router';
import SaleController from '../controllers/SaleController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.checkUserVendor, SaleController.add);
router.get('/query', auth.checkUserVendor, SaleController.query);
router.get('/list', auth.checkUserVendor, SaleController.list);
router.get('/list/date', auth.checkUser, SaleController.listByDate);
router.put('/activate', auth.checkUserVendor, SaleController.activate);
router.put('/deactivate', auth.checkUserVendor, SaleController.deactivate);
router.get('/statistics', auth.checkUserVendor, SaleController.statistics);

export default router;