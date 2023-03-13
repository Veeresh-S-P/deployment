const authorise=(permitedroles)=>{
    return (req, res, next)=>{
        const user_role=req.user.role
        if(permittedroles.includes (user_role)){
            next()
        }else{
            res.send("unautherised")
        }
    }
}
module.exports={
    authorise
}