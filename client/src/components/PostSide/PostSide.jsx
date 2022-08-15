import React from 'react'
import Posts from '../Post/Posts';
import PostShare from '../PostShare/PostShare';
import './PostSide.css';

const PostSide = () => {
  return (
    <div className="PostSide">
        <PostShare />
        <Posts />
    </div>
  )
}

export default PostSide