import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/slice/auth/authSlice";
import { useDispatch } from "react-redux";
import questionsReducer from "../../features/slice/questions/questionSlice";
import usersReducer from "../../features/slice/users/usersSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsReducer,
    usersReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
