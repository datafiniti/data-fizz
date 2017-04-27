import express from 'express';
import authController from '../controllers/auth.server.controller';
import userController from '../controllers/users.server.controller';

const auth = authController();
const users = userController();
const router = express.Router();

router.post("/", auth.create);
router.post('/authenticate', auth.authenticate);
router.post('/logout/:userId', auth.logout);
router.post('/forgotPassword/:email', auth.forgot);
router.post('/reset', auth.reset);

router.post('/changePassword/:email', users.changePassword);
router.post('/editUser/:email', users.editUser);
router.post('/notifications/:userId', users.notifications);
router.post('/meFromToken/:token', users.meFromToken);

export default router