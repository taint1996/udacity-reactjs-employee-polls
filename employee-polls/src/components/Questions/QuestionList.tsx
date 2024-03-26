/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { Box, Typography } from "@mui/material";
import {
  getFilteredQuestionIds,
  selectQuestions,
} from "../../features/slice/questions/questionsSlice";
import React from "react";
import { Question } from "../../features/models/Question";
import { useNavigate, useParams } from "react-router-dom";
import QuestionItem from "./QuestionItem";

interface QuestionListProps {
  showAnswered: boolean;
}

const QuestionList: React.FC<QuestionListProps> = ({ showAnswered }) => {
  const authedUser = useSelector((state: RootState) => state.auth.user);
  const questions = useSelector(selectQuestions);

  const filteredQuestionIds = getFilteredQuestionIds(
    questions,
    authedUser,
    true
  );

  const renderTemplateNoAnswer = () => {
    if (filteredQuestionIds.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          <Typography variant="h5" color="text.secondary">
            {showAnswered
              ? "No answered polls available"
              : "No unanswered polls available"}
          </Typography>
        </Box>
      );
    }
  };

  const navigate = useNavigate();
  const { questionId } = useParams();
  const handleShowQuestion = () => {
    navigate(`/questions/${questionId}`);
  };

  return (
    <Box>
      {renderTemplateNoAnswer()}
      {filteredQuestionIds.map((id: string) => {
        const question: Question = questions.find((q) => q.id === id);
        const author = question.author;

        return (
          <QuestionItem
            question={question}
            author={author}
            onHandleShowQuestion={handleShowQuestion}
            key={id}
          />
        );
      })}
    </Box>
  );
};

export default QuestionList;
