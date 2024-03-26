import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/index"; // Adjust the import path based on your project setup
import { Question } from "../../models/Question";
import { _getQuestions } from "../../../utils/_DATA";
import { User } from "../../models/User";

interface QuestionsState {
  questions: Question[];
  filteredQuestions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
  filteredQuestions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.filteredQuestions = action.payload;
    },
    filterQuestions: (state, action: PayloadAction<string>) => {
      const filterText = action.payload.toLowerCase();
      state.filteredQuestions = state.questions.filter(
        (question) =>
          question.optionOne.text.toLowerCase().includes(filterText) ||
          question.optionTwo.text.toLowerCase().includes(filterText)
      );
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      const updatedQuestion = action.payload;
      state.questions = state.questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      );
      state.filteredQuestions = state.filteredQuestions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      );
    },
  },
});

export const { setQuestions, filterQuestions, updateQuestion } =
  questionsSlice.actions;

export const fetchQuestions = () => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, PayloadAction<Question[]>>
  ) => {
    try {
      const questionsRecord: Record<string, Question> = await _getQuestions();
      const questions: Question[] = Object.values(questionsRecord);
      
      dispatch(setQuestions(questions));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
};

export function getFilteredQuestionIds(
  questions: Question[],
  authedUser: User | null,
  showAnswered: boolean
): string[] {
  const questionDict: Record<string, Question> = {};

  questions.forEach((question) => {
    questionDict[question.id] = question;
  });

  const filteredQuestionIds: string[] = Object.keys(questionDict).filter((id) => {
    const question: Question = questionDict[id];
    const hasAnswered =
      authedUser !== null &&
      authedUser.id !== undefined && // Additional check
      ((question.optionOne.votes ?? []).includes(authedUser.id) ||
        (question.optionTwo.votes ?? []).includes(authedUser.id));
    return showAnswered ? hasAnswered : !hasAnswered;
  });

  return filteredQuestionIds;
}

export const selectQuestions = (state: RootState) => state.questions.questions;

export default questionsSlice.reducer;
