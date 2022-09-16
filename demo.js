//Read user
app.get("/api/v2/users",async(req,resp)=>{
    const users = await User.find();

    resp.status(200).json({
        success:true,
        users
    })
})

//update user
app.put("api/v3/user/:id",async(req,resp)=>{

    let  user = await User.findById(req.params.id);
    if(!user){
        return resp.status(500).json({
            success:false,
            message:'user not found'
        })
    }
    user = await User.findByIdUpdate(req.params.id,req.body,{new:true,
    useFindAndModify:false,
    runValidators:true
    })

    resp.status(200).json({
        success:true,
        user
    })

})

//Delete user
app.delete("/api/v4/user/:id",async(req,resp)=>{

    const user = await User.findById(req.params.id);
    
    if(!user){
        return resp.status(500).json({
            success:false,
            message:'user not found'
        })
    }
    
    await user.remove();


    resp.status(200).json({
        success:true,
    })
})