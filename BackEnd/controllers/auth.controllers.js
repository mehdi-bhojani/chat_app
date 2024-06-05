import { error } from "console";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import GenTokenAndSetCookie from "../utils/generateTokens.js"

export const SignUpUser= async (req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender}=req.body;
  
if(password!=confirmPassword){
    return res.status(400).json({error:"Password and confirm password do not match"});
}

const user=await User.findOne({username});

// if(user){
//     return res.status(400).json({error:"userName already exists."});
// }

const salt=await bcrypt.genSalt(10);
const HASHEDPass=await bcrypt.hash(password,salt);

const BoyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`;

const GirlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`;

const newUser=new User({
    fullName,username,password:HASHEDPass,confirmPassword,gender,
    profilePic :gender==="male"?BoyProfilePic:GirlProfilePic
})


if(newUser){
     GenTokenAndSetCookie(newUser._id,res);
    await newUser.save();

       
res.status(201).json({
    _id:newUser._id,
    fullName:newUser.fullName,
    username:newUser.username,
    profilePic:newUser.profilePic
})
}else{
    res.status(400).json({error:"Invalid User data"});
}
   


    } catch (error) {
        console.log("Error in sidgnup controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
   
};

export const loginUser= async(req,res)=>{
   try {
    const {username,password}=req.body;

    const user= await User.findOne({username});
    const isPasswordCorrect =await bcrypt.compare(password,user?.password || "");

  if(!user || !isPasswordCorrect){
    return res.status(400).json({error:"Invalid  username or password"});
  }


  GenTokenAndSetCookie(user._id,res);


 
res.status(200).json({
    _id:user._id,
    fullName:user.fullName,
    username:user.username,
    profilePic:user.profilePic,
});



   } catch (error) {
    console.log("Error in signujp  controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
   }
}

export const logOutUser= async(req,res)=>{
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out successfully"});
  } catch (error) {
    console.log("Error in signujp  controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
  }
}

