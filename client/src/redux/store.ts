
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import postReducer from './slices/post.slice';

export const store:any = configureStore({
  reducer: {
    // our reducers goes here
    user: userReducer,
    post: postReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;