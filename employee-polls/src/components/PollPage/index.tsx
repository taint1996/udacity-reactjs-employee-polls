import { ThemeProvider } from "@emotion/react";
import { Avatar, Container, createTheme } from "@mui/material";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectQuestions } from "../../features/slice/questions/questionsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserLoggedIn } from "../../features/slice/auth/authSlice";
import { selectUsers } from "../../features/slice/users/usersSlice";
import { Question } from "../../features/models/Question";
import NotFound from "../NotFound";
import { Grid } from "@mui/material";
import { showImageUser } from "../../utils/usersUtil";
import Button from "@mui/material/Button";
import { answerQuestion } from "../../features/slice/question/questionSlice";

const PollPage: FC = () => {
  const defaultTheme = createTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questionId } = useParams();

  const userLoggedIn = useSelector(selectUserLoggedIn);
  const questions = useSelector(selectQuestions);
  const users = useSelector(selectUsers);

  const question = Object.values(questions).find(
    (question: Question) => question.id === questionId
  ) as Question;

  if (!question) {
    return <NotFound />;
  }

  const user = Object.values(users).find((u) => u.id === question.author);

  const handleQuestionOne = () => {
    if (user) {
      dispatch(
        answerQuestion({
          questionId: question.id,
          answer: "optionOne",
          userId: user.id,
        })
      );
      navigate("/");
    }
  };

  const handleQuestionTwo = () => {
    if (user) {
      dispatch(
        answerQuestion({
          questionId: question.id,
          answer: "optionTwo",
          userId: user.id,
        })
      );
      navigate("/");
    }
  };

  const hasVotedForOptionOne =
    userLoggedIn &&
    question.optionOne.votes &&
    question.optionOne.votes.includes(userLoggedIn.id);
  const hasVotedForOptionTwo =
    userLoggedIn &&
    question.optionTwo.votes &&
    question.optionTwo.votes.includes(userLoggedIn.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const calculatePercentage = (option: string, question: Question) => {
    const numberVotesTotal =
      (question.optionOne.votes &&
        question.optionTwo.votes &&
        question?.optionOne?.votes.length +
          question?.optionTwo?.votes.length) ||
      0;

    switch (option) {
      case "optionOne":
        return `${
          question.optionOne.votes &&
          (question.optionOne.votes.length / numberVotesTotal) * 100
        } %`;
      case "optionTwo":
        return `${
          question.optionTwo.votes &&
          (question.optionTwo.votes.length / numberVotesTotal) * 100
        } %`;
      default:
        return "";
    }
  };

  const renderTemplate = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} className={"text-center"}>
          <h3>Poll by {user?.id}</h3>
        </Grid>
        <Grid item xs={12} className={"d-flex justify-content-center"}>
          <Avatar
            alt="Avt Login"
            src={showImageUser(user?.avatarURL)}
            sx={{ width: 150, height: 150, marginRight: "10px" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            disabled={!!hasVoted}
            variant={hasVotedForOptionOne ? "contained" : "text"}
            onClick={handleQuestionOne}
          >
            {question.optionOne.text}{" "}
            {hasVoted && (
              <>
                <p>
                  {question.optionOne.votes && question.optionOne.votes.length}
                </p>
                <p>{calculatePercentage("optionOne", question)}</p>
              </>
            )}
          </Button>
          <Button
            disabled={!!hasVoted}
            variant={hasVotedForOptionTwo ? "contained" : "text"}
            onClick={handleQuestionTwo}
          >
            {question.optionTwo.text}{" "}
            {hasVoted && (
              <>
                <p>
                  {question.optionTwo.votes && question.optionTwo.votes.length}
                </p>
                <p>{calculatePercentage("optionTwo", question)}</p>
              </>
            )}
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        {renderTemplate()}
      </Container>
    </ThemeProvider>
  );
};

export default PollPage;
