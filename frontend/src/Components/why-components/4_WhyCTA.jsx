import React from "react";
import { Box, Container, Typography } from "@mui/material";
import CTAButton from "../common-components/CTAButton";

export default function WhyCTA() {
  return (
    <Box sx={{ py:{ xs:8,md:10 }, textAlign:"center" }}>
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mb:2, fontWeight:700 }}>Still have a question we haven't answered?</Typography>
        <Typography sx={{ opacity:0.65, mb:4 }}>Book a 30-minute call with Peri. Ask anything. No pitch, no pressure.</Typography>
        <CTAButton text="Book a Discovery Call" />
      </Container>
    </Box>
  );
}
