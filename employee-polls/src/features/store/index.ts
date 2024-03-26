import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth/authSlice";
import { useDispatch } from "react-redux";
import questionsReducer from "../slice/questions/questionsSlice";
import usersReducer from "../slice/users/usersSlice"

export const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    auth: authReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
