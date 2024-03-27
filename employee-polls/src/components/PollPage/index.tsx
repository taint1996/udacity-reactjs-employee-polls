import { ThemeProvider } from "@emotion/react";
import { Avatar, Container, Typography, createTheme } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectQuestions } from "../../features/slice/questions/questionsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserLoggedIn } from "../../features/slice/auth/authSlice";
import { fetchUsers, selectUsers } from "../../features/slice/users/usersSlice";
import { Question } from "../../features/models/Question";
import NotFound from "../NotFound";
import { Grid } from "@mui/material";
import { showImageUser } from "../../utils/usersUtil";
import Button from "@mui/material/Button";
import { answerQuestion } from "../../features/slice/question/questionSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../features/store";

const PollPage: FC = () => {
  const defaultTheme = createTheme();

  const navigate = useNavigate();
  const { questionId } = useParams();

  const userLoggedIn = useSelector(selectUserLoggedIn);
  const questions = useSelector(selectQuestions);

  const dispatch: AppDispatch =
    useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
    console.log("go here");
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

  const styles = {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  };

  const renderTemplate = () => {
    return (
      <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
        <Grid item xs={12} sx={styles}>
          <Typography variant="h5" component="h5">
            Poll by {user?.id}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={styles}>
          <Avatar
            alt="Avt Login"
            src={showImageUser(user?.avatarURL)}
            sx={{ width: 150, height: 150, marginRight: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sx={styles}>
          <Typography variant="h5" component="h5">
            Would You Rather
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ gap: "10px" }}>
          <Button
            disabled={!!hasVoted}
            variant={hasVotedForOptionOne ? "contained" : "text"}
            onClick={handleQuestionOne}
          >
            {question.optionOne.text}{" "}
            {hasVoted && (
              <>
                <Typography variant="h5" component="p">
                  {question.optionOne.votes && question.optionOne.votes.length}
                </Typography>
                <Typography component="p" variant="h5">
                  {calculatePercentage("optionOne", question)}
                </Typography>
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
                <Typography variant="h5" component="p">
                  {question.optionTwo.votes && question.optionTwo.votes.length}
                </Typography>

                <Typography variant="h5" component="p">
                  {calculatePercentage("optionTwo", question)}
                </Typography>
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
