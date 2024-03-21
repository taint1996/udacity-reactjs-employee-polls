import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import { User } from "../../models/User";

const DEFAULT_USER = {
  id: "",
  password: "",
  name: "",
  avatarURL: "",
  answers: { id: "", value: "" },
  questions: [],
};

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = DEFAULT_USER;
    },
  },
});

export const { login } = authSlice.actions;
export const userLogin = (state: RootState) => state.auth.user;
export const isUserAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export default authSlice.reducer;

// AuthSlice
// -> Login
//   -> dispatch logIn -> isAuthenticate: true, user = action.payload
//   -> getUserLogin (userLogin) -> get dc list questions theo user
// -> Questions
