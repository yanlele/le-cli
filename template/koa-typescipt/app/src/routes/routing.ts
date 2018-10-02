import * as Router from 'koa-router';
const router:Router = new Router();

import {userRouter} from './index';

router.use('/api', userRouter.routes(), userRouter.allowedMethods());

export default router;