import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../services/postServices';

const initialState = {
  discuss: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getSinglePost = createAsyncThunk(
  'discuss/getPost',
  async (postData, thunkAPI) => {
    try {
      return await postService.getSinglePost(postData.id, postData.page);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const newComment = createAsyncThunk(
  'discuss/ newComment',
  async (commentData, thunkAPI) => {
    try {
      if (thunkAPI.getState().auth.user) {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.postComment(commentData, token);
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

export const discussSlice = createSlice({
  name: 'discuss',
  initialState,
  reducers: {
    discussReset: (state) => {
      state.discuss = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSinglePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.discuss = action.payload;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(newComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.discuss.comments.docs.unshift(action.payload);
      })
      .addCase(newComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { discussReset } = discussSlice.actions;
export default discussSlice.reducer;
