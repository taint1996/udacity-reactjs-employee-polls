import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { User } from "../../models/User";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}
const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User | null>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUserLoggedIn = (state: RootState) => state.auth.user;
export const isLoggedIn = (state: RootState) =>
  state.auth.isLoggedIn;
export default authSlice.reducer;