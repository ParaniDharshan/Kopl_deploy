import React from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  CardContent,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SERVICES, PRIMARY, SECONDARY } from "../../Constants.js";
import SpotlightCard from "./SpotlightCard";

export default function ThreePillars() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: isDark
          ? `linear-gradient(160deg, rgba(4, 12, 24, 1) 0%, rgba(7, 21, 36, 1) 100%)`
          : `linear-gradient(160deg,${PRIMARY}08 0%,${SECONDARY}08 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label="What We Do"
            sx={{
              mb: 2,
              background: isDark ? `${SECONDARY}26` : `${SECONDARY}20`,
              color: SECONDARY,
              fontWeight: 700,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              mb: 2,
              color: isDark ? "#eef6ff" : "inherit",
            }}
          >
            Three pillars. One trusted partner.
          </Typography>
          <Typography
            sx={{
              opacity: isDark ? 0.78 : 0.65,
              mx: "auto",
              lineHeight: 1.8,
              color: isDark ? "rgba(226,239,255,0.86)" : "inherit",
            }}
          >
            Every service is delivered through KOPL's dedicated professionals in
            Madurai.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {SERVICES.map((s, i) => (
            <SpotlightCard
              key={i}
              spotlightColor={PRIMARY}
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 12px)",
                  md: "1 1 calc(33.33% - 16px)",
                },
                maxWidth: { sm: "calc(50% - 12px)", md: "calc(33.33% - 16px)" },
                border: "none",
                transition: "all .28s ease",
                position: "relative",
                color: isDark ? "#eef6ff" : "inherit",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: `0 20px 60px ${s.color}20`,
                },
                "&:hover .service-arrow": {
                  opacity: 1,
                  transform: "translateX(0) scale(1)",
                },
              }}
            >
              <CardContent sx={{ p: 3, pb: 4.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <s.icon sx={{ fontSize: 44, color: PRIMARY }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: isDark ? "#f6fbff" : "inherit",
                  }}
                >
                  {s.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: isDark ? 0.82 : 0.68,
                    lineHeight: 1.75,
                    mb: 2,
                    color: isDark ? "rgba(226,239,255,0.82)" : "inherit",
                  }}
                >
                  {s.summary}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                  opacity: 0,
                  transform: "translateX(10px) scale(0.96)",
                  transition: "opacity .32s ease, transform .32s ease",
                }}
                className="service-arrow"
              >
                <IconButton
                  aria-label={`Explore ${s.title}`}
                  sx={{
                    background: PRIMARY,
                    boxShadow: `0 6px 18px rgba(29, 137, 200, 0.22)`,
                    color: "#fff",
                    width: 56,
                    height: 56,
                    borderRadius: "16px 0 0 0",
                    position: "relative",
                    overflow: "hidden",
                    backdropFilter: "blur(10px)",
                    transition:
                      "transform .32s ease, background-color .32s ease, box-shadow .32s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(135deg, ${SECONDARY}22, rgba(255,255,255,0.04))`,
                      opacity: 0.6,
                      transition: "opacity .32s ease",
                    },
                    "&:hover": {
                      background: SECONDARY,
                      transform: "translateY(-3px) scale(1.04)",
                      boxShadow: `0 10px 22px rgba(62, 184, 175, 0.24)`,
                    },
                    "&:hover::before": {
                      opacity: 1,
                    },
                  }}
                >
                  <ArrowForwardIcon
                    sx={{ fontSize: 24, position: "relative", zIndex: 1 }}
                  />
                </IconButton>
              </Box>
            </SpotlightCard>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
