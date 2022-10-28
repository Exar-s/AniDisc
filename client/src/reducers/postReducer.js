import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../services/postServices';

const initialState = {
  posts: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const newPost = createAsyncThunk(
  'post/newpost',
  async (post, thunkAPI) => {
    try {
      if (thunkAPI.getState().auth.user) {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.newPost(post, token);
      } else {
        throw new Error('No token provided');
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllPost = createAsyncThunk(
  'post/getallpost',
  async (findpost, thunkAPI) => {
    try {
      return await postService.getAllPost(findpost.id, findpost.page);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postReset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.docs.push(action.payload);
      })
      .addCase(newPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;
