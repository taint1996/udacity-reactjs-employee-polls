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
import { useNavigate } from "react-router-dom";
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
    showAnswered
  );

  console.log('filteredQuestionIds ', filteredQuestionIds)

  const renderTemplateNoAnswer = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h1" color="secondary" component="h3">
          {showAnswered
            ? "No answered polls available"
            : "No unanswered polls available"}
        </Typography>
      </Box>
    );
  };

  const navigate = useNavigate();
  const handleShowQuestion = (id) => {
    navigate(`/questions/${id}`);
  };

  return (
    <Box>
      {filteredQuestionIds.length === 0 && renderTemplateNoAnswer()}
      {filteredQuestionIds && filteredQuestionIds.map((id: string) => {
        const question: Question = questions.find((q) => q.id === id);
        const author = question.author;

        return (
          <QuestionItem
            question={question}
            author={author}
            onHandleShowQuestion={() => handleShowQuestion(id)}
            key={id}
          />
        );
      })}
    </Box>
  );
};

export default QuestionList;
