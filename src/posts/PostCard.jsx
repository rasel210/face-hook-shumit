import React, { useState } from 'react'
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostAction from './PostAction';
import PostComments from './PostComments';
import PostEntry from './PostEntry';

const PostCard = ({post}) => {

  const[isEditing, setIsEditing] = useState(false);

  if(isEditing) {
    return (
      <article className='card mt-6 lg:mt-8'>
        <PostEntry
          post={post}
          onCreate={() => setIsEditing(false)}
        />
      </article>
    );
  }

  return (
    <article class="card mt-6 lg:mt-8">
        <PostHeader post={post} onEdit={() => setIsEditing(true)}/>
        <PostBody poster={post?.image} content={post?.content}/>
        <PostAction post={post} commentCount={post?.comments.length}/>
        <PostComments post={post}/>
    </article>
  )
}

export default PostCard;