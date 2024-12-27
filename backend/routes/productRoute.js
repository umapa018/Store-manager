import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productcontroller.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1}]),addProduct);
productRouter.post('/single',singleProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.get('/list',listProducts);

export default productRouter
