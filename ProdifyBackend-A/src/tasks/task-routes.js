import { Router } from 'express';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
} from './task-controller.js';

const router = Router();

router.use(validateJWT); 

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/status', updateTaskStatus);

export default router;
