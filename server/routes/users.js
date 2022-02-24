import express from 'express';
import { signin, signup, getUser, updateUser, getUserImg } from '../controllers/user.js';


const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:id', getUser);
router.get('/img/:id', getUserImg);
router.patch('/:id', updateUser);


export default router;