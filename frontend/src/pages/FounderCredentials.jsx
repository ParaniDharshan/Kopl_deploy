/**
 * ============================================================
 * FounderCredentials.jsx
 * Drop-in replacement for the Education / Career / Civic
 * section inside About() in CRKLWebsite.jsx
 * ============================================================
 *
 * HOW TO USE:
 * 1. Copy this file into your src/ folder.
 * 2. In CRKLWebsite.jsx, add this import at the top:
 *       import FounderCredentials from "./FounderCredentials";
 * 3. In the About() function, find this comment block:
 *       {/* ── EDUCATION & CAREER ── *\/}
 *       <Box sx={{ py:{ xs:6,md:10 }, background:... }}>
 *         <Container maxWidth="lg">
 *           <Grid container spacing={5}>
 *             ... (the 3 cards for Education / Career / Civic)
 *           </Grid>
 *         </Container>
 *       </Box>
 *    Replace THE ENTIRE BLOCK (Box + Container + Grid) with:
 *       <FounderCredentials />
 *
 * CUSTOMIZATION:
 * - Edit EDUCATION array  → degrees
 * - Edit CIVIC array      → timeline items
 * - Edit CAREER_TEXT      → career paragraph
 * - Edit STATS array      → 3 summary numbers at the top
 * - PRIMARY / SECONDARY   → already match your site colors
 * ============================================================
 */

