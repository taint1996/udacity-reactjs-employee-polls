import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Container,
  // FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const CreationPoll = () => {
  const defaultTheme = createTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstOption: "",
      secondOption: "",
    },
  });
  // const questions = useSelector(selectQuestions);

  const onSubmit = ({
    optionOne,
    optionTwo,
  }: {
    optionOne: string;
    optionTwo: string;
  }) => {
    console.log(optionOne, optionTwo, dispatch);
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md" sx={{ my: 4 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Would you Rather
          </Typography>
          <Typography
            component="h6"
            variant="h6"
            sx={{ color: "GrayText", fontSize: "1.15rem" }}
          >
            Create Your Own Poll
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              name="firstOption"
              control={control}
              rules={{
                required: "Field username can't be blank!",
                // validate: validateLogin,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  id="firstOption"
                  label="First Option"
                  autoComplete="Option One"
                  autoFocus
                  required
                  error={Boolean(errors?.firstOption)}
                  helperText={
                    typeof errors?.firstOption?.message === "string"
                      ? errors?.firstOption?.message
                      : ""
                  }
                />
              )}
            />
            {/* {errors?.root?.wrongUsr ? (
              <FormHelperText
                id="username-helper-text"
                error
                className="custom-class"
              >
                {errors?.root?.wrongUsr?.message}
              </FormHelperText>
            ) : null} */}

            <Controller
              name="secondOption"
              control={control}
              rules={{
                required: "Field password can't be blank!",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Option Two"
                  type="text"
                  id="secondOption"
                  autoComplete="Option Two"
                  error={Boolean(errors?.secondOption)}
                  helperText={
                    typeof errors?.secondOption?.message === "string"
                      ? errors?.secondOption?.message
                      : ""
                  }
                />
              )}
            />

            {/* {errors?.root?.wrongPwd ? (
              <FormHelperText
                id="password-helper-text"
                error
                className="custom-class"
              >
                {errors?.root?.wrongPwd?.message}
              </FormHelperText>
            ) : null} */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
