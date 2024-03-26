import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers, selectUsers } from "./usersSlice";
import { AppDispatch, RootState } from "../../store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import Loading from "../../../components/Loading";

export default function Leaderboard() {
  const defaultTheme = createTheme();

  const dispatch: AppDispatch =
    useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const users = useSelector(selectUsers);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderTemplate = () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md" sx={{ my: 4 }}>
          {loading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "50vh",
              }}
            >
              <Loading />
            </Box>
          )}
          {error && <p>Error: {error}</p>}
          {!loading && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Users</TableCell>
                    <TableCell>Answer</TableCell>
                    <TableCell>Created&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u) => (
                    <TableRow
                      key={u.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {u.name}
                      </TableCell>
                      <TableCell>{Object.values(u?.answers).length}</TableCell>
                      <TableCell>{u.questions?.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </ThemeProvider>
    );
  };

  return <>{renderTemplate()}</>;
}
