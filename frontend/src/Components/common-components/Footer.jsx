import React from "react";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import {
  PRIMARY,
  SECONDARY,
  NAV_LINKS,
  CONTACT_INFO,
} from "../../Constants.js";

function Footer({ mode }) {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        background: `linear-gradient(160deg,${SECONDARY}0d 0%,${PRIMARY}0d 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: { xs: "center", md: "space-between" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "'Sora',sans-serif",
                fontWeight: 800,
                fontSize: "1.3rem",
                background: `linear-gradient(90deg,${PRIMARY},${SECONDARY})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              KOPL
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.55, lineHeight: 1.8, mb: 1 }}
            >
              India -Managed Business Outsourcing
              <br />
              Madurai, Tamilnadu
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.4 }}>
              kopl.com
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
              Quick Links
            </Typography>
            {NAV_LINKS.map((l) => (
              <Typography
                key={l}
                variant="body2"
                sx={{
                  mb: 0.75,
                  opacity: 0.55,
                  cursor: "pointer",
                  "&:hover": { opacity: 1, color: PRIMARY },
                }}
              >
                {l}
              </Typography>
            ))}
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Contact</Typography>
            <Typography variant="body2" sx={{ opacity: 0.55, mb: 0.5 }}>
              {CONTACT_INFO.email}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.55, mb: 0.5 }}>
              {CONTACT_INFO.phone}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.55 }}>
              {CONTACT_INFO.location}
            </Typography>
          </Box>
        </Box>

        {/*<Divider sx={{ my:4, borderColor:"rgba(255,255,255,0.08)" }} />
        <Box sx={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:1 }}>
          <Typography variant="caption" sx={{ opacity:0.35 }}>
            © {new Date().getFullYear()} KOPL All rights reserved. Chesterfield, Missouri.
          </Typography>
          <Typography variant="caption" sx={{ opacity:0.35 }}>
            Privacy Policy · Terms of Service
          </Typography>
        </Box>*/}
      </Container>
    </Box>
  );
}

export default Footer;

