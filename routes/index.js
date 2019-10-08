import routerx from 'express-promise-router';
import CategoryRouter from './Category';
import ArticleRouter from './Article';
import UserRouter from './User';

const router = routerx();

router.use('/category', CategoryRouter);
router.use('/article', ArticleRouter);
router.use('/user', UserRouter);

export default router;