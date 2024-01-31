import express from 'express';
import {verifyJwt} from '../middlewares/validateUser.js'
import {createProduct,deleteProduct,getAllProducts,getProduct,updateProduct} from '../controller/product.controller.js'

const router = express.Router();


router.post('/create',verifyJwt, createProduct);
router.get('/',getAllProducts);
router.get('/:id',getProduct);
router.delete('/:id',verifyJwt, deleteProduct);
router.put('/:id',verifyJwt, updateProduct);


 
export default router;