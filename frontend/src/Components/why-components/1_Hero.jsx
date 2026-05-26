import React from "react";
import { Box, Container, Typography, Chip } from "@mui/material";
import SpiralBg from "../common-components/SpiralBg";
import { SECONDARY } from "../../constants";

export default function WhyHero() {
  return (
    <Box sx={{ minHeight: "100vh", py:{ xs:8,md:12 }, mb:{ xs:6, md:8 }, textAlign:"center", background:`radial-gradient(ellipse at 60% 30%,${SECONDARY}18 0%,transparent 55%)`, position:"relative", overflow:"hidden" }}>
      <SpiralBg />
      <Container maxWidth="md" sx={{ position:"relative", zIndex:1 }}>
        <Chip label="Why CRKL Inc." sx={{ mb:3, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
        <Typography variant="h1" sx={{ fontSize:{ xs:"2.2rem",md:"3rem" }, mb:3 }}>The solution built around your concerns</Typography>
        <Typography sx={{ opacity:0.7, fontSize:"1.05rem", lineHeight:1.85, mb:5 }}>As outsourcing expanded, a clear pattern emerged: large companies reap its cost savings, while small businesses remain reluctant. Their hesitation centers on real, valid concerns. CRKL Inc. was built to address every single one.</Typography>
      </Container>
    </Box>
  );
}
