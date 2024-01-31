import express from 'express';
import {verifyJwt} from '../middlewares/validateUser.js';
import {createCart,deleteCart,getCart,updateCart} from '../controller/cart.contoller.js';

const router = express.Router();


router.post('/create',verifyJwt,createCart);
router.get('/:id',verifyJwt,getCart);
router.put('/update',verifyJwt,updateCart);
router.delete('/:userId/:productId',verifyJwt,deleteCart);


export default router;  