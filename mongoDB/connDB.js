import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
export default async function(){
  try {
    console.log(MONGODB_URI);
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState == 1) {
      console.log("connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log("Not Connected");
    return Promise.reject(error);
  }
}

// if (!MONGODB_URI) {
//     throw new Error(
//       'Please define the MONGODB_URI environment variable inside .env.local'
//     )
//   }

//   /**
//    * Global is used here to maintain a cached connection across hot reloads
//    * in development. This prevents connections growing exponentially
//    * during API Route usage.
//    */
//   let cached = global.mongoose

//   if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null }
//   }

//   async function connectMongo () {
//     if (cached.conn) {
//       return cached.conn
//     }

//     if (!cached.promise) {
//       const opts = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         bufferCommands: false,
//         bufferMaxEntries: 0,
//         useFindAndModify: true,
//         useCreateIndex: true
//       }

//       cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
//         return mongoose
//       })
//     }
//     cached.conn = await cached.promise
//     return cached.conn
//   }

//   export default connectMongo

// function connectionMongo(){
//     if(mongoose.connection[0].readyState){
//         console.log("already connected")
//         return;
//     }
//     mongoose.connect(process.env.MONGODB_URI, {
//         useNewUrlParser:true,
//     })
//     mongoose.connection.on('connected', ()=>{
//         console.log("connected to mongo")
//     })
//     mongoose.connection.on('error', (error)=>{
//         console.log("connected to mongo", error)
//     })
// }
// export default connectionMongo
