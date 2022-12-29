import connectMongo from "../../mongoDB/connDB"
import Users from "../../model/userSchema";
import {hash} from 'bcryptjs'


// export default (req, res)=>{
//     res.json({
//         message : "hello world"
//     })
// }

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

        const {email, username, password} = req.body;

        //check duplicate user
        const checkedExisting = await Users.findOne({email});
        if(checkedExisting){
          return res.status(422).json({
            message:"user already exist.......!!"
          })
        }

        // hashed password
        Users.create({
            email,
            username,
            password: await hash(password, 12),             
        }, function(err, data){
            if(err) return res.status(404).json({err})
            res.status(201).json({status : true, user : data})
        })
    }else{
        res.status(500).json({
            message : "HTTP method not valid"
        })
    }

   
}