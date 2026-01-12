import React from 'react'
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostAction from './PostAction';
import PostComments from './PostComments';

const PostCard = ({post}) => {
  return (
    <article class="card mt-6 lg:mt-8">
        <PostHeader/>
        <PostBody/>
        <PostAction/>
        <PostComments/>
    </article>
  )
}

export default PostCard;