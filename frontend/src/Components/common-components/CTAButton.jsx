import React from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { PRIMARY, SECONDARY, BOOKING_URL } from "../../Constants.js";

function CTAButton({ text, sub, size }) {
  return (
    <Box>
      <Button
        variant="contained"
        size={size}
        href={BOOKING_URL}
        target="_blank"
        endIcon={<ArrowForwardIcon />}
        sx={{
          background: `linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
          px: 4,
          py: 1.6,
          fontSize: "1rem",
          boxShadow: `0 6px 28px ${PRIMARY}55`,
          "&:hover": { boxShadow: `0 10px 36px ${PRIMARY}88` },
        }}
      >
        {text}
      </Button>
      {sub && (
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 1, opacity: 0.6, textAlign: "left" }}
        >
          {sub}
        </Typography>
      )}
    </Box>
  );
}

export default CTAButton;
