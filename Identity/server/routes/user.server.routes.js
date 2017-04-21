import express from 'express'
import controller from '../controllers/users.server.controller'

let users = controller();
let router = express.Router();

router.post("/", users.create);
router.post('/authenticate', users.authenticate);
router.post('/logout/:userId', users.logout);
router.post('/changePassword/:email', users.changePassword);
router.post('/changeEmail/:email', users.changeEmail);
router.post('/meFromToken/:token', users.meFromToken);

export default router