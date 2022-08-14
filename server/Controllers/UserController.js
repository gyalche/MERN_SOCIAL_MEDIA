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
        res.status(403).json("access denied!")
    }
}

//Delete user;
export const deleteUser=async(req, res)=> {
    const id=req.params.id;

    const {currentUserId, currentUserAdminStatus}=req.body;
    if(currentUserId===id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("User delted successfull")
        } catch (error) {
            res.status(403).json("only delete your own profile please!")
            
        }
    }
}

//follow a user;
export const followUser=async(req, res) => {
    const id=req.params.id;
    const {currentUserId}=req.body;

    if(currentUserId===id) {
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser=await UserModel.findById(id);
            const followingUser=await UserModel.findById(currentUserId)

            if(!followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$push: {followers:currentUserId}});
                await followingUser.updateOne({$push:{following:id}});
                res.status(200).json("user followed")
            }else{
                res.status(403).json("user is already followed by you");
            }
        } catch (error) {
            res.status(500).json("error")
        }
    }
}

//unfollow a user;

export const unfollowUser = async(req, res) => {
    const id=req.params.id;
    const {currentUserId}=req.body;

    if(id===currentUserId) {
        res.status(403).json("Action forbidden, cant unfollow yourseld");
    }
    else{
        try {
            const followUser=await UserModel.findById(id);
            const followingUser=await UserModel.findById(currentUserId);

            if(followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$pull: {followers:currentUserId}})
                await followingUser.updateOne({$pull:{following:id}});
                res.status(200).json("sucessfully unfollowed")
            }else{
                res.status(403).json("user is not followed by you");
            }
        } catch (error) {
            res.status(404).json("error")
        }
    }
}