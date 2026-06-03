import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
  useTheme,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import {
  TrackChanges,
  Visibility,
  Flag,
  FormatQuote,
  Business,
  School,
  Public,
  ExpandMore,
  ExpandLess,
  CheckCircleOutlined,
  ArrowForward,
  LinkedIn,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GavelIcon from "@mui/icons-material/Gavel";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StarIcon from "@mui/icons-material/Star";
import { alpha } from "@mui/material/styles";
import { PRIMARY, SECONDARY } from "../../Constants.js";
import PERI_SIR_IMAGE from "../../assets/Images/Peri_Sir_Image.png";
import { MailIcon } from "lucide-react";
import FounderJourneyModal from "./Model";
import { NavLink, useNavigate } from "react-router-dom";

// Leadership image for Beulah
const LEADER_IMG = new URL("../../assets/Our Team/2.webp", import.meta.url).href;

const PRIMARY_LIGHT = "#E8F4FC";
const SECONDARY_LIGHT = "#E8F8F7";
const DARK = "#0d3b5e";

const NAVY = "#0d2d45";
const MUTED = "#6b8ca4";

const primaryGrad = `linear-gradient(135deg, ${PRIMARY} 0%, #1568a0 100%)`;
const secondaryGrad = `linear-gradient(135deg, ${SECONDARY} 0%, #2a9990 100%)`;

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function FlexRow({ children, gap = 3, sx = {}, ...props }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap, ...sx }} {...props}>
      {children}
    </Box>
  );
}

function FlexCell({ children, basis = "280px", grow = 1, sx = {}, ...props }) {
  return (
    <Box sx={{ flex: `${grow} 1 ${basis}`, minWidth: 0, ...sx }} {...props}>
      {children}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────
function SectionHeader({
  overline,
  title,
  subtitle,
  description,
  onDark = false,
}) {
  return (
    <Box sx={{ textAlign: "start", mb: 6 }}>
      <Typography
        variant="overline"
        sx={{
          color: onDark ? "rgba(255,255,255,0.6)" : PRIMARY,
          fontWeight: 700,
          letterSpacing: 3,
          fontSize: 12,
        }}
      >
        {overline}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: onDark ? "#fff" : NAVY,
          mt: 0.5,
          mb: subtitle ? 2 : 0,
          fontSize: { xs: "1.8rem", md: "2.4rem" },
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: onDark ? "rgba(255,255,255,0.62)" : MUTED,
            maxWidth: 580,
            mx: "auto",
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          {subtitle}
        </Typography>
      )}

      <Typography sx={{ opacity: 0.65, lineHeight: 1.8 }}>
        {description}
      </Typography>

      <Divider
        sx={{
          width: 56,
          height: 4,
          bgcolor: onDark ? SECONDARY : PRIMARY,
          borderRadius: 2,
          border: "none",
          mt: subtitle ? 0 : 2,
        }}
      />
    </Box>
  );
}

const LEADERSHIP_TAGS = [
  "Project Management",
  "Technology Execution",
  "TCS Alumni",
  "Avgira Technologies",
  "Multi-lingual",
];

const LEADERSHIP_LANGS = ["English", "Hindi", "Tamil", "Telugu"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function BentoCard({ children, sx = {}, delay = 0, visible }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #E0EEF7",
        borderRadius: "16px",
        p: { xs: 2.5, md: 3 },
        background: "#fff",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}

export default function FounderSection() {
  const [ref, visible] = useInView(0.1);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const dark = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: 5, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Chip
          label="Leadership"
          sx={{
            mb: 2,
            background: `${SECONDARY}20`,
            color: SECONDARY,
            fontWeight: 700,
          }}
        />
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, mb: 2 }}
        >
          Meet Our Leadership
        </Typography>

        {/* ── KOPL Leadership — Beulah (moved from KOPLIntroduction) ───────── */}
        <Box sx={{ mb: 6 }}>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row-reverse" },
              gap: { xs: 3, md: 5 },
              alignItems: "stretch",
            }}
          >
            {/* Content */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={(theme) => ({
                  fontWeight: 800,
                  mb: 0.4,
                  color: theme.palette.mode === "dark" ? "white" : NAVY,
                })}
              >
                Beulah Radhakrishnan
              </Typography>

              <Typography
                sx={{ color: SECONDARY, fontWeight: 700, fontSize: "0.92rem", mb: 0.4 }}
              >
                General Manager, KOPL
              </Typography>
              <Typography
                sx={{ opacity: 0.5, fontSize: "0.82rem", mb: 2 }}
              >
                B.Tech — Information Technology
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.9, mb: 2.5 }}
              >
                Beulah leads core operations and organisational development at
                KOPL. She brings over five years of consulting experience with
                KOPL and nearly three years as a Software Developer at Tata
                Consultancy Services — a combination of technical depth and
                business management capability directly applied to client
                engagement delivery. Her background also includes consulting at
                Avgira Technologies and entrepreneurial leadership across
                multiple ventures.
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 1.8 }}>
                {LEADERSHIP_TAGS.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={{
                      background: `${PRIMARY}15`,
                      color: PRIMARY,
                      fontWeight: 600,
                      fontSize: "0.7rem",
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 2.5 }}>
                {LEADERSHIP_LANGS.map((l) => (
                  <Chip
                    key={l}
                    label={l}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: `${SECONDARY}55`,
                      color: SECONDARY,
                      fontSize: "0.7rem",
                    }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  borderLeft: `3px solid ${SECONDARY}`,
                  pl: 2,
                  py: 0.75,
                  background: alpha(SECONDARY, 0.05),
                  borderRadius: "0 6px 6px 0",
                }}
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    opacity: 0.72,
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                  }}
                >
                  "Leadership is about coordination, clarity, and care."
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.74rem",
                    opacity: 0.48,
                    mt: 0.5,
                    fontWeight: 600,
                  }}
                >
                  — Beulah Radhakrishnan, General Manager, KOPL
                </Typography>
              </Box>
            </Box>

            {/* Image */}
            <Box
              sx={{
                width: { xs: "100%", md: "38%" },
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={LEADER_IMG}
                alt="KOPL Leadership - Beulah Radhakrishnan"
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 220, md: 340 },
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      {open && (
        <FounderJourneyModal open={open} onClose={() => setOpen(false)} />
      )}
    </Box>
  );
}