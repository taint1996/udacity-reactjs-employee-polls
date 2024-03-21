import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getQuestions } from "../../../utils/_DATA";
import { Question } from "../../models/Question";

interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  "question/fetchQuestions",
  async (_, thunkAPI) => {
    try {
      const response = await _getQuestions();
      return (response as { data: Question[] }).data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as string);
    }
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchQuestions.fulfilled,
        (state, action: PayloadAction<Question[]>) => {
          state.loading = false;
          state.error = null;
          state.questions = action.payload;
        }
      )
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default questionsSlice.reducer;
