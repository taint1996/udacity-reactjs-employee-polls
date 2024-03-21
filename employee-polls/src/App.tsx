import Header from "./components/Header/index.tsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.tsx";

import { CreationPoll } from "./pages/CreationPoll/index.tsx";
import Questions from "./pages/Home/index.tsx";
import QuestionItem from "./components/Questions/QuestionItem.tsx";
import Login from "./features/slice/auth/Login.tsx";
import Leaderboard from "./features/slice/users/Leaderboard.tsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/questions" element={<Questions />}></Route>
        <Route path="/questions/:id" element={<QuestionItem />}></Route>
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
        <Route path="/add" element={<CreationPoll />}></Route>

        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
