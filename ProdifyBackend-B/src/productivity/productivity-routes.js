import { Router } from 'express';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import {
    getDashboard,
    getPendingTasks,
    getOverdueTasks,
    getSummaryPriorities,
    getStatisticsCompletion
} from './productivity-controller.js';

const router = Router();

router.use(validateJWT); 

router.get('/dashboard', getDashboard);
router.get('/tasks/pending', getPendingTasks);
router.get('/tasks/overdue', getOverdueTasks);
router.get('/summary/priorities', getSummaryPriorities);
router.get('/statistics/completion', getStatisticsCompletion);

export default router;
