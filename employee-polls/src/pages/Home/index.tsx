import { Box, Container } from "@mui/material";
import { isUserAuthenticated } from "../../features/slice/auth/authSlice";
import QuestionList from "../../components/Questions/QuestionList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

const Home = () => {
  const defaultTheme = createTheme();
  const isUserLoggedIn = useSelector(isUserAuthenticated);

  const renderPleaseLoginTemplate = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "center",
          minHeight: "80vh",
        }}
      >
        <h2 style={{ color: "#616161" }}>
          Please Login account before access the Employee Polls Page.
        </h2>
      </Box>
    );
  };

  const renderTemplateLoggedIn = () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <QuestionList />
        </Container>
      </ThemeProvider>
    );
  };

  return (
    <>
      {!isUserLoggedIn ? renderPleaseLoginTemplate() : renderTemplateLoggedIn()}
    </>
  );
};

export default Home;
