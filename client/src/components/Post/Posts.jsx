import React, { useEffect } from 'react';
import './Posts.css';
// import { PostsData } from '../../Data/PostData';
import Post from '../Pos/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/postAction';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [user._id]);

  if (!posts) return 'No posts';
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className='Posts'>
      {posts.map((post, id) => {
        return <Post data={post} id={id} />;
      })}
    </div>
  );
};

export default Posts;
