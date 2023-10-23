import { Router } from 'express';
import {getTasks, addTask, updateTask, deleteTask} from '../controllers/tasks';

const router : Router =  Router();

router.get('/tasks',getTasks );
router.post('/task/', addTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

export default router;

