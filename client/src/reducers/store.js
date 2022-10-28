import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import postReducer from './postReducer';
import discussReducer from './discussReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    discuss: discussReducer,
  },
});

export default store;
