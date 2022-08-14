import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import postModel from "../Models/postModel.js";

//create new post;
export const createPost=async(req, res) => {
    const newPost= new postModel(req.body);
    try {
        await newPost.save();
        res.status(200).json("post created");
    } catch (error) {
        res.status(500).json("error creating post")
    }

}

//get a post;
export const getPost = async(req, res) => {
    const id=req.params.id;
    try {
        const post=await PostModel.findById(id);
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json(error)
    }
}

//update a post;
export const updatePost=async(req, res) => {
    const postId=req.params.id;
    const {userId}=req.body;
    try {
        const post=await PostModel.findById(postId);
        if(post.userId===userId) {
            await post.updateOne({$set:req.body}, {new:true});
            res.status(200).json("Post updated");
        }else{
            res.status(403).json("action forbidden");
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

//delete a post;

export const deletePost = async(req, res) => {
    const id=req.params.id;
    const {userId}=req.body;
   try {
       const post=await PostModel.findById(id);
       if(post.userId===userId) {
           post.deleteOne()
           res.status(200).json("sucessfully deleted")
       }else{
           res.status(403).json("action forbidden")
       }
   } catch (error) {
       res.status(500).json("error")
   }
}

//like and dislike a post;
export const likePost=async(req, res)=>{
    const id=req.params.id;
    const {userId}=req.body;

    if(id===userId){
        res.status(403).send("action forbidden")
    }else{
        try {
            // const liketo=await postModel.findById(id);
            // const likeBy=await postModel.findById(userId);
            const post=await postModel.findById(id);

            if(!post.likes.includes(userId)){
                await post.updateOne({$push:{likes:userId}});
                // await likeBy.updateOne({$push:{likes:id}});
                res.status(200).json("post liked")
            }else{
                await post.updateOne({$pull: {likes:userId}});
                res.status(200).json("post unliked")
            }
        } catch (error) {
            res.status(500).json("error")
        }
        

    }
}
