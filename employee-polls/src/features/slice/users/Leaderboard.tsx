import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "./usersSlice";
import { AppDispatch, RootState } from "../../../app/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

export default function Leaderboard() {
  const usersData = (
    name: string,
    totalAnswer: number,
    totalCreatedQuestion: number
  ) => {
    return { name, totalAnswer, totalCreatedQuestion };
  };

  const rows = [
    usersData("Frozen yoghurt", 159, 6),
    usersData("Ice cream sandwich", 237, 9),
    usersData("Eclair", 262, 16),
    usersData("Cupcake", 305, 3),
    usersData("Gingerbread", 356, 16),
  ];
  const defaultTheme = createTheme();

  const dispatch: AppDispatch =
    useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const users = useSelector((state: RootState) => state.usersReducer.users);
  const loading = useSelector((state: RootState) => state.usersReducer.loading);
  const error = useSelector((state: RootState) => state.usersReducer.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log(users);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const renderTemplate = () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <TableContainer component={Paper} sx={{ my: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Users</TableCell>
                  <TableCell>Answer</TableCell>
                  <TableCell>Created&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.totalAnswer}</TableCell>
                    <TableCell>{row.totalCreatedQuestion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </ThemeProvider>
    );
  };

  return <>{renderTemplate()}</>;
}
