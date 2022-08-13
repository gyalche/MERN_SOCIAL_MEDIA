import UserModel from '../Models/userModel.js';
import bcrypt from'bcrypt';
//get a user;

export const getUser=async(req, res) => {
    const id=req.params.id;
    try {
        const user=await UserModel.findById(id);
        if(user) {
            // console.log(user);
            const {password, ...others}=user._doc;
            res.status(200).json(others);
        }else {
            res.status(404).json("No such user exits");
        }
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//update a user;
export const updateUser=async (req, res)=>{
    const id=req.params.id;

    const {currentUserId, currentUserAdminStatus, password}=req.body;
    if(id===currentUserId || currentUserAdminStatus) {
        try {
            if(password){
                const salt=await bcrypt.genSalt(10);
               req.body.password=await bcrypt.hash(password, salt);
            }
            const user= await UserModel.findByIdAndUpdate(
                id, req.body,
                 {new:true}
            )
            res.status(200).json(user);
        } catch (error) {
        res.status(500).json({message: error.message});
            
        }
    }else{
        res.status(403).json("access denied")
    }
}