
import express from "express";
import AuthRoutes from "./routes/auth.routes.js";
import MessageRoutes from "./routes/message.routes.js";
import UserRoutes from "./routes/user.routes.js";
import cors from "cors";
import connectToMongo from "./db/CoonectMongo.js";
import { env } from 'node:process';
import dotenv from "dotenv"
import path from "node:path";
import cookieParser from "cookie-parser";
import { app ,server} from "./socket/socket.js";
dotenv.config();

const __dirname = path.resolve();




app.use(cors({
    
        origin:"http://localhost:3000",
        credentials:true,
        methods:["GET","POST"]
       
    
}))



app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",AuthRoutes);
app.use("/api/messages",MessageRoutes);
app.use("/api/users",UserRoutes);


app.use(express.static(path.join(__dirname, "/FrontEnd/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "FrontEnd", "dist", "index.html"));
});
server.listen(env.port,()=> {
   
  
    connectToMongo();
    console.log("Server Running on port ",env.port);
    
});

