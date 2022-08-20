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
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user?._id));
  }, [dispatch]);

  if (!posts) return 'No posts';
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  // if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className='Posts'>
      {loading
        ? 'Loading posts...'
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
