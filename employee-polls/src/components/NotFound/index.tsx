import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box sx={{ marginTop: "2rem" }}>
      <Typography variant="h3">404 - Page Not Found</Typography>
      <Typography variant="body1">
        Oops! The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
