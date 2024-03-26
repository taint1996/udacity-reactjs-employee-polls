import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import {
  isLoggedIn,
  logout,
  selectUserLoggedIn,
} from "../../features/slice/auth/authSlice";
import { Link } from "@mui/material";
import { showImageUser } from "../../utils/usersUtil";

export default function Header() {
  const isLogged = useSelector(isLoggedIn);
  const userLoggedIn = useSelector(selectUserLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
      <Grid container columns={16} justifyContent="center" alignItems="center">
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Link href="/" underline="none" sx={{ textDecoration: "none" }}>
            Home
          </Link>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Link
            href="/leaderBoard"
            underline="none"
            sx={{ textDecoration: "none" }}
          >
            Leaderboard
          </Link>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Link href="/add" underline="none" sx={{ textDecoration: "none" }}>
            New
          </Link>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}></Grid>
        {isLogged ? (
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt="Avt Login"
                src={showImageUser(userLoggedIn?.avatarURL)}
                sx={{ width: 50, height: 50, marginRight: "10px" }}
              />
              {userLoggedIn?.name}
            </Box>
          </Grid>
        ) : (
          <Grid item xs={2} sx={{ textAlign: "center" }}></Grid>
        )}
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          {isLogged ? (
            <Button
              onClick={handleLogout}
              size="small"
              variant="outlined"
              color="primary"
            >
              Logout
            </Button>
          ) : (
            <Link
              href="/login"
              underline="none"
              sx={{ textDecoration: "none" }}
            >
              <Button size="small" variant="outlined" color="success">
                Login
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
