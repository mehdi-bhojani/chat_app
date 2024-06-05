import express from "express";
import { loginUser,logOutUser,SignUpUser } from "../controllers/auth.controllers.js";
const router=express.Router();


router.post('/Signup',SignUpUser );
 
 router.post('/login',loginUser);
 router.post('/logout',logOutUser);

 export default router;