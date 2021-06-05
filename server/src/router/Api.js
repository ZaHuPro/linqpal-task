import { Router } from 'express';
import schemaValidator from '../middleware/Validator';
import { shouldBeLoggedIn, shouldHaveAppSecret } from '../middleware/Authentication';
import { listUsersController, addUserController } from '../controllers/User';
import authController from '../controllers/Auth';

const router = Router();
router.use(shouldHaveAppSecret);

router.post('/login', authController);
router.get('/user', shouldBeLoggedIn, listUsersController);
router.post('/user', schemaValidator, addUserController);

export default router;
