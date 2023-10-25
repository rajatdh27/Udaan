import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Quiz from "./scenes/quiz";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import SignUpForm from "./components/SignUpForm";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginForm from "./components/LoginForm";
import SolvedQuiz from "./components/SolvedQuiz";
import QuestionAdded from "./components/QuestionsAdded";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [user, setUser] = useState({
    uid: "",
    name: "",
  });
  const signOut = () => {
    setUser({
      uid: "",
    });
    setLoggedIn(false);
  };
  const handleLoggin = (props) => {
    setUser({
      uid: props ? (props.uid ? props.uid : "") : "",
    });
    setLoggedIn(true);
  };
  const fetchData = async () => {
    try {
      const yi = await getDocs(
        collection(db, `userData/${user.uid}/userDetails/`)
      );
      const xi = await getDocs(collection(db, `questions/`));
      const questions = xi.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setQuestionData(() => {
        return [...questions];
      });
      const z = yi.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUser((prevState) => {
        return {
          ...prevState,
          name: z[0].name,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user.uid !== "") {
      fetchData();
    }
  }, [user.uid]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {loggedIn && <Sidebar isSidebar={isSidebar} userName={user.name} />}
          <main className="content">
            <Topbar
              setIsSidebar={setIsSidebar}
              signOut={signOut}
              uid={user.uid}
            />
            <Routes>
              <Route
                path="/login"
                element={<LoginForm login={handleLoggin} />}
              />
              <Route
                path="/signup"
                element={<SignUpForm login={handleLoggin} />}
              />
              <Route
                element={
                  <ProtectedRoutes auth={user.uid !== "" ? true : false} />
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/quiz"
                  element={<Quiz ques={questionData} uid={user.uid} />}
                />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form uid={user.uid} />} />
                <Route
                  path="/question"
                  element={<QuestionAdded data={questionData} uid={user.uid} />}
                />
                <Route path="/pie" element={<Pie />} />
                <Route
                  path="/solved"
                  element={<SolvedQuiz ques={questionData} uid={user.uid} />}
                />
                <Route path="/faq" element={<FAQ />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
