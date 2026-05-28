import React from "react";
import { Box, Container, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpiralBg from "../common-components/SpiralBg";
import { SECONDARY } from "../../constants";

export default function WhyHero() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ minHeight: "100vh", py: 5, display: "flex", alignItems: "center", justifyContent: "center", textAlign:"center", background:`radial-gradient(ellipse at 50% 30%,${SECONDARY}18 0%,transparent 60%)`, position:"relative", overflow:"hidden" }}>
      <SpiralBg />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Chip
          label="Why CRKL Inc."
          sx={{
            mb: 3,
            px: 1.5,
            background: `${SECONDARY}20`,
            color: SECONDARY,
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: 0.5,
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3rem" },
            fontWeight: 800,
            lineHeight: 1.2,
            mb: 3,
            color: isDark ? "common.white" : "text.primary",
          }}
        >
          The solution built around your concerns
        </Typography>

        <Typography
          sx={{
            opacity: isDark ? 0.82 : 0.7,
            fontSize: { xs: "1rem", md: "1.05rem" },
            lineHeight: 1.9,
            maxWidth: 620,
            mx: "auto",
            color: isDark ? "rgba(255,255,255,0.82)" : "text.secondary",
          }}
        >
          As outsourcing expanded, a clear pattern emerged: large companies reap
          its cost savings, while small businesses remain reluctant. Their
          hesitation centers on real, valid concerns. CRKL Inc. was built to
          address every single one.
        </Typography>
      </Container>
    </Box>
  );
}