import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Divider,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import { motion } from "framer-motion";
import { PRIMARY, SECONDARY, CONCERNS } from "../../Constants.js";

// ── Dark panel bg ────────────────────────────────────────────
const DARK_BG = "#07131f";

// ── Styled accordion — exact same as your original ──────────
const FAQAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: "12px !important",
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.04)"
      : "rgba(255,255,255,0.85)",
  backdropFilter: "blur(8px)",
  transition: "transform 180ms ease, box-shadow 180ms ease",
  "&:before": { display: "none" },
  "&.Mui-expanded": {
    margin: "0 !important",
    transform: "translateY(-1px)",
  },
}));

const FAQSummary = styled(AccordionSummary)(() => ({
  padding: "0 16px",
  minHeight: 60,
  "& .MuiAccordionSummary-content": {
    margin: "14px 0",
    alignItems: "center",
  },
}));

// ── Per-category metadata ────────────────────────────────────
// Icon, short tagline, accent side (which color leads left panel)
const GROUP_META = [
  {
    label: "Trust & Accountability",
    Icon: VerifiedOutlinedIcon,
    tagline: "Your account is owned by you. We exist to serve it.",
    accent: PRIMARY,
  },
  {
    label: "Data Security & Confidentiality",
    Icon: LockOutlinedIcon,
    tagline: "Your financials never leave a controlled, auditable environment.",
    accent: SECONDARY,
  },
  {
    label: "Cost, Pricing & Value",
    Icon: PaidOutlinedIcon,
    tagline: "Every dollar scoped. No invoices that catch you off guard.",
    accent: PRIMARY,
  },
  {
    label: "Process & Onboarding",
    Icon: RocketLaunchOutlinedIcon,
    tagline: "We guide you through every step. You don't figure it out alone.",
    accent: SECONDARY,
  },
  {
    label: "IT Services",
    Icon: LaptopOutlinedIcon,
    tagline: "Technical delivery in plain language. You describe the outcome.",
    accent: PRIMARY,
  },
];

