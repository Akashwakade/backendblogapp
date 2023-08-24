const mongoose=require("mongoose")
require("dotenv").config()

const connection=()=>{
    mongoose.connect(process.env.mongoURL,
    {
        useNewUrlparser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }
    )
    .then(()=>{
        console.log('connected to mongodb')
    })
    .catch((error)=>{
         console.log('mongodb connection error:',error)
    })
}
module.exports=connection