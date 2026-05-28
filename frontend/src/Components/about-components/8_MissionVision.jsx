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
import ScienceIcon from "@mui/icons-material/Science";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GavelIcon from "@mui/icons-material/Gavel";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StarIcon from "@mui/icons-material/Star";
import { PRIMARY, SECONDARY } from "../../Constants";
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
} from "@mui/icons-material";

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

const missionCards = [
  {
    icon: <TrackChanges sx={{ fontSize: 36 }} />,
    title: "Our Mission",
    body: "To provide cost-effective, high-quality, and reliable business outsourcing — delivered in a timely and secure manner, consistently meeting the needs and expectations of our clients.",
    bg: primaryGrad,
  },
  {
    icon: <Visibility sx={{ fontSize: 36 }} />,
    title: "Our Vision",
    body: "To build an outsourcing ecosystem where capability, security, and dependability converge — creating lasting value for businesses, teams, and the regions we serve.",
    bg: secondaryGrad,
  },
  {
    icon: <Flag sx={{ fontSize: 36 }} />,
    title: "Our Goal",
    body: "To become the most trusted outsourcing partner for small businesses in the Chesterfield region — known for accountability, precision, and results that consistently exceed expectations.",
    bg: `linear-gradient(135deg, ${NAVY} 0%, #1a3f5c 100%)`,
  },
];

const MOTTO =
  "Our motto is to promise what we can deliver, and then deliver what we promised. Our strategy, however, is to deliver more than we promised.";

export default function MissionVision() {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: 5, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "justify" }}>
          <Chip
            label="Who we are"
            sx={{
              mb: 2,
              color: SECONDARY,
              fontWeight: 700,
            }}
          />
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, mb: 2 }}
          >
            Why CRKL Inc. Exists
          </Typography>
          <Typography
            sx={{ opacity: 0.65, mx: "auto", lineHeight: 1.8, mb: 2 }}
          >
            CRKL Inc. is a U.S. corporation registered in the state of Missouri.
            Peri founded it with one conviction: that small businesses in
            Chesterfield deserve access to the same high-quality, cost-effective
            outsourcing that large corporations have long benefited from — and
            they deserve it with the trust, accountability, and management
            structure that makes it genuinely viable.
          </Typography>
        </Box>
        {/* Three equal cards */}
        <FlexRow gap={3}>
          {missionCards.map((c) => (
            <FlexCell key={c.title} basis="260px">
              <Card
                elevation={0}
                sx={{
                  bgcolor: "background.default",
                  border: `1px solid ${dark ? "#1d3a52" : "#ddeaf5"}`,
                  transition: "box-shadow .2s, transform .2s",
                  "&:hover": {
                    boxShadow: "0 8px 32px rgba(29,137,200,.13)",
                    transform: "translateY(-4px)",
                  },
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
					          textAlign: "center"
                  }}
                >
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
                    {c.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {c.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.85, opacity: 0.92, flexGrow: 1 }}
                  >
                    {c.body}
                  </Typography>
                </CardContent>
              </Card>
            </FlexCell>
          ))}
        </FlexRow>
      </Container>
    </Box>
  );
}
