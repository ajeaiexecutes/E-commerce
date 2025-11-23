import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { adminAuth } from "../Middleware/adminAuth.js";
import {userAuth} from '../Middleware/userAuth.js'
import *as usercontroller from '../Controllers/userController.js';
import *as auth from '../Controllers/auth.js'
import * as admincontroller from '../Controllers/adminController.js'
const router = express.Router();
import multer from "multer";
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req,file,cb)=> cb(null,uploadDir),
   filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname
    cb(null, name);
  },
}) 

const upload = multer({ storage });






router.post('/register', auth.register);
router.post('/login',  auth.userLogin);
router.post('/admin/login', auth.adminLogin);
router.delete('/logout',userAuth, auth.logout);


router.get('/products', usercontroller.getAllProducts);
router.get('/product/:id', usercontroller.getProductById);
router.get('/categories', usercontroller.getAllCategories);

// router.post('/login',  usercontroller.login);
// router.post('/admin/login', usercontroller.login);

///=====================Admin routes==================

router.post('/admin/products', adminAuth,upload.single("image"), admincontroller.addProducts);
router.get('/admin/products', adminAuth, admincontroller.getProducts);
router.get('/admin/products/:id', adminAuth, admincontroller.getProductById);
router.put('/admin/products/:id', adminAuth,upload.single("image"), admincontroller.updateProducts);
router.delete('/admin/products/:id',adminAuth,admincontroller.deleteProduct)

router.post('/admin/categories', adminAuth, admincontroller.createCategory);
router.get('/admin/categories', adminAuth, admincontroller.getCategories);
router.put('/admin/categories/:id', adminAuth, admincontroller.updateCategory);
router.delete('/admin/categories/:id', adminAuth, admincontroller.deleteCategory);

router.get('/admin/users',adminAuth,admincontroller.getUsers)
router.put('/admin/users/:id', adminAuth, admincontroller.updateUser)

router.get('/admin/orders', adminAuth, admincontroller.vieworders)
router.put('/admin/orders/:id',adminAuth,admincontroller.updateOrderStatus)







//======================User routes================

router.post('/cart', userAuth, usercontroller.addItemToCart);
router.get('/cart', userAuth, usercontroller.getUserCart);
router.put('/cart/:id', userAuth, usercontroller.updateCart);
router.delete('/cart/:id', userAuth, usercontroller.deleteCartItem);

router.post('/order', userAuth, usercontroller.createOrder);
router.get('/orders', userAuth, usercontroller.getUserOrders);
router.delete('/order',userAuth,usercontroller.cancelOrder)
export default router;
