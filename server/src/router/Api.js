import { Router } from 'express';
import schemaValidator from '../middleware/Validator';
import { listUsersController, addUserController } from '../controllers/User';

const router = Router();

router.get('/user', listUsersController);
router.post('/user', schemaValidator, addUserController);

export default router;
