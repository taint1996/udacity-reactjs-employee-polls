import React, { useState, useEffect, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  return (
    hasError && (
      <Box textAlign="center" mt={4}>
        <Typography variant="h5" component="h2" color="error">
          Something went wrong.
        </Typography>
        <Typography variant="body1" color="error">
          Please try again later.
        </Typography>
      </Box>
    )
  );

  return <>{children}</>;
};

export default ErrorBoundary;
