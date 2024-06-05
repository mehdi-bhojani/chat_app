import jwt from "jsonwebtoken";
import { env } from 'node:process';
const GenTokenAndSetCookie =(userid,res)=>{
    const token =jwt.sign({userid},env.JWT_SECRET,{
      expiresIn:'30d'
    });

    res.cookie('jwt',token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite: 'None',
        secure: true 
       
    });
     
  
};

export default  GenTokenAndSetCookie;