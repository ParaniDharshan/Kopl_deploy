/**
 * ============================================================
 * KOPL — Two Drop-in Components
 * ============================================================
 * 1. <ContactPage />   — Hero + Full Contact Form
 * 2. <FounderProfile /> — Director Bio with Stepper + Cards
 *
 * USAGE in your App.jsx:
 *   import ContactPage, { FounderProfile } from "./CRKLContactAndFounder";
 *   // In renderTab():
 *   case "Contact": return <ContactPage />;
 *   // Replace or add inside About():
 *   <FounderProfile />
 *
 * Dependencies already in your project:
 *   @mui/material  @mui/icons-material  @emotion/react  @emotion/styled
 *   Tailwind CSS (optional — only for gap/padding utility classes used below)
 * ============================================================
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Box, Container, Grid, Typography, TextField, Button,
  Card, CardContent, Chip, Avatar, Stepper, Step, StepLabel,
  StepContent, Paper, Divider, Snackbar, Alert, MenuItem,
  InputAdornment, Fade, Zoom, LinearProgress, Tooltip,
} from "@mui/material";
import {
  Send as SendIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  Message as MessageIcon,
  CheckCircle as CheckIcon,
  School as SchoolIcon,
  EmojiEvents as TrophyIcon,
  Groups as CivicIcon,
  Verified as VerifiedIcon,
  ArrowForward as ArrowIcon,
  LocationOn as LocationIcon,
  Flag as FlagIcon,
  Star as StarIcon,
} from "@mui/icons-material";

// ── Brand tokens ──────────────────────────────────────────────
const P  = "#1d89c8"; // primary blue
const S  = "#3eb8af"; // secondary teal
const GRAD = `linear-gradient(135deg, ${P}, ${S})`;

// ── Helpers ──────────────────────────────────────────────────
const sx = (styles) => styles; // identity for readability

// ============================================================
// CONTACT PAGE
// ============================================================
// Fields definition — label, key, type, icon, validation rule
const FIELDS = [
  {
    label: "Full Name",
    key: "name",
    type: "text",
    icon: <PersonIcon />,
    required: true,
    validate: (v) => (v.trim().length < 2 ? "Please enter your full name." : ""),
    placeholder: "e.g. Jane Smith",
  },
  {
    label: "Work Email",
    key: "email",
    type: "email",
    icon: <EmailIcon />,
    required: true,
    validate: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        ? ""
        : "Enter a valid business email address.",
    placeholder: "you@company.com",
  },
  {
    label: "Phone Number",
    key: "phone",
    type: "tel",
    icon: <PhoneIcon />,
    required: false,
    validate: (v) =>
      v.trim() === "" || /^[\d\s\+\-().]{7,20}$/.test(v.trim())
        ? ""
        : "Enter a valid phone number.",
    placeholder: "+1 (314) 000-0000",
  },
  {
    label: "Company / Business Name",
    key: "company",
    type: "text",
    icon: <BusinessIcon />,
    required: true,
    validate: (v) => (v.trim().length < 2 ? "Please enter your company name." : ""),
    placeholder: "e.g. Acme Corp LLC",
  },
  {
    label: "Industry / Sector",
    key: "industry",
    type: "select",
    icon: <WorkIcon />,
    required: true,
    validate: (v) => (v ? "" : "Please select your industry."),
    options: [
      "Accounting & CPA Firm",
      "Legal / Law Firm",
      "Healthcare / Medical",
      "Real Estate",
      "Retail / E-commerce",
      "Manufacturing",
      "Technology / SaaS",
      "Construction",
      "Financial Services",
      "Other",
    ],
  },
  {
    label: "Company Size",
    key: "size",
    type: "select",
    icon: <BusinessIcon />,
    required: false,
    validate: () => "",
    options: [
      "Solo / Freelancer",
      "2–10 employees",
      "11–50 employees",
      "51–200 employees",
      "200+ employees",
    ],
  },
  {
    label: "Service of Interest",
    key: "service",
    type: "select",
    icon: <WorkIcon />,
    required: true,
    validate: (v) => (v ? "" : "Please select a service."),
    options: [
      "Accounting & Finance (QuickBooks Online)",
      "Tax Services (IRS Enrolled Agent)",
      "IT Services (MERN Stack / Automation)",
      "All Three Services",
      "General Inquiry / Discovery Call",
    ],
  },
  {
    label: "How did you hear about us?",
    key: "source",
    type: "select",
    icon: <StarIcon />,
    required: false,
    validate: () => "",
    options: [
      "Chesterfield Chamber of Commerce",
      "Referral / Word of Mouth",
      "Google Search",
      "LinkedIn",
      "Other",
    ],
  },
  {
    label: "Describe your business needs",
    key: "message",
    type: "textarea",
    icon: <MessageIcon />,
    required: true,
    validate: (v) =>
      v.trim().length < 20
        ? "Please describe your needs in at least 20 characters."
        : "",
    placeholder:
      "Tell us about your current challenges, team size, systems you use, and what outcome you're looking for…",
    rows: 5,
  },
];



// ============================================================
// FOUNDER PROFILE COMPONENT
// ============================================================
// Stepper steps
const EDUCATION_STEPS = [
  {
    label: "Doctorate in Chemistry",
    institution: "Florida State University",
    icon: <SchoolIcon />,
    color: P,
    detail: "Foundational scientific discipline — analytical precision, research methodology, and evidence-based decision-making.",
  },
  {
    label: "MBA — International Business",
    institution: "Saint Louis University",
    icon: <BusinessIcon />,
    color: S,
    detail: "Specialization in cross-border commerce, global market dynamics, and multinational operations management.",
  },
  {
    label: "Juris Doctor (Law Degree)",
    institution: "Saint Louis University",
    icon: <VerifiedIcon />,
    color: P,
    detail: "Grounding in U.S. contract law, corporate governance, and regulatory compliance — applied directly to client engagements.",
  },
];

const CIVIC_STEPS = [
  { year: "2012", label: "Joined Chesterfield Regional Chamber of Commerce", sub: "Led the Business Education Committee for ~3 years" },
  { year: "2014–2019", label: "Board of Directors — Chamber of Commerce", sub: "Five-year tenure shaping regional business policy" },
  { year: "2019", label: "Chairman of the Board", sub: "Chesterfield Regional Chamber of Commerce" },
  { year: "2017–Present", label: "Finance & Admin Citizens Advisory Committee", sub: "City of Chesterfield — ongoing civic service" },
];

const CAREER_HIGHLIGHTS = [
  { icon: "🏭", title: "Mallinckrodt — Fortune 500", body: "Deep exposure to American corporate culture inside one of St. Louis's most demanding multinationals." },
  { icon: "🎯", title: "Results-Based Culture", body: "Internalized goals-and-target-date-driven operations and zero tolerance for quality lapses." },
  { icon: "💰", title: "Cost Discipline", body: "Mastery of cost discipline and financial accountability at enterprise scale." },
  { icon: "🤝", title: "Trust & Reliability", body: "Built a career on the professional principle that trust is the non-negotiable foundation of every business relationship." },
];

export function FounderProfile() {
  const [activeEdu, setActiveEdu]     = useState(0);
  const [activeCivic, setActiveCivic] = useState(0);
  const [visible, setVisible]         = useState(false);
  const ref = useRef(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Box ref={ref} sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">

        {/* ── SECTION HEADER ── */}
        <Fade in={visible} timeout={700}>
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Chip
              icon={<VerifiedIcon sx={{ color: `${P} !important` }} />}
              label="About Our Founder"
              sx={{ mb: 2.5, background: `${P}14`, color: P, fontWeight: 700, fontSize: "0.78rem", letterSpacing: 0.8 }}
            />
            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.5rem" }, mb: 2 }}>
              Periasamy (Peri) Krishnamoorthy
            </Typography>
            <Typography sx={{ opacity: 0.6, maxWidth: 600, mx: "auto", lineHeight: 1.85 }}>
              Born in Madurai. Built in America. Committed to Chesterfield. Over five decades of academic excellence, corporate experience, and civic leadership — all in service of the U.S. small business owner.
            </Typography>
          </Box>
        </Fade>

        {/* ── TOP IDENTITY CARD ── */}
        <Fade in={visible} timeout={900}>
          <Card sx={{
            mb: 5, p: { xs: 3, md: 5 },
            background: GRAD,
            color: "#fff",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* decorative circle */}
            <Box sx={{ position: "absolute", right: -60, top: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
            <Box sx={{ position: "absolute", right: 60, bottom: -80, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} sm="auto">
                <Avatar sx={{ width: 100, height: 100, fontSize: "2.6rem", background: "rgba(255,255,255,0.22)", border: "3px solid rgba(255,255,255,0.4)", mx: { xs: "auto", sm: 0 } }}>
                  PK
                </Avatar>
              </Grid>
              <Grid item xs={12} sm>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Periasamy Krishnamoorthy</Typography>
                <Typography sx={{ opacity: 0.88, mb: 2 }}>Founder & Director — KOPL · Chesterfield, Missouri</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {["PhD Chemistry", "MBA Int'l Business", "JD Law", "IRS Enrolled Agent", "50+ Years U.S. Experience"].map((tag) => (
                    <Chip key={tag} label={tag} size="small" sx={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: 600, fontSize: "0.72rem" }} />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Fade>

        {/* ── TWO-COLUMN: EDUCATION STEPPER + CAREER CARDS ── */}
        <Grid container spacing={4} sx={{ mb: 4 }}>

          {/* Education Stepper */}
          <Grid item xs={12} md={5}>
            <Fade in={visible} timeout={1100}>
              <Card sx={{ p: { xs: 3, md: 4 }, height: "100%", border: `1px solid ${P}20` }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: `${P}18`, display: "flex", alignItems: "center", justifyContent: "center", color: P }}>
                    <SchoolIcon sx={{ fontSize: "1.1rem" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>Academic Credentials</Typography>
                </Box>

                <Stepper activeStep={activeEdu} orientation="vertical" nonLinear>
                  {EDUCATION_STEPS.map((step, i) => (
                    <Step key={i} completed={i < activeEdu}>
                      <StepLabel
                        onClick={() => setActiveEdu(i === activeEdu ? -1 : i)}
                        sx={{
                          cursor: "pointer",
                          "& .MuiStepLabel-label": { fontWeight: i === activeEdu ? 700 : 500, color: i === activeEdu ? step.color : "inherit" },
                          "& .MuiStepIcon-root": { color: i === activeEdu ? step.color : "action.disabled" },
                          "& .MuiStepIcon-root.Mui-active": { color: step.color },
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: "0.92rem", lineHeight: 1.3 }}>{step.label}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.6 }}>{step.institution}</Typography>
                        </Box>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" sx={{ opacity: 0.75, lineHeight: 1.75, py: 1 }}>
                          {step.detail}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                <Typography variant="caption" sx={{ opacity: 0.4, display: "block", mt: 2 }}>
                  Click a step to expand details
                </Typography>
              </Card>
            </Fade>
          </Grid>

          {/* Career highlight cards */}
          <Grid item xs={12} md={7}>
            <Fade in={visible} timeout={1300}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: `${S}18`, display: "flex", alignItems: "center", justifyContent: "center", color: S }}>
                    <TrophyIcon sx={{ fontSize: "1.1rem" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>Career at Mallinckrodt</Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.6, mb: 3, lineHeight: 1.75 }}>
                  His years at Mallinckrodt — a multinational corporation headquartered in St. Louis — gave him deep fluency in how American business truly operates at the highest level.
                </Typography>
                <Grid container spacing={2}>
                  {CAREER_HIGHLIGHTS.map((c, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Card sx={{
                        p: 2.5, height: "100%",
                        border: `1px solid ${P}14`,
                        transition: "all .22s",
                        "&:hover": { border: `1px solid ${P}55`, transform: "translateY(-3px)", boxShadow: `0 12px 36px ${P}18` },
                      }}>
                        <Typography sx={{ fontSize: "1.6rem", mb: 1 }}>{c.icon}</Typography>
                        <Typography sx={{ fontWeight: 700, mb: 0.5, fontSize: "0.9rem" }}>{c.title}</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.65, lineHeight: 1.7, fontSize: "0.82rem" }}>{c.body}</Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          </Grid>
        </Grid>

        {/* ── CIVIC LEADERSHIP STEPPER (FULL WIDTH) ── */}
        <Fade in={visible} timeout={1500}>
          <Card sx={{ p: { xs: 3, md: 5 }, border: `1px solid ${S}25`, background: (t) => t.palette.mode === "dark" ? `${S}08` : `${S}06` }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: `${S}22`, display: "flex", alignItems: "center", justifyContent: "center", color: S }}>
                <CivicIcon sx={{ fontSize: "1.1rem" }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Civic Leadership</Typography>
                <Typography variant="caption" sx={{ opacity: 0.55 }}>Chesterfield, Missouri — Community Service Record</Typography>
              </Box>
            </Box>

            {/* Horizontal stepper on md+, vertical on xs */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Stepper activeStep={activeCivic} alternativeLabel nonLinear>
                {CIVIC_STEPS.map((step, i) => (
                  <Step key={i} completed={i <= activeCivic}>
                    <StepLabel
                      onClick={() => setActiveCivic(i)}
                      sx={{
                        cursor: "pointer",
                        "& .MuiStepLabel-label": { fontWeight: i === activeCivic ? 700 : 500 },
                        "& .MuiStepIcon-root.Mui-active": { color: S },
                        "& .MuiStepIcon-root.Mui-completed": { color: S },
                      }}
                    >
                      <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: S }}>{step.year}</Typography>
                      <Typography sx={{ fontSize: "0.82rem", lineHeight: 1.4 }}>{step.label}</Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box sx={{ mt: 3, p: 3, borderRadius: 3, background: `${S}12`, border: `1px solid ${S}28` }}>
                <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{CIVIC_STEPS[activeCivic].label}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>{CIVIC_STEPS[activeCivic].sub}</Typography>
              </Box>
            </Box>

            {/* Mobile vertical stepper */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Stepper activeStep={activeCivic} orientation="vertical" nonLinear>
                {CIVIC_STEPS.map((step, i) => (
                  <Step key={i} completed={i < activeCivic}>
                    <StepLabel
                      onClick={() => setActiveCivic(i)}
                      sx={{
                        cursor: "pointer",
                        "& .MuiStepIcon-root.Mui-active": { color: S },
                        "& .MuiStepIcon-root.Mui-completed": { color: S },
                      }}
                    >
                      <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: S }}>{step.year}</Typography>
                      <Typography sx={{ fontSize: "0.85rem", fontWeight: i === activeCivic ? 700 : 500 }}>{step.label}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" sx={{ opacity: 0.7, py: 1 }}>{step.sub}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Bottom quote */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ fontStyle: "italic", opacity: 0.75, maxWidth: 580, mx: "auto", lineHeight: 1.85 }}>
                "I have lived and worked in Chesterfield for over 30 years. I understand what American business owners need — and I have built KOPL to deliver exactly that."
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.45, display: "block", mt: 1.5 }}>
                — Periasamy Krishnamoorthy, Founder
              </Typography>
            </Box>
          </Card>
        </Fade>

      </Container>
    </Box>
  );
}

