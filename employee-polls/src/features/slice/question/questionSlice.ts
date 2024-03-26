import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../../models/Question";

interface QuestionState {
  questions: Record<string, Question>;
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  questions: {},
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      const { id } = action.payload;
      state.questions[id] = action.payload;
    },
    answerQuestion: (
      state,
      action: PayloadAction<{
        questionId: string;
        answer: string;
        userId: string;
      }>
    ) => {
      const { questionId, answer, userId } = action.payload;

      if (!state.questions[questionId][answer]) {
        state.questions[questionId][answer] = {
          text: answer,
          votes: [],
        };
      }
      if (userId) {
        state.questions[questionId][answer].votes.push(userId);
      }
    },
  },
});

export const { addQuestion, answerQuestion } = questionSlice.actions;

export default questionSlice.reducer;
