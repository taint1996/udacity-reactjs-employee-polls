import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import { CreationPoll } from "./pages/CreationPoll/index.tsx";
import Leaderboard from "./components/LeaderBoard/index.tsx";

const Home = React.lazy(() => import("./pages/Home"));
const PollPage = React.lazy(() => import("./components/PollPage"));
const Login = React.lazy(() => import("./features/slice/auth/Login.tsx"));

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" Component={() => <Home />} />
          <Route path="/questions/:questionId" Component={() => <PollPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/add" element={<CreationPoll />} />

          <Route path="/login" Component={() => <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
