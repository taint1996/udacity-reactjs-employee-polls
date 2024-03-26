import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import QuestionList from "../../components/Questions/QuestionList";

const Home = () => {
  const defaultTheme = createTheme();
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

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
        <Typography variant="h5" color="text.secondary">
          Please log in to access the Employee Polls Page.
        </Typography>
      </Box>
    );
  };

  const renderTemplateLoggedIn = () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Unanswered Questions" />
            <Tab label="Answered Questions" />
          </Tabs>
          <Typography sx={{ marginTop: "1rem" }}>
            {selectedTab === 0 ? (
              <QuestionList showAnswered={false} />
            ) : (
              <QuestionList showAnswered={true} />
            )}
          </Typography>
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
