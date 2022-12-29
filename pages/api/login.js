import connectMongo from "../../mongoDB/connDB"
import Users from "../../model/userSchema";
import { compare } from "bcryptjs";


export default async function handler(req, res){

    connectMongo().catch(err=>res.json({error:"Connection Failed"}))
    res.setHeader("Content-Type", "application/json");
    // only post method is accepted
    if(req.method==="POST"){


        if(!req.body){
            
            return res.status(404).json({
                error : "Dont have form data"
            })
        }

        const {username, password} = req.body;

        //check existing user
         const checkedExisting = await Users.findOne({username});
        if(!checkedExisting){
          return res.status(400).json({
            message:"Invalid login"
          })
        }
        const checkPassword = await compare(password, checkedExisting.password)
        // incorrect password
        if(!checkPassword){
            return res.status(400).json({
                message : "Username or password doesnot match"
            })
        }

        return res.status(200).json({
            username : checkedExisting,
            message : "Successfully login"
        })

       

       
    }else{
        res.status(500).json({
            message : "HTTP method not valid"
        })
    }

   
}