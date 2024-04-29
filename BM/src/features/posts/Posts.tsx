import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPosts, addPost, updatePost, deletePost, selectPosts } from './postsSlice';

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10').then(response => {
      dispatch(getPosts(response.data));
    });
  }, [dispatch]);

  const handleAddPost = () => {
    if (editingId !== null) {
      dispatch(updatePost({ id: editingId, title: editTitle, body: editBody }));
      setEditingId(null);
    } else {
      const newPost = {
        id: Math.random(),
        title: editTitle,
        body: editBody,
      };
      dispatch(addPost(newPost));
    }
    setEditTitle('');
    setEditBody('');
  };

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="p-8">
      <div className='flex flex-col lg:flex-row w-full justify-center items-center gap-5 lg:gap-10 mb-8'>
        <input value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Title" className='bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 p-2.5 text-white focus:border-blue-500 w-2/3 lg:w-1/5'/>
        <input value={editBody} onChange={e => setEditBody(e.target.value)} placeholder="Body" className='bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 p-2.5 text-white focus:border-blue-500 w-2/3 lg:w-1/5'/>
        <button onClick={handleAddPost} className='my-1 px-8 py-2 bg-green-400 hover:bg-green-600 border-2 border-green-700 rounded-md font-semibold'>
        {editingId !== null ? 'Save' : 'Add Post'}
        </button>
      </div>
      <div className='w-fit mx-auto'>
        {posts.slice().reverse().map(post => (
          <div key={post.id} className='py-2 px-4 my-2 bg-slate-400 rounded-lg border-2 border-black'>
            <h2 className='text-lg font-semibold py-1'>Title: {post.title}</h2>
            <p className='font-medium py-1'>Body: {post.body}</p>
            <button onClick={() => { setEditTitle(post.title); setEditBody(post.body); setEditingId(post.id); }} className='border-2 border-yellow-700 px-8 py-2 bg-yellow-400 hover:bg-yellow-600 rounded-md font-semibold mr-2 my-2'>Update</button>
            <button onClick={() => handleDeletePost(post.id)} className='border-2 border-red-700 my-1 px-8 py-2 bg-red-400 hover:bg-red-600 rounded-md font-semibold'>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;