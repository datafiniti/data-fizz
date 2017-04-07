import express from 'express'
import controller from '../controllers/users.server.controller'

let users = controller();
let router = express.Router();

router.post("/", users.create);
router.post('/authenticate', users.authenticate);
router.post('/changePassword/:userName', users.changePassword);

export default router