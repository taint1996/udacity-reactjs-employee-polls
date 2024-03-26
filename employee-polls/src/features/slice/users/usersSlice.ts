import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../../utils/_DATA";
import { User } from "../../models/User";
import { AppDispatch, RootState } from "../../store";

import { sortedUsers } from "../../../utils/usersUtil";

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { dispatch: AppDispatch }
>("user/fetchUsers", async (_, thunkAPI) => {
  try {
    const response = await _getUsers();
    const users: User[] = Object.values(response as Record<string, User>) || [];

    return sortedUsers(users);
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
export const selectUsers = (state: RootState) => state.users.users;
