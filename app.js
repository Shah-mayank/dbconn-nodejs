const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//database connection
mongoose.connect("mongodb://localhost:27017/Sample",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log(" Connected with Mongodb")
}).catch((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

//error handling middleware
app.use(function(err,req,resp,next){
    //console.log(err);
    resp.send({error:err.message});
})

// userSchema
const userSchema = new mongoose.Schema({
    subjectId:{type:String},
    qcStatus: { type: Boolean, default: null },
    provider: { type: Number },
    env: { type: Number },
    trialID: { type: Number },
    hospital: { type: String },
    processes: { type: Array },
    disorder: { type: String },
    executionID: { type: String },
    studyID: { type: String },
    patientID: { type: String }
});

const User = new mongoose.model('users',userSchema)// users is collection name


//create user
app.post("/user/new",async(req,resp)=>{
const subject_Id = (req.body.studyID + req.body.hospital + "-" + req.body.patientID)
console.log(subject_Id)
try{ 
    const data = await User.findOne({subject_Id})
 const user_data = {
    subjectId:req.body.studyID+req.body.hospital+"-"+req.body.patientID,
    provider: req.body.provider,
    env:req.body.env,
    trialID: req.body.trialID,
    hospital: req.body.hospital,
    processes:req.body.processes ,
    disorder: req.body.disorder,
    executionID: req.body.executionID,
    studyID: req.body.studyID,
    patientID: req.body.patientID

}
console.log(data)
if(data){
    resp.status(200).json({
        message:"data is already present",
        status:400
    })       
 
}else{
    const user = await User.create(user_data);
    resp.status(201).json({
    user
}) 
}
}catch(err){
    resp.status(200).json({
        message:"new user created",
        status:201
    })
}
})

//listen for the request
app.listen(4500,() =>{
    console.log('server is working http://localhost:4500')
})