import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type Post = {
  id: number;
  title: string;
  body: string;
};

const initialState: Post[] = [];

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<Post[]>) => {
      return action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      return state.filter(post => post.id !== action.payload);
    },
  },
});

export const { getPosts, addPost, updatePost, deletePost } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;