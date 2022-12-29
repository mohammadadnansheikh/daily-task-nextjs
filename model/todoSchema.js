import { Schema, model, models } from "mongoose";
const todoSchema = new Schema({
   username : String,
   todos : [
    {todo: String},
   ]
})

const Todos = models.todos || model('todos', todoSchema)
export default Todos