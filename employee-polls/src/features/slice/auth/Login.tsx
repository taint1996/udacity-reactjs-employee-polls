import { FormHelperText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { _getUsers } from "../../../utils/_DATA.ts";
import { useAppDispatch } from "../../../app/hook.ts";
import Copyright from "../../../components/Copyright/index.tsx";
import { useNavigate } from "react-router-dom";
import ImgLogin from "../../../assets/icon-login.png";
import { login } from "./authSlice.tsx";
import { fetchQuestions } from "../questions/questionSlice.tsx";
import { User } from "../../models/User.ts";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface IFormInput {
  id: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<IFormInput>({
    defaultValues: {
      id: "",
      password: "",
    },
  });
  // The `state` arg is correctly typed as `RootState` already
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const getUser = (await _getUsers()) as User;

    const findUser: User = Object.values(getUser).find(
      (gU) => gU.id === data.id && gU.password === data.password
    );

    if (findUser) {
      const userWithoutPassword = { ...findUser };
      delete userWithoutPassword.password;

      const action = await dispatch(login(userWithoutPassword));
      console.log("action", action);
      // If login is successful, fetch the questions data
      dispatch(fetchQuestions());
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      navigate("/");
    } else {
      setError("root.wrongUsr", {
        type: "invalidUsrOrPwd",
        message: "Invalid username",
      });
      setError("root.wrongPwd", {
        type: "invalidUsrOrPwd",
        message: "Invalid password",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Avt Login"
            src={ImgLogin}
            sx={{ width: 150, height: 150 }}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              name="id"
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
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  required
                  error={Boolean(errors?.id)}
                  helperText={
                    typeof errors?.id?.message === "string"
                      ? errors?.id?.message
                      : ""
                  }
                />
              )}
            />
            {errors?.root?.wrongUsr ? (
              <FormHelperText
                id="username-helper-text"
                error
                className="custom-class"
              >
                {errors?.root?.wrongUsr?.message}
              </FormHelperText>
            ) : null}

            <Controller
              name="password"
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
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={Boolean(errors?.password)}
                  helperText={
                    typeof errors?.password?.message === "string"
                      ? errors?.password?.message
                      : ""
                  }
                />
              )}
            />
            {errors?.root?.wrongPwd ? (
              <FormHelperText
                id="password-helper-text"
                error
                className="custom-class"
              >
                {errors?.root?.wrongPwd?.message}
              </FormHelperText>
            ) : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default Login;
