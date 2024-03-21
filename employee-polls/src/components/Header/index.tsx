import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2.5,
        borderBottom: 1.5,
        borderColor: "divider",
      }}
    >
      <Grid container columns={16}>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Link to="/">Home</Link>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Link to="/leaderBoard">Leaderboard</Link>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Link to="/add">New</Link>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}></Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          Avatar
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Link to="/login">Login</Link>
        </Grid>
      </Grid>
    </Box>
  );
}
