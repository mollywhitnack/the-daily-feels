import { Router } from 'express';
const router = Router();

import articles from './articles';

router.use('/articles', articles);

export default router;
