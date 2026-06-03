/**
 * AboutPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * KOPL — About Us
 *
 * THEME:   uses MUI useTheme() — works directly with your existing
 *          ThemeProvider in App.jsx. No extra context file needed.
 *
 * LAYOUT:  zero MUI Grid — all FlexRow / FlexCell (Box flexbox only)
 *
 * FONTS:   inherits Sora + DM Sans from your App.jsx theme
 *
 * BRAND:
 *   Primary   #1d89c8  Sky Blue
 *   Secondary #3eb8af  Teal Blue
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Button,
  Avatar,
  Stack,
  useTheme,
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
} from "@mui/icons-material";

// ─────────────────────────────────────────────────────────────────────────────
// BRAND TOKENS  (change here → updates everywhere)
// ─────────────────────────────────────────────────────────────────────────────
const PRIMARY   = "#1d89c8";
const SECONDARY = "#3eb8af";
const NAVY      = "#0d2d45";
const MUTED     = "#6b8ca4";

const primaryGrad   = `linear-gradient(135deg, ${PRIMARY} 0%, #1568a0 100%)`;
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
function SectionHeader({ overline, title, subtitle, onDark = false }) {
  return (
    <Box sx={{ textAlign: "center", mb: 6 }}>
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

      <Divider
        sx={{
          width: 56,
          height: 4,
          bgcolor: onDark ? SECONDARY : PRIMARY,
          borderRadius: 2,
          mx: "auto",
          border: "none",
          mt: subtitle ? 0 : 2,
        }}
      />
    </Box>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 1. MISSION / VISION / GOAL
// ═════════════════════════════════════════════════════════════════════════════
const missionCards = [
  {
    icon:  <TrackChanges sx={{ fontSize: 36 }} />,
    title: "Our Mission",
    body:  "To provide cost-effective, high-quality, and reliable business outsourcing — delivered in a timely and secure manner, consistently meeting the needs and expectations of our clients.",
    bg:    primaryGrad,
  },
  {
    icon:  <Visibility sx={{ fontSize: 36 }} />,
    title: "Our Vision",
    body:  "To build an outsourcing ecosystem where capability, security, and dependability converge — creating lasting value for businesses, teams, and the regions we serve.",
    bg:    secondaryGrad,
  },
  {
    icon:  <Flag sx={{ fontSize: 36 }} />,
    title: "Our Goal",
    body:  "To become the most trusted outsourcing partner for small businesses in the Chesterfield region — known for accountability, precision, and results that consistently exceed expectations.",
    bg:    `linear-gradient(135deg, ${NAVY} 0%, #1a3f5c 100%)`,
  },
];

const MOTTO =
  "Our motto is to promise what we can deliver, and then deliver what we promised. Our strategy, however, is to deliver more than we promised.";

function MissionVisionGoal() {
  const theme = useTheme();
  const dark  = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: 10, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <SectionHeader overline="Who We Are" title="Mission, Vision & Goal" />

        {/* Three equal cards */}
        <FlexRow gap={3}>
          {missionCards.map((c) => (
            <FlexCell key={c.title} basis="260px">
              <Card
                elevation={0}
                sx={{
                  background: c.bg,
                  color: "#fff",
                  borderRadius: 3,
                  height: "100%",
                  transition: "transform .25s, box-shadow .25s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 48px rgba(29,137,200,.22)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                  <Box sx={{ mb: 2.5, opacity: 0.85 }}>{c.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {c.title}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.85, opacity: 0.92, flexGrow: 1 }}>
                    {c.body}
                  </Typography>
                </CardContent>
              </Card>
            </FlexCell>
          ))}
        </FlexRow>

        {/* Motto banner */}
        <Box
          sx={{
            mt: 5,
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            bgcolor: "background.paper",
            border: `2px solid ${SECONDARY}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <FormatQuote
            sx={{
              fontSize: 120,
              color: SECONDARY,
              opacity: 0.07,
              position: "absolute",
              top: -10,
              left: 10,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontStyle: "italic",
              color: "text.primary",
              textAlign: "center",
              fontWeight: 500,
              lineHeight: 1.9,
              position: "relative",
              zIndex: 1,
            }}
          >
            &ldquo;{MOTTO}&rdquo;
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              mt: 2,
              color: MUTED,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            — M. PERI PERIASAMY, FOUNDER
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 2. FOUNDER SECTION
// ═════════════════════════════════════════════════════════════════════════════
const milestones = [
  {
    icon:   <School />,
    year:   "50+ yrs ago",
    title:  "Florida State University",
    detail: "Doctorate in Chemistry — the scientific rigour behind every analytical business decision.",
  },
  {
    icon:   <School />,
    year:   "Post-doctorate",
    title:  "Saint Louis University",
    detail: "MBA & Law Degree, international business focus — the legal and financial backbone of structured outsourcing.",
  },
  {
    icon:   <Business />,
    year:   "Career",
    title:  "Mallinckrodt Corporation",
    detail: "Deep fluency in American business culture: results-driven decisions, zero tolerance for quality lapses.",
  },
  {
    icon:   <Public />,
    year:   "2012",
    title:  "Chesterfield Chamber — Education Committee",
    detail: "Led for ~3 years, developing direct understanding of local small-business priorities.",
  },
  {
    icon:   <Public />,
    year:   "2014–2019",
    title:  "Chamber Board of Directors · Chairman 2019",
    detail: "Five years of board-level governance, culminating in the chairmanship.",
  },
  {
    icon:   <Public />,
    year:   "2017–Present",
    title:  "Finance & Admin Advisory Committee — Chesterfield",
    detail: "Ongoing civic role deepening understanding of local government and the small businesses it serves.",
  },
];

function FounderSection() {
  const theme = useTheme();
  const dark  = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: 10, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <SectionHeader overline="Leadership" title="Meet the Founder" />

        {/* Bio block */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            mb: 6,
            borderRadius: 3,
            bgcolor: "background.default",
            borderLeft: `5px solid ${PRIMARY}`,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>
            M. Peri Periasamy
          </Typography>
          <Typography variant="subtitle1" sx={{ color: PRIMARY, fontWeight: 600, mb: 3 }}>
            Founder — KOPL &amp; KOPL
          </Typography>

          {/* Two-col bio */}
          <FlexRow gap={4}>
            <FlexCell basis="300px">
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9, mb: 2 }}>
                Peri was born and raised in Madurai, Tamil Nadu, India. His father owned a small
                hardware distribution company — and from his earliest years, Peri worked there
                during summers and college breaks, learning what it truly means to operate a
                small business.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                He moved to the United States more than 50 years ago, earned a doctorate at
                Florida State University, then an MBA and Law degree from Saint Louis University
                with a concentration in international business.
              </Typography>
            </FlexCell>
            <FlexCell basis="300px">
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9, mb: 2 }}>
                His corporate career at Mallinckrodt gave him deep fluency in American business
                standards: results-driven decision-making, zero tolerance for quality lapses,
                and the understanding that trust is the minimum standard for every professional
                relationship.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                He has lived in Chesterfield for more than 30 years, raised his three daughters
                here, and invested deeply in the community through civic roles.
              </Typography>
            </FlexCell>
          </FlexRow>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 3 }}>
            {["30+ yrs Chesterfield", "PhD Chemistry", "MBA + JD", "Chamber Chairman 2019"].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{ bgcolor: PRIMARY, color: "#fff", fontWeight: 600, fontSize: 12 }}
              />
            ))}
          </Box>
        </Box>

        {/* Milestone grid */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>
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
                      width: 44, height: 44,
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
                    sx={{ color: PRIMARY, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}
                  >
                    {m.year}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary", mt: 0.5, mb: 1 }}>
                    {m.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                    {m.detail}
                  </Typography>
                </CardContent>
              </Card>
            </FlexCell>
          ))}
        </FlexRow>

        {/* Quote */}
        <Box sx={{ mt: 5, p: 4, borderRadius: 3, bgcolor: NAVY, textAlign: "center" }}>
          <Typography
            variant="body1"
            sx={{ fontStyle: "italic", color: "rgba(255,255,255,.88)", lineHeight: 1.9 }}
          >
            &ldquo;Both experiences allowed me to better understand the business needs of small
            companies in the Chesterfield region.&rdquo;
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 2, color: SECONDARY, fontWeight: 700, letterSpacing: 1.5 }}
          >
            — M. PERI PERIASAMY
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 3. CONCERNS SECTION
// ═════════════════════════════════════════════════════════════════════════════
const concerns = [
  {
    concern: '"I don\'t know who I\'m really dealing with on the other side."',
    answer:  "You are dealing with KOPL — a U.S. corporation in Chesterfield, Missouri. Your contract is with us. KOPL, our India delivery arm, operates under our direct oversight. You will never be handed off to an unknown foreign entity.",
  },
  {
    concern: '"What if the quality doesn\'t meet my standards?"',
    answer:  "You define the requirements. You conduct the virtual interview. You approve the candidate. KOPL and KOPL jointly monitor performance, output, and quality standards from day one — and we are contractually accountable.",
  },
  {
    concern: '"How do I know my data and confidential information are safe?"',
    answer:  "All work is performed in KOPL's dedicated, secure office in Madurai — not remotely or unsupervised. Full IT infrastructure and data security protocols are in place before work begins. KOPL owns this accountability.",
  },
  {
    concern: '"If something goes wrong, I have no recourse."',
    answer:  "Your legal and business recourse is entirely with KOPL — a Missouri-registered U.S. corporation. You do not navigate foreign legal systems. All accountability rests here, in Chesterfield.",
  },
  {
    concern: '"This will cost me more time and energy than it saves."',
    answer:  "You define the need. You select the person. Then KOPL and KOPL handle hiring, onboarding, HR, performance management, and daily oversight. You review the output. We manage everything else.",
  },
];

function ConcernsSection() {
  return (
    <Box sx={{ py: 10, background: `linear-gradient(160deg, #0d2d45 0%, #1a4a6b 100%)` }}>
      <Container maxWidth="lg">
        <SectionHeader
          overline="Transparency"
          title="We Understand Your Concerns"
          subtitle="If you are a small business owner considering outsourcing to India — you should have concerns. KOPL not only understands those concerns; they were the reason this company was built."
          onDark
        />

        {/* Column labels */}
        <FlexRow gap={0} sx={{ mb: 1, px: 1 }}>
          <FlexCell basis="38%" grow={2}>
            <Typography variant="overline" sx={{ color: SECONDARY, fontWeight: 700, letterSpacing: 2 }}>
              Your Concern
            </Typography>
          </FlexCell>
          <FlexCell basis="58%" grow={3}>
            <Typography variant="overline" sx={{ color: PRIMARY, fontWeight: 700, letterSpacing: 2 }}>
              Our Answer
            </Typography>
          </FlexCell>
        </FlexRow>

        <Stack spacing={2}>
          {concerns.map((item, idx) => (
            <Box key={idx} sx={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.28)" }}>
              <FlexRow gap={0}>
                {/* Concern */}
                <FlexCell
                  basis="35%"
                  grow={2}
                  sx={{
                    p: { xs: 3, md: 4 },
                    bgcolor: "rgba(255,255,255,.06)",
                    borderRight: `2px solid ${SECONDARY}25`,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                  }}
                >
                  <FormatQuote sx={{ color: SECONDARY, opacity: 0.55, mt: 0.3, flexShrink: 0 }} />
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic", color: "rgba(255,255,255,.85)", lineHeight: 1.85, fontWeight: 500 }}
                  >
                    {item.concern}
                  </Typography>
                </FlexCell>

                {/* Answer */}
                <FlexCell
                  basis="55%"
                  grow={3}
                  sx={{
                    p: { xs: 3, md: 4 },
                    bgcolor: "#fff",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                  }}
                >
                  <CheckCircleOutlined sx={{ color: SECONDARY, mt: 0.3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: "#334e65", lineHeight: 1.85 }}>
                    {item.answer}
                  </Typography>
                </FlexCell>
              </FlexRow>
            </Box>
          ))}
        </Stack>

        {/* Summary */}
        <Box sx={{ mt: 5, p: 4, borderRadius: 3, border: `2px solid ${SECONDARY}`, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#fff", fontStyle: "italic", fontWeight: 500, lineHeight: 1.9 }}>
            &ldquo;KOPL has taken full ownership of the concerns and risks associated with
            outsourcing to India — so that you do not have to.&rdquo;
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 4. ONE ROOF / KOPL
// ═════════════════════════════════════════════════════════════════════════════
const kopalSkills = [
  "Accounting & Finance", "U.S. Tax Preparation",
  "Business Management",  "IT Services", "Software Development",
];

function OneRoofSection() {
  const theme = useTheme();
  const dark  = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: 10, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <SectionHeader
          overline="Our Structure"
          title="One Roof. One Management."
          subtitle="Two companies. One founder. One standard of accountability."
        />

        {/* Architecture visual */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            mb: 7,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4, borderRadius: 3,
              background: primaryGrad,
              color: "#fff", textAlign: "center", minWidth: 210,
              boxShadow: "0 12px 40px rgba(29,137,200,.22)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>KOPL</Typography>
            <Typography variant="caption" sx={{ opacity: 0.85, display: "block", mt: 0.5 }}>
              Chesterfield, Missouri
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.72, display: "block", mt: 1 }}>
              U.S.-facing corporation · Your contract
            </Typography>
          </Paper>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: SECONDARY, fontWeight: 700, display: "block", mb: 0.5 }}>
              SAME FOUNDER
            </Typography>
            <ArrowForward sx={{ color: SECONDARY, fontSize: 32 }} />
            <Typography variant="caption" sx={{ color: SECONDARY, fontWeight: 700, display: "block", mt: 0.5 }}>
              SAME AUTHORITY
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 4, borderRadius: 3,
              background: secondaryGrad,
              color: "#fff", textAlign: "center", minWidth: 210,
              boxShadow: "0 12px 40px rgba(62,184,175,.22)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>KOPL</Typography>
            <Typography variant="caption" sx={{ opacity: 0.85, display: "block", mt: 0.5 }}>
              Madurai, Tamil Nadu, India
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.72, display: "block", mt: 1 }}>
              Delivery arm · Dedicated secure office
            </Typography>
          </Paper>
        </Box>

        {/* Explainer — two columns */}
        <FlexRow gap={4} sx={{ mb: 7 }}>
          <FlexCell basis="300px">
            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9, mb: 2 }}>
              M. Peri Periasamy founded KOPL as the U.S.-facing corporation and also founded
              Kamala Outsourcing Private Limited (KOPL) in Madurai as its dedicated Indian arm.
              Both companies share the same founder, the same operating values, and the same
              management authority — led from Chesterfield, Missouri.
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9 }}>
              This is what Peri calls &ldquo;one roof and one management.&rdquo; There is no
              intermediary. No gap in accountability between what is promised in Chesterfield
              and what is delivered in Madurai.
            </Typography>
          </FlexCell>
          <FlexCell basis="300px">
            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9, mb: 2 }}>
              KOPL is based in Madurai — a major university city with a large, educated,
              English-speaking professional workforce. KOPL maintains strong relationships with
              experienced staffing agencies, enabling rapid identification and precise screening
              of candidates against your specific requirements.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {kopalSkills.map((s) => (
                <Chip
                  key={s} label={s} size="small"
                  sx={{ bgcolor: `${SECONDARY}18`, color: dark ? "#e0f7f5" : NAVY, fontWeight: 600 }}
                />
              ))}
            </Box>
          </FlexCell>
        </FlexRow>

        {/* Beulah card */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>
          Leadership at KOPL
        </Typography>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${dark ? "#1d3a52" : "#ddeaf5"}`,
            overflow: "hidden",
            bgcolor: "background.default",
          }}
        >
          <FlexRow gap={0}>
            {/* Avatar panel */}
            <Box
              sx={{
                background: secondaryGrad,
                minWidth: { xs: "100%", sm: 200 },
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Avatar
                sx={{
                  width: 68, height: 68,
                  bgcolor: "rgba(255,255,255,.2)",
                  fontSize: 26, fontWeight: 800, color: "#fff", mb: 2,
                }}
              >
                BR
              </Avatar>
              <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, textAlign: "center" }}>
                Beulah Radhakrishnan
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,.8)", textAlign: "center" }}>
                General Manager, KOPL
              </Typography>
            </Box>

            {/* Bio panel */}
            <Box sx={{ p: { xs: 3, md: 4 }, flex: "1 1 260px" }}>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9, mb: 2 }}>
                Beulah leads core operations and organisational development at KOPL. She brings
                over five years of consulting experience with KOPL and nearly three years as
                a Software Developer at Tata Consultancy Services — a rare combination of
                technical depth and business management capability.
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {["Project Management", "Technology Execution", "B.Tech — IT"].map((tag) => (
                  <Chip
                    key={tag} label={tag} size="small"
                    sx={{ bgcolor: `${PRIMARY}15`, color: PRIMARY, fontWeight: 600 }}
                  />
                ))}
              </Box>
              <Typography variant="caption" sx={{ color: MUTED, fontWeight: 600 }}>
                Languages: English · Hindi · Tamil · Telugu
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ fontStyle: "italic", color: "text.secondary" }}>
                &ldquo;Leadership is about coordination, clarity, and care.&rdquo;
              </Typography>
            </Box>
          </FlexRow>
        </Card>
      </Container>
    </Box>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 5. ROADMAP
// ═════════════════════════════════════════════════════════════════════════════
const roadmapSteps = [
  {
    num: "01", label: "Agreement",
    summary: "You Sign with KOPL — and That's Your Only Contract.",
    detail:  "KOPL enters into a formal business agreement with you, defining the scope, expectations, and standards. You also define the professional requirements for the individual who will carry out your work at KOPL's Madurai office.",
  },
  {
    num: "02", label: "Sourcing",
    summary: "We Find the Right People. You Set the Standard.",
    detail:  "Using your defined requirements, KOPL's team in Madurai identifies and precisely screens qualified candidates from the local professional talent pool. Only candidates who meet your criteria are presented.",
  },
  {
    num: "03", label: "Interview",
    summary: "You See Who You're Hiring. You Make the Decision.",
    detail:  "We schedule a virtual video interview at a time that suits you, presenting the top one to three candidates. You assess them directly, ask the questions, and make the final selection. No guessing, no blind placement.",
  },
  {
    num: "04", label: "Onboarding",
    summary: "We Handle Everything That Follows.",
    detail:  "Once you approve your candidate, KOPL manages the complete hiring and onboarding process — compensation, benefits, and all HR administration — at zero additional burden to you.",
  },
  {
    num: "05", label: "Workspace",
    summary: "A Secure, Dedicated Environment from Day One.",
    detail:  "Your professional works from KOPL's dedicated, secure office in Madurai — fully equipped with IT infrastructure, communication tools, and data security protocols from the first day.",
  },
  {
    num: "06", label: "Management",
    summary: "You Monitor the Output. We Manage the People.",
    detail:  "KOPL and KOPL jointly manage performance, attendance, HR matters, data security, and quality standards on an ongoing basis. Your role is to review the work delivered.",
  },
  {
    num: "07", label: "Quality",
    summary: "If We Fall Short, We Make It Right.",
    detail:  "Regularly review quality and output so we can ensure your expectations are met. If there is a gap, KOPL will address it. Our promise is not just quality — it is accountability for quality.",
  },
];

const gains = [
  {
    title: "Time Freed",
    body:  "Reclaim the hours consumed by tasks that qualified outsourced professionals can handle with equal precision. Those hours go back to what only you can do: grow your business.",
    color: PRIMARY,
  },
  {
    title: "Capital Recovered",
    body:  "The cost differential between U.S. staffing and professionally managed outsourcing through KOPL is substantial. That recovered capital becomes available to reinvest directly in your business growth.",
    color: SECONDARY,
  },
];

function RoadmapSection() {
  const theme      = useTheme();
  const dark       = theme.palette.mode === "dark";
  const [active, setActive] = useState(null);
  const toggle = (i) => setActive((p) => (p === i ? null : i));

  return (
    <Box sx={{ py: 10, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <SectionHeader
          overline="The Process"
          title="Your Business Journey with KOPL"
          subtitle="From your first conversation to a high-performing engagement — here is how it unfolds."
        />

        <Stack spacing={2}>
          {roadmapSteps.map((step, idx) => {
            const open = active === idx;
            return (
              <Card
                key={idx}
                elevation={0}
                onClick={() => toggle(idx)}
                sx={{
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: open
                    ? `2px solid ${PRIMARY}`
                    : `1px solid ${dark ? "#1d3a52" : "#ddeaf5"}`,
                  boxShadow: open ? "0 8px 32px rgba(29,137,200,.14)" : "none",
                  transition: "border .2s, box-shadow .2s",
                  cursor: "pointer",
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "1.7rem",
                        fontWeight: 900,
                        color: open ? PRIMARY : dark ? "#2a4a62" : "#c8dcea",
                        lineHeight: 1,
                        minWidth: 44,
                        transition: "color .2s",
                      }}
                    >
                      {step.num}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="overline"
                        sx={{ color: open ? PRIMARY : MUTED, fontWeight: 700, letterSpacing: 1.5 }}
                      >
                        {step.label}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.4 }}>
                        {step.summary}
                      </Typography>
                    </Box>
                    <Box sx={{ color: open ? PRIMARY : MUTED, flexShrink: 0, transition: "color .2s" }}>
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                  </Box>

                  {open && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${dark ? "#1d3a52" : "#eef4fb"}`, pl: { md: 7 } }}>
                      <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                        {step.detail}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Stack>

        {/* What you gain */}
        <FlexRow gap={3} sx={{ mt: 5 }}>
          {gains.map((g) => (
            <FlexCell key={g.title} basis="260px">
              <Card
                elevation={0}
                sx={{
                  p: 3, borderRadius: 3, height: "100%",
                  bgcolor: "background.paper",
                  border: `1px solid ${dark ? "#1d3a52" : "#ddeaf5"}`,
                  borderTop: `4px solid ${g.color}`,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, color: g.color, mb: 1 }}>
                  {g.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  {g.body}
                </Typography>
              </Card>
            </FlexCell>
          ))}
        </FlexRow>

        {/* CTA */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              background: primaryGrad,
              borderRadius: 50,
              px: 5, py: 1.5,
              fontSize: "1rem",
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0 8px 24px rgba(29,137,200,.3)",
              "&:hover": { boxShadow: "0 12px 36px rgba(29,137,200,.45)" },
            }}
          >
            Ready to begin? Book a discovery call.
          </Button>
        </Box>
      </Container>
    </Box>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 6. TESTIMONIALS
// ═════════════════════════════════════════════════════════════════════════════
// ← Add more objects here as { quote, name, role }
const testimonials = [
  {
    quote: "Peri and I sat down and discussed my business needs and the types of skillsets I needed to meet those needs. Then Peri, through his company in India, found me a pool of qualified candidates with 5-year accounting and finance degrees. I interviewed them virtually, selected the people I wanted to hire — and Peri handled the rest.",
    name: "Dennis Fry",
    role: "Business Owner, Chesterfield, MO",
  },
];

function TestimonialsSection() {
  return (
    <Box sx={{ py: 10, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <SectionHeader overline="Client Voices" title="What Our Clients Say" />

        <FlexRow gap={4} sx={{ justifyContent: "center" }}>
          {testimonials.map((t, i) => (
            <FlexCell key={i} basis="460px" grow={1} sx={{ maxWidth: 720 }}>
              <Card
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 3,
                  borderLeft: `5px solid ${SECONDARY}`,
                  bgcolor: "background.default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <FormatQuote
                  sx={{ fontSize: 100, color: SECONDARY, opacity: 0.07, position: "absolute", top: -10, right: 10 }}
                />
                <Typography
                  variant="body1"
                  sx={{ fontStyle: "italic", color: "text.secondary", lineHeight: 1.9, fontSize: "1.04rem", position: "relative", zIndex: 1 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </Typography>
                <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: PRIMARY, fontWeight: 700 }}>{t.name.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>
                      {t.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: MUTED }}>{t.role}</Typography>
                  </Box>
                </Box>
              </Card>
            </FlexCell>
          ))}
        </FlexRow>
      </Container>
    </Box>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// ROOT — reorder or comment out sections here
// ═════════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  return (
    <Box>
      <MissionVisionGoal />
      <FounderSection />
      <ConcernsSection />
      <OneRoofSection />
      <RoadmapSection />
      <TestimonialsSection />
    </Box>
  );
}

