import React from "react";
import { Box, Container, Typography } from "@mui/material";
import CTAButton from "../common-components/CTAButton";
import { PRIMARY, SECONDARY } from "../../Constants.js";

export default function AboutCTA() {
  return (
    <Box
      sx={{
        py: 5,
        textAlign: "center",
        background: `linear-gradient(160deg,${PRIMARY}0d 0%,${SECONDARY}0d 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
          Want to know if we're the right fit?
        </Typography>
        <Typography sx={{ opacity: 0.65, mb: 4 }}>
          Book a discovery call with KOPL — we'll be straightforward about
          what we can and cannot do for your business.
        </Typography>
        <CTAButton text="Contact Us" />
      </Container>
    </Box>
  );
}

