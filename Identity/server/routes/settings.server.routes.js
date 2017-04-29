import express from 'express';
import controller from '../controllers/settings.server.controller';
import { ensureAuthorized } from '../helpers/auth';

const router = express.Router();
const settings = controller();

router.get('/user', ensureAuthorized, settings.get);
router.post('/user', ensureAuthorized, settings.update);

module.exports = router;