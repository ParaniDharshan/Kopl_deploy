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
import ScienceIcon from "@mui/icons-material/Science";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GavelIcon from "@mui/icons-material/Gavel";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StarIcon from "@mui/icons-material/Star";
import { PRIMARY, SECONDARY } from "../../Constants";
import PERI_SIR_IMAGE from "../../assets/Images/Peri_Sir_Image.png";
import { MailIcon } from "lucide-react";
import FounderJourneyModal from "./Model";
import { NavLink, useNavigate } from "react-router-dom";

const PRIMARY_LIGHT = "#E8F4FC";
const SECONDARY_LIGHT = "#E8F8F7";
const DARK = "#0d3b5e";

const NAVY = "#0d2d45";
const MUTED = "#6b8ca4";

const primaryGrad = `linear-gradient(135deg, ${PRIMARY} 0%, #1568a0 100%)`;
const secondaryGrad = `linear-gradient(135deg, ${SECONDARY} 0%, #2a9990 100%)`;

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT HELPERS  — Box flexbox only, no MUI Grid anywhere
// ─────────────────────────────────────────────────────────────────────────────

/** Responsive flex row — wraps to column on narrow screens automatically */
function FlexRow({ children, gap = 3, sx = {}, ...props }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap, ...sx }} {...props}>
      {children}
    </Box>
  );
}

/** Flex child — grows equally; stacks when viewport is too narrow for `basis` */
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

const milestones = [
  {
    icon: <School />,
    year: "50+ yrs ago",
    title: "Florida State University",
    detail:
      "Doctorate in Chemistry — the scientific rigour behind every analytical business decision.",
  },
  {
    icon: <School />,
    year: "Post-doctorate",
    title: "Saint Louis University",
    detail:
      "MBA & Law Degree, international business focus — the legal and financial backbone of structured outsourcing.",
  },
  {
    icon: <Business />,
    year: "Career",
    title: "Mallinckrodt Corporation",
    detail:
      "Deep fluency in American business culture: results-driven decisions, zero tolerance for quality lapses.",
  },
  {
    icon: <Public />,
    year: "2012",
    title: "Chesterfield Chamber — Education Committee",
    detail:
      "Led for ~3 years, developing direct understanding of local small-business priorities.",
  },
  {
    icon: <Public />,
    year: "2014–2019",
    title: "Chamber Board of Directors · Chairman 2019",
    detail:
      "Five years of board-level governance, culminating in the chairmanship.",
  },
  {
    icon: <Public />,
    year: "2017–Present",
    title: "Finance & Admin Advisory Committee — Chesterfield",
    detail:
      "Ongoing civic role deepening understanding of local government and the small businesses it serves.",
  },
];

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

function CivicStepper({ visible }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setActive((p) => (p < civicTimeline.length - 1 ? p + 1 : p));
    }, 700);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {civicTimeline.map((item, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 20,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                mt: "4px",
                flexShrink: 0,
                background: i <= active ? PRIMARY : "#E0E0E0",
                border:
                  i === active
                    ? `2.5px solid ${SECONDARY}`
                    : "2px solid transparent",
                transition: "background 0.4s, border 0.4s",
                boxShadow: i === active ? `0 0 0 3px ${PRIMARY_LIGHT}` : "none",
              }}
            />
            {i < civicTimeline.length - 1 && (
              <Box
                sx={{
                  width: 2,
                  flex: 1,
                  minHeight: 28,
                  background: i < active ? PRIMARY : "#E0E0E0",
                  transition: "background 0.4s",
                  mt: "2px",
                  mb: "2px",
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              pb: i < civicTimeline.length - 1 ? 1.5 : 0,
              opacity: i <= active ? 1 : 0.3,
              transition: "opacity 0.4s",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: PRIMARY,
                fontFamily: "monospace",
                letterSpacing: 0.5,
              }}
            >
              {item.year}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#37474F", lineHeight: 1.5, fontSize: "0.82rem" }}
            >
              {item.event}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default function FounderSection() {
  const [ref, visible] = useInView(0.1);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const dark = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: 10, bgcolor: "background.paper" }}>
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
          Meet Our Founder
        </Typography>

        {/* Bio block */}
        <Box
          sx={{
            mb: 6,
            borderRadius: 3,
          }}
        >
          {/* bio */}
          <FlexRow gap={4}>
            {/* Left cell with image */}
            <FlexCell basis="300px">
              <Box
                sx={{
                  position: "relative",
                  width: "80%",
                  height: "100%",
                  borderRadius: 1,
                  overflow: "hidden",
                  boxShadow: 3,
                  "&:hover .overlay": {
                    opacity: 1, // show overlay on hover
                  },
                }}
              >
                {/* Founder Image */}
                <Box
                  component="img"
                  src={PERI_SIR_IMAGE}
                  alt="M. Peri Periasamy"
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Overlay with name, role, buttons */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    p: 2,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(3,18,33,0.78) 100%)",
                    color: "#fff",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Box sx={{ width: "100%" }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: "wrap", gap: 1 }}
                    >
                      <Button
                        href="mailto:peri@example.com"
                        variant="contained"
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          textTransform: "none",
                          fontWeight: 700,
                          borderRadius: 999,
                          bgcolor: "transparent",
                          color: "#fff",
                          backdropFilter: "blur(10px)",
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        <MailIcon />
                      </Button>

                      <Button
                        href="https://www.linkedin.com/in/peri-periasamy"
                        target="_blank"
                        rel="noreferrer"
                        variant="contained"
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          fontWeight: 700,
                          borderRadius: 999,
                          bgcolor: "transparent",
                          color: "#fff",
                          backdropFilter: "blur(10px)",
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        <LinkedIn />
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </FlexCell>

            <FlexCell
              basis="300px"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: PRIMARY, mb: 2 }}
              >
                Who is M.P Periyasamy ?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.9, mb: 2 }}
              >
                Peri was born and raised in Madurai, Tamil Nadu, India. His
                father owned a small hardware distribution company — and from
                his earliest years, Peri worked there during summers and college
                breaks, learning what it truly means to operate a small
                business.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.9 }}
              >
                He moved to the United States more than 50 years ago, earned a
                doctorate at Florida State University, then an MBA and Law
                degree from Saint Louis University with a concentration in
                international business.
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 3 }}>
                {[
                  "30+ yrs Chesterfield",
                  "PhD Chemistry",
                  "MBA + JD",
                  "Chamber Chairman 2019",
                ].map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{
                      bgcolor: SECONDARY,
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  />
                ))}
              </Box>
              {/* Trigger Button — drop this wherever you need it */}
              <Button
                variant="outlined"
                onClick={() => setOpen(true)}
                sx={{
                  borderColor: `${PRIMARY}55`,
                  color: PRIMARY,
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  mt: 3,
                  "&:hover": {
                    borderColor: PRIMARY,
                    background: `${PRIMARY}0e`,
                  },
                }}
              >
                View Peri's Journey
              </Button>
            </FlexCell>
          </FlexRow>
        </Box>

        {/* Milestone grid */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}
        >
          Civic &amp; Professional Journey
        </Typography>

        <FlexRow gap={3}>
          {milestones.map((m) => (
            <FlexCell key={m.title} basis="270px">
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "background.default",
                  border: `1px solid ${dark ? "#1d3a52" : "#ddeaf5"}`,
                  transition: "box-shadow .2s, transform .2s",
                  "&:hover": {
                    boxShadow: "0 8px 32px rgba(29,137,200,.13)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      bgcolor: `${SECONDARY}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: SECONDARY,
                      mb: 2,
                    }}
                  >
                    {m.icon}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: PRIMARY,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    {m.year}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mt: 0.5,
                      mb: 1,
                    }}
                  >
                    {m.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.7 }}
                  >
                    {m.detail}
                  </Typography>
                </CardContent>
              </Card>
            </FlexCell>
          ))}
        </FlexRow>

        {/* Quote */}
        <Box
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 3,
            bgcolor: NAVY,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              color: "rgba(255,255,255,.88)",
              lineHeight: 1.9,
            }}
          >
            &ldquo;Both experiences allowed me to better understand the business
            needs of small companies in the Chesterfield region.&rdquo;
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 2,
              color: SECONDARY,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            — M. PERI PERIASAMY
          </Typography>
        </Box>
      </Container>
      {open && (
        <FounderJourneyModal open={open} onClose={() => setOpen(false)} />
      )}
    </Box>
  );
}