// ── Card entrance animation ──────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FaqGroup() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [expanded, setExpanded] = useState(false);
  const toggle = (p) => (_, isExp) => setExpanded(isExp ? p : false);

  const FAQ_GROUPS = [
    { label: "Trust & Accountability", items: CONCERNS.slice(0, 4) },
    {
      label: "Data Security & Confidentiality",
      items: [
        {
          q: "Who has access to my QuickBooks or financial systems?",
          a: "Only the specific team members assigned to your engagement. Access is role-limited, monitored, and can be revoked at any time. We use cloud-based systems with access logs, so there is always a verifiable record.",
        },
        {
          q: "What happens to my data if we end the engagement?",
          a: "Your data belongs to you. Upon engagement closure, all access is revoked, and data handling procedures are followed per the terms of your agreement. We can walk you through exactly what this looks like before you sign anything.",
        },
      ],
    },
    {
      label: "Cost, Pricing & Value",
      items: [
        {
          q: "Are there hidden costs I should know about?",
          a: "No. Every engagement is scoped in writing before it begins. Costs, scope, and any potential additions are discussed transparently upfront. You will not receive surprise invoices.",
        },
        {
          q: "Can I start with just one service and expand later?",
          a: "Yes. Most clients begin with one focused area — typically bookkeeping or tax support — and expand as they see results. We grow with your business at your pace.",
        },
      ],
    },
    {
      label: "Process & Onboarding",
      items: [
        {
          q: "What information do I need to provide to get started?",
          a: "Typically: access to your accounting software (QuickBooks), a summary of your current processes, any existing reports or chart of accounts, and your preferred reporting formats. We guide you through a checklist — you don't need to figure it out alone.",
        },
        {
          q: "Can I stop or pause the engagement if my needs change?",
          a: "Yes. Engagement terms are discussed clearly upfront, including exit and pause conditions. We believe in long-term relationships built on results — not lock-in contracts that trap clients.",
        },
      ],
    },
    {
      label: "IT Services",
      items: [
        {
          q: "Do I need a technical background to work with your IT team?",
          a: "No. Our IT team translates technical requirements into plain business language. You describe the problem or the outcome you want — we handle the implementation and report back in terms you can act on.",
        },
        {
          q: "What kind of businesses is the IT service suited for?",
          a: "SMEs that need reliable web development, automation, or IT system support — but do not have the volume to justify a full-time in-house developer or IT manager.",
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: isDark
          ? `linear-gradient(180deg, ${DARK_BG} 0%, #050e18 100%)`
          : `linear-gradient(160deg, ${PRIMARY}0d 0%, ${SECONDARY}0d 100%)`,
      }}
    >
      <Container maxWidth="lg">
        {/* ── Section header ── */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label="FAQ"
            sx={{
              mb: 2,
              background: `${SECONDARY}20`,
              color: SECONDARY,
              fontWeight: 800,
              px: 1.2,
              fontSize: "0.78rem",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              mb: 1.5,
              fontWeight: 800,
              color: isDark ? "common.white" : "text.primary",
            }}
          >
            Every question answered
          </Typography>
          <Typography
            sx={{
              opacity: isDark ? 0.82 : 0.65,
              maxWidth: 580,
              mx: "auto",
              lineHeight: 1.8,
              color: isDark ? "rgba(255,255,255,0.78)" : "text.secondary",
            }}
          >
            Organized by topic — find what matters to you on the left, expand
            the answers on the right.
          </Typography>
        </Box>

        {/* ── Cards ── */}
        <Stack spacing={3}>
          {FAQ_GROUPS.map((group, gi) => {
            const meta =
              GROUP_META.find((m) => m.label === group.label) || GROUP_META[0];
            const accent = meta.accent;
            const Icon = meta.Icon;
            const isAltAccent = accent === SECONDARY;

            return (
              <motion.div
                key={gi}
                custom={gi}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <Box
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`,
                    background: isDark
                      ? "rgba(13,33,55,0.82)"
                      : "rgba(255,255,255,0.78)",
                    backdropFilter: "blur(14px)",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    boxShadow: isDark
                      ? "0 8px 40px rgba(0,0,0,0.3)"
                      : `0 8px 40px ${PRIMARY}0e`,
                    transition: "box-shadow 0.25s",
                    "&:hover": {
                      boxShadow: isDark
                        ? "0 16px 56px rgba(0,0,0,0.42)"
                        : `0 16px 56px ${accent}1a`,
                    },
                  }}
                >
                  {/* ══ LEFT — heading panel ══ */}
                  <Box
                    sx={{
                      width: { xs: "100%", md: "300px" },
                      flexShrink: 0,
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: { xs: 3, md: 4 },
                      background: isDark
                        ? `linear-gradient(145deg, ${accent}22 0%, ${accent}08 100%)`
                        : `linear-gradient(145deg, ${accent}14 0%, ${accent}05 100%)`,
                      borderRight: {
                        md: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
                      },
                      borderBottom: {
                        xs: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
                        md: "none",
                      },
                    }}
                  >
                    {/* Decorative ring — top right */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -40,
                        right: -40,
                        width: 140,
                        height: 140,
                        borderRadius: "50%",
                        border: `1.5px solid ${accent}30`,
                        pointerEvents: "none",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: -14,
                        right: -14,
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        border: `1px solid ${accent}20`,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Icon badge */}
                    <Box>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `${accent}18`,
                          border: `1px solid ${accent}35`,
                          mb: 2.5,
                        }}
                      >
                        <Icon sx={{ fontSize: 22, color: accent }} />
                      </Box>

                      {/* Category number */}
                      <Typography
                        sx={{
                          fontSize: "0.62rem",
                          fontWeight: 800,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: accent,
                          mb: 0.8,
                          opacity: 0.75,
                        }}
                      >
                        {String(gi + 1).padStart(2, "0")} /{" "}
                        {String(FAQ_GROUPS.length).padStart(2, "0")}
                      </Typography>

                      {/* Category title */}
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "1.15rem", md: "1.22rem" },
                          lineHeight: 1.28,
                          color: isDark ? "#fff" : "#0d1f1c",
                          mb: 1.5,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {group.label}
                      </Typography>

                      {/* Tagline */}
                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          lineHeight: 1.7,
                          color: isDark
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.45)",
                        }}
                      >
                        {meta.tagline}
                      </Typography>
                    </Box>

                    {/* Question count pill — bottom */}
                    <Box sx={{ mt: 3 }}>
                      <Chip
                        label={`${group.items.length} question${group.items.length > 1 ? "s" : ""}`}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          background: `${accent}18`,
                          color: isAltAccent
                            ? isDark
                              ? SECONDARY
                              : "#7a5200"
                            : isDark
                              ? "#7dd4bc"
                              : PRIMARY,
                          border: `1px solid ${accent}30`,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* ══ RIGHT — accordion list ══ */}
                  <Box
                    sx={{
                      flex: 1,
                      p: { xs: 2.5, md: 3.5 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 1.2,
                    }}
                  >
                    {group.items.map((item, i) => {
                      const key = `g${gi}-i${i}`;
                      const isOpen = expanded === key;

                      return (
                        <FAQAccordion
                          key={key}
                          expanded={isOpen}
                          onChange={toggle(key)}
                          disableGutters
                          elevation={0}
                          sx={{
                            boxShadow: isOpen
                              ? isDark
                                ? `0 8px 28px rgba(0,0,0,0.3)`
                                : `0 8px 28px ${accent}14`
                              : "none",
                            borderColor: isOpen
                              ? `${accent}45`
                              : isDark
                                ? "rgba(255,255,255,0.07)"
                                : "rgba(0,0,0,0.07)",
                          }}
                        >
                          <FAQSummary
                            expandIcon={
                              <Box
                                sx={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: "8px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: isOpen
                                    ? `${accent}18`
                                    : "transparent",
                                  transition: "background 0.18s",
                                }}
                              >
                                <ExpandMoreIcon
                                  sx={{
                                    fontSize: 18,
                                    color: isOpen
                                      ? accent
                                      : isDark
                                        ? "rgba(255,255,255,0.3)"
                                        : "rgba(0,0,0,0.3)",
                                    transition: "color 0.18s",
                                  }}
                                />
                              </Box>
                            }
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                pr: 1,
                              }}
                            >
                              {/* Q badge */}
                              <Box
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "10px",
                                  display: "grid",
                                  placeItems: "center",
                                  flexShrink: 0,
                                  background: isOpen
                                    ? `${accent}18`
                                    : isDark
                                      ? "rgba(255,255,255,0.05)"
                                      : "rgba(0,0,0,0.04)",
                                  border: `1px solid ${isOpen ? accent + "35" : "transparent"}`,
                                  transition: "all 0.18s",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "0.72rem",
                                    fontWeight: 800,
                                    color: isOpen
                                      ? accent
                                      : isDark
                                        ? "rgba(255,255,255,0.35)"
                                        : "rgba(0,0,0,0.3)",
                                    transition: "color 0.18s",
                                    letterSpacing: "0.02em",
                                  }}
                                >
                                  Q
                                </Typography>
                              </Box>

                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "0.95rem",
                                  lineHeight: 1.45,
                                  color: isDark
                                    ? "rgba(255,255,255,0.9)"
                                    : "#0d1f1c",
                                }}
                              >
                                {item.q}
                              </Typography>
                            </Box>
                          </FAQSummary>

                          <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                            {/* Thin accent rule */}
                            <Box
                              sx={{
                                height: "2px",
                                width: 36,
                                borderRadius: 1,
                                background: `linear-gradient(90deg, ${accent}, transparent)`,
                                mb: 1.5,
                                ml: "46px",
                              }}
                            />
                            <Typography
                              sx={{
                                lineHeight: 1.85,
                                fontSize: "0.88rem",
                                pl: "46px",
                                color: isDark
                                  ? "rgba(255,255,255,0.72)"
                                  : "rgba(0,0,0,0.62)",
                              }}
                            >
                              {item.a}
                            </Typography>
                          </AccordionDetails>
                        </FAQAccordion>
                      );
                    })}
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Stack>

        {/* ── Footer CTA ── */}
        <Box sx={{ textAlign: "center", mt: 7 }}>
          <Typography
            sx={{
              fontSize: "0.88rem",
              color: isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)",
            }}
          >
            Still have a question?{" "}
            <Box
              component="a"
              href="mailto:hello@crklinc.com"
              sx={{
                color: SECONDARY,
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              hello@crklinc.com
            </Box>{" "}
            or{" "}
            <Box
              component="a"
              href="#contact"
              sx={{
                color: PRIMARY,
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              book a free discovery call →
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
