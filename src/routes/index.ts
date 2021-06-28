import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

//Get all users
router.get('/', UserController.getAll);
// Get one user
router.get('/:id([0-9]+)', UserController.getOne);
// Get one user
router.post('/', UserController.createOne);

export default router;