import React, { useState } from "react";
import {
  Box, Container, Typography, Avatar, Chip,
  Grid, Card, CardContent, Collapse, Divider,
} from "@mui/material";
import {
  SchoolOutlined,
  BusinessCenterOutlined,
  EmojiEventsOutlined,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";

// ── Brand colors (already match your site) ──────────────────
const PRIMARY   = "#1d89c8";
const SECONDARY = "#3eb8af";

// ── DATA — edit these to update content ─────────────────────

const STATS = [
  { num: "3",   label: "Advanced degrees"        },
  { num: "5",   label: "Years on Chamber board"  },
  { num: "30+", label: "Years in Chesterfield"   },
];

const EDUCATION = [
  {
    degree: "Doctorate",
    field:  "Chemistry",
    uni:    "Florida State University",
    accent: PRIMARY,
  },
  {
    degree: "MBA",
    field:  "International Business",
    uni:    "Saint Louis University",
    accent: SECONDARY,
  },
  {
    degree: "Law Degree",
    field:  "Juris Doctor",
    uni:    "Saint Louis University",
    accent: PRIMARY,
  },
];

const CAREER_TEXT =
  "His career at Mallinckrodt — a multinational corporation headquartered in St. Louis — gave him deep exposure to American business culture: results-based decision-making, goals and target-date-driven operations, commitment to quality, cost discipline, and the essential role of trust and reliability in professional relationships.";

const CIVIC = [
  {
    year:   "2012",
    title:  "Joined Chesterfield Regional Chamber of Commerce",
    detail: "Became an active member of the Chamber, beginning a decade-long commitment to the Chesterfield business community.",
  },
  {
    year:   "2012 – 2015",
    title:  "Led Business Education Committee",
    detail: "Chaired the committee for approximately three years, connecting local businesses with education and professional development resources.",
  },
  {
    year:   "2014 – 2019",
    title:  "Board of Directors — Chamber",
    detail: "Served a five-year tenure on the Chamber's governing board, guiding strategic decisions for the regional business community.",
  },
  {
    year:   "2019",
    title:  "Chairman of the Board",
    detail: "Elected to the highest leadership role at the Chesterfield Regional Chamber of Commerce — the culmination of seven years of civic service.",
  },
  {
    year:   "2017 – Present",
    title:  "Finance & Admin Citizens Advisory Committee",
    detail: "Serves on the City of Chesterfield's Finance & Administration Citizens Advisory Committee, advising on municipal financial policy.",
  },
];

// ── TAB CONFIG ───────────────────────────────────────────────
const TABS = [
  { id: "education", label: "Education",        Icon: SchoolOutlined          },
  { id: "career",    label: "Career",            Icon: BusinessCenterOutlined  },
  { id: "civic",     label: "Civic leadership",  Icon: EmojiEventsOutlined     },
];

// ── EDUCATION PANEL ──────────────────────────────────────────
function EducationPanel() {
  return (
    <Grid container spacing={2}>
      {EDUCATION.map((e) => (
        <Grid item xs={12} sm={4} key={e.degree}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              border: `1px solid ${e.accent}25`,
              borderTop: `3px solid ${e.accent}`,
              borderRadius: "12px",
              transition: "transform .22s ease, box-shadow .22s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 12px 28px ${e.accent}20`,
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              {/* Icon circle */}
              <Box
                sx={{
                  width: 38, height: 38, borderRadius: "10px", mb: 1.5,
                  background: `${e.accent}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <SchoolOutlined sx={{ fontSize: 20, color: e.accent }} />
              </Box>

              <Typography
                sx={{ fontWeight: 700, fontSize: { xs: "0.9rem", sm: "0.95rem" }, mb: 0.25 }}
              >
                {e.degree}
              </Typography>
              <Typography
                sx={{ fontSize: "0.78rem", fontWeight: 600, color: e.accent, mb: 0.5 }}
              >
                {e.field}
              </Typography>
              <Typography
                variant="caption"
                sx={{ opacity: 0.55, display: "block", lineHeight: 1.4 }}
              >
                {e.uni}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

// ── CAREER PANEL ─────────────────────────────────────────────
function CareerPanel() {
  return (
    <Box>
      <Box
        sx={{
          borderLeft: `3px solid ${PRIMARY}`,
          pl: 2.5, py: 0.5,
          borderRadius: "0 8px 8px 0",
          background: (t) =>
            t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : `${PRIMARY}06`,
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem" }, lineHeight: 1.85, fontStyle: "italic", opacity: 0.85 }}
        >
          "{CAREER_TEXT}"
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex", alignItems: "center", gap: 1.5, mt: 2,
          p: 1.5, borderRadius: "10px",
          border: `1px solid rgba(0,0,0,0.08)`,
          background: (t) =>
            t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
        }}
      >
        <BusinessCenterOutlined sx={{ fontSize: 18, opacity: 0.4 }} />
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "0.88rem" }}>Mallinckrodt</Typography>
          <Typography variant="caption" sx={{ opacity: 0.55 }}>
            Multinational Corporation · St. Louis, MO
          </Typography>
        </Box>
        <Chip
          label="Corporate"
          size="small"
          sx={{
            ml: "auto", fontSize: "0.68rem",
            background: `${SECONDARY}15`, color: SECONDARY, fontWeight: 700,
          }}
        />
      </Box>
    </Box>
  );
}

// ── CIVIC TIMELINE PANEL ─────────────────────────────────────
function CivicPanel() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <Box>
      {CIVIC.map((item, i) => {
        const isOpen  = openIdx === i;
        const isLast  = i === CIVIC.length - 1;
        const accent  = i === 3 ? SECONDARY : PRIMARY; // highlight Chairman row

        return (
          <Box
            key={i}
            sx={{ display: "flex", gap: { xs: 1.5, sm: 2 } }}
          >
            {/* Spine */}
            <Box
              sx={{
                display: "flex", flexDirection: "column",
                alignItems: "center", width: 20, flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 10, height: 10, borderRadius: "50%",
                  mt: "5px", flexShrink: 0,
                  border: `2px solid ${isOpen ? accent : "rgba(0,0,0,0.18)"}`,
                  background: isOpen ? accent : "transparent",
                  transition: "all .2s ease",
                  transform: isOpen ? "scale(1.3)" : "scale(1)",
                }}
              />
              {!isLast && (
                <Box
                  sx={{
                    width: "1px", flex: 1, minHeight: 12, mt: 0.5, mb: 0.5,
                    background: "rgba(0,0,0,0.1)",
                  }}
                />
              )}
            </Box>

            {/* Content */}
            <Box
              sx={{ pb: 2, flex: 1, cursor: "pointer" }}
              onClick={() => setOpenIdx(isOpen ? -1 : i)}
            >
              <Box
                sx={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", gap: 1,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem", fontWeight: 700,
                      color: accent, mb: 0.25,
                    }}
                  >
                    {item.year}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.82rem", sm: "0.88rem" },
                      fontWeight: isOpen ? 600 : 500,
                      lineHeight: 1.45,
                      pr: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                {isOpen
                  ? <ExpandLessIcon sx={{ fontSize: 16, opacity: 0.35, mt: 0.25, flexShrink: 0 }} />
                  : <ExpandMoreIcon sx={{ fontSize: 16, opacity: 0.25, mt: 0.25, flexShrink: 0 }} />
                }
              </Box>

              <Collapse in={isOpen} timeout={300}>
                <Typography
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.82rem" },
                    lineHeight: 1.7, opacity: 0.62, mt: 0.75, pr: 1,
                  }}
                >
                  {item.detail}
                </Typography>
              </Collapse>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────
export default function FounderCredentials() {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: (t) =>
          t.palette.mode === "dark"
            ? `linear-gradient(160deg,${SECONDARY}08 0%,transparent 60%)`
            : `linear-gradient(160deg,${SECONDARY}06 0%,transparent 60%)`,
      }}
    >
      <Container maxWidth="lg">

        {/* ── Profile header card ── */}
        <Card
          elevation={0}
          sx={{
            border: `1px solid rgba(0,0,0,0.08)`,
            borderRadius: "18px",
            p: { xs: 2.5, sm: 3, md: 3.5 },
            mb: 3,
          }}
        >
          <Grid container spacing={{ xs: 2, sm: 3 }} alignItems="center">

            {/* Avatar + name */}
            <Grid item xs={12} sm="auto">
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: { xs: 54, sm: 64 },
                    height: { xs: 54, sm: 64 },
                    background: `linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
                    fontWeight: 800,
                    fontSize: { xs: "1.2rem", sm: "1.4rem" },
                    flexShrink: 0,
                    border: `3px solid ${PRIMARY}30`,
                  }}
                >
                  MP
                  {/* ← swap with src="peri-portrait.jpg" when ready */}
                </Avatar>
                <Box sx={{ display: { xs: "block", sm: "none" } }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>
                    M. Peri Periasamy
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.55 }}>
                    Founder — CRKL Inc. &amp; KOPL
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Name + badges — hidden on xs (shown inline above) */}
            <Grid item sm xs={12} sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography sx={{ fontWeight: 700, fontSize: { sm: "1.1rem", md: "1.2rem" }, mb: 0.25 }}>
                M. Peri Periasamy
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.55, mb: 1.25 }}>
                Founder — CRKL Inc. &amp; KOPL &nbsp;·&nbsp; Chesterfield, Missouri
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {["IRS Enrolled Agent", "Chamber Chairman 2019", "50+ Years in the U.S."].map((tag) => (
                  <Chip
                    key={tag} label={tag} size="small"
                    sx={{
                      fontSize: "0.68rem",
                      background: `${PRIMARY}14`, color: PRIMARY, fontWeight: 600,
                    }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Stats */}
            <Grid item xs={12} sm="auto">
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 0, sm: 0 },
                  border: `1px solid rgba(0,0,0,0.07)`,
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                {STATS.map((s, i) => (
                  <Box
                    key={s.label}
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      px: { xs: 2, sm: 2.5 },
                      py: { xs: 1.25, sm: 1.5 },
                      borderRight: i < STATS.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
                      minWidth: { xs: 72, sm: 80 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "1.3rem", sm: "1.5rem" },
                        color: i === 1 ? SECONDARY : PRIMARY,
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.55, display: "block", mt: 0.25, lineHeight: 1.3 }}
                    >
                      {s.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Mobile badges */}
          <Box sx={{ display: { xs: "flex", sm: "none" }, gap: 0.75, flexWrap: "wrap", mt: 1.5 }}>
            {["IRS Enrolled Agent", "Chamber Chairman 2019"].map((tag) => (
              <Chip
                key={tag} label={tag} size="small"
                sx={{ fontSize: "0.65rem", background: `${PRIMARY}14`, color: PRIMARY, fontWeight: 600 }}
              />
            ))}
          </Box>
        </Card>

        {/* ── Tab selector ── */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 1.5 },
            mb: 2.5,
            flexWrap: "wrap",
          }}
        >
          {TABS.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <Box
                key={id}
                onClick={() => setActiveTab(id)}
                sx={{
                  display: "flex", alignItems: "center",
                  gap: { xs: 0.6, sm: 0.75 },
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.75, sm: 0.9 },
                  borderRadius: "10px",
                  cursor: "pointer",
                  border: isActive ? `1.5px solid ${PRIMARY}50` : "1px solid rgba(0,0,0,0.09)",
                  background: isActive ? `${PRIMARY}10` : "transparent",
                  transition: "all .2s ease",
                  "&:hover": {
                    background: isActive ? `${PRIMARY}10` : "rgba(0,0,0,0.03)",
                    borderColor: isActive ? `${PRIMARY}50` : "rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Icon
                  sx={{
                    fontSize: { xs: 15, sm: 17 },
                    color: isActive ? PRIMARY : "inherit",
                    opacity: isActive ? 1 : 0.45,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "0.78rem", sm: "0.85rem" },
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? PRIMARY : "inherit",
                    opacity: isActive ? 1 : 0.65,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* ── Panel ── */}
        <Card
          elevation={0}
          key={activeTab}   /* re-mounts on tab change → triggers fade animation */
          sx={{
            border: `1px solid rgba(0,0,0,0.07)`,
            borderRadius: "16px",
            p: { xs: 2.5, sm: 3, md: 3.5 },
            animation: "credFadeUp 0.28s ease",
            "@keyframes credFadeUp": {
              from: { opacity: 0, transform: "translateY(8px)" },
              to:   { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {activeTab === "education" && <EducationPanel />}
          {activeTab === "career"    && <CareerPanel    />}
          {activeTab === "civic"     && <CivicPanel     />}
        </Card>

      </Container>
    </Box>
  );
}
