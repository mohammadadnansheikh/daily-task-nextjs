import { Schema, model, models } from "mongoose";
const userSchema = new Schema({
    email:{
        type: String,
    },
    username:{
        type: String,
    },
    password:{
        type: String,
    },
})

const Users = models.user || model('user', userSchema)
export default Users