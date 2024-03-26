import Header from "./components/Header/index.tsx";
import { Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home/index.tsx";

import { CreationPoll } from "./pages/CreationPoll/index.tsx";
import Questions from "./pages/Home/index.tsx";

import Login from "./features/slice/auth/Login.tsx";
import Leaderboard from "./features/slice/users/Leaderboard.tsx";
import NotFound from "./components/NotFound/index.tsx";
import React from "react";
import Loading from "./components/Loading/index.tsx";
import QuestionItem from "./components/Questions/QuestionItem.tsx";
import { selectQuestions } from "./features/slice/questions/questionsSlice.ts";
import { useSelector } from "react-redux";
import { Question } from "./features/models/Question.ts";

function App() {
  const { questionId } = useParams();

  const questions = useSelector(selectQuestions);
  const question: Question | undefined = questions.find(
    (q) => q.id === questionId
  );

  return (
    <>
      <Header />

      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/questions" element={<Questions />}></Route>
          <Route
            path="/questions/:questionId"
            element={
              question && (
                <QuestionItem question={question} author={question?.author} />
              )
            }
          ></Route>
          <Route path="/leaderboard" element={<Leaderboard />}></Route>
          <Route path="/add" element={<CreationPoll />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
