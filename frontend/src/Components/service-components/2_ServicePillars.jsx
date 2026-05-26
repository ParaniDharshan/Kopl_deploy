import React from "react";
import { Box, Container, Grid, Typography, Chip } from "@mui/material";
import { SERVICES, PRIMARY, SECONDARY } from "../../constants";

export default function ServicePillars() {
  return (
    <>
      {SERVICES.map((s, i) => (
        <Box
          key={i}
          sx={{
            pt: { xs: 4, md: 6 },   // ✅ reduced top space
            pb: { xs: 8, md: 10 },  // ✅ keeps bottom spacing balanced
            background:
              i % 2 !== 0
                ? `linear-gradient(160deg,${s.color}08 0%,transparent 60%)`
                : "transparent",
          }}
        >
          <Container maxWidth="lg">
            <Grid
              container
              spacing={6}
              alignItems="center"
              direction={i % 2 !== 0 ? "row-reverse" : "row"}
            >
              {/* LEFT CARD */}
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "24px",
                    background: `linear-gradient(135deg,${s.color}15,${s.color}08)`,
                    border: `2px solid ${s.color}25`,
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "5rem", mb: 2 }}>
                    {s.icon}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: s.color, mb: 1 }}
                  >
                    Pillar {i + 1} of 3
                  </Typography>

                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {s.title}
                  </Typography>

                  <Chip
                    label={s.tag}
                    sx={{
                      mt: 2,
                      background: `${s.color}20`,
                      color: s.color,
                      fontWeight: 700,
                    }}
                  />
                </Box>
              </Grid>

              {/* RIGHT CONTENT */}
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, mb: 2 }}
                >
                  {s.title}
                </Typography>

                <Typography
                  sx={{
                    opacity: 0.72,
                    lineHeight: 1.85,
                    mb: 3,
                  }}
                >
                  {s.summary}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  {s.items.map((item) => (
                    <Box
                      key={item}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 20,
                          color: s.color,
                          mt: 0.2,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.8,
                          lineHeight: 1.7,
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}
    </>
  );
}