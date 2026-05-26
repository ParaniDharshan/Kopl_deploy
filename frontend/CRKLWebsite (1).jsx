/**
 * ============================================================
 * CRKL Inc. — Full Website Template
 * MUI + Tailwind CSS + React
 * ============================================================
 * PRIMARY   : #1d89c8 (Sky Blue)
 * SECONDARY : #3eb8af (Teal Blue)
 *
 * ============================================================
 * SETUP GUIDE
 * ============================================================
 * 1. npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
 * 2. tailwind.config.js → extend.colors: { primary:'#1d89c8', secondary:'#3eb8af' }
 * 3. index.css → @tailwind base; @tailwind components; @tailwind utilities;
 * 4. Save as src/App.jsx
 *
 * ============================================================
 * CUSTOMIZATION MAP
 * ============================================================
 * | What                      | Where                              |
 * |---------------------------|------------------------------------|
 * | Nav links                 | NAV_LINKS array                    |
 * | Hero headline/sub         | HERO SECTION                       |
 * | Services cards            | SERVICES array                     |
 * | Founder timeline          | TIMELINE array                     |
 * | Concerns Q&A              | CONCERNS array                     |
 * | 7-step roadmap            | ROADMAP array                      |
 * | FAQ items                 | FAQ_GROUPS array                   |
 * | Testimonials              | TESTIMONIALS array                 |
 * | Contact details           | CONTACT_INFO object                |
 * | Book-a-call link          | BOOKING_URL constant               |
 * | Default theme             | useState("light") → "dark"         |
 * ============================================================
 */

import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, IconButton, Button, Typography, Box,
  Container, Grid, Card, CardContent, Avatar, Chip, Divider,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  Accordion, AccordionSummary, AccordionDetails,
  TextField, Snackbar, Alert, Paper, Fab, Tooltip,
  Tab, Tabs, useScrollTrigger, Slide,
} from "@mui/material";
import {
  Menu as MenuIcon, Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  DarkMode as DarkModeIcon, LightMode as LightModeIcon,
  KeyboardArrowUp as ArrowUpIcon,
  Send as SendIcon, CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon, Phone as PhoneIcon,
  Email as EmailIcon, LocationOn as LocationIcon,
  FormatQuote as QuoteIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

// ── Constants ──────────────────────────────────────────────
const PRIMARY   = "#1d89c8";
const SECONDARY = "#3eb8af";
const BOOKING_URL = "#"; // ← replace with your Calendly / booking link

// ── Nav ────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Services", "Why CRKL", "Contact"];

// ── Services ───────────────────────────────────────────────
const SERVICES = [
  {
    icon: "📊",
    title: "Accounting & Finance",
    summary: "End-to-end financial operations support — from daily transaction recording to month-end close and CPA collaboration. Built for U.S. SMEs using QuickBooks Online.",
    items: [
      "Chart of Accounts setup & bookkeeping",
      "Accounts Payable — supplier & vendor management",
      "Accounts Receivable — invoicing & customer accounts",
      "Account reconciliation & financial reporting",
      "Payroll reconciliation & month-end close",
      "CPA coordination",
    ],
    tag: "QuickBooks Online",
    color: PRIMARY,
  },
  {
    icon: "🧾",
    title: "Tax Services",
    summary: "Comprehensive U.S. tax support handled by an IRS Enrolled Agent — qualified to prepare, research, and represent your business before the IRS.",
    items: [
      "Preparation of Tax returns",
      "Financial workbook preparation",
      "Tax workpaper preparation",
      "Research & Analysis",
      "CPA coordination",
      "Client communication",
    ],
    tag: "IRS Enrolled Agent",
    color: SECONDARY,
  },
  {
    icon: "💻",
    title: "IT Services",
    summary: "Technology support for SMEs who need reliable systems without maintaining a full in-house IT team. Written for business owners — no technical background required.",
    items: [
      "Custom web applications (MERN stack)",
      "Workflow automation & process improvement",
      "System operations & maintenance",
      "Data management & security support",
      "Automation to reduce manual errors",
    ],
    tag: "MERN Stack",
    color: PRIMARY,
  },
];

// ── Founder Timeline ────────────────────────────────────────
const TIMELINE = [
  { year: "Madurai Roots", text: "Born and raised in Madurai, Tamil Nadu. Worked in his father's small hardware distribution business — learning cash flow, customer trust, and the weight of building something by hand." },
  { year: "50+ Years Ago", text: "Moved to the U.S. to attend Florida State University, earning his Doctorate in Chemistry." },
  { year: "MBA & Law", text: "Earned both MBA and Law degrees from Saint Louis University with a concentration in international business." },
  { year: "Mallinckrodt", text: "Built deep fluency in American business culture — results-driven operations, cost discipline, zero tolerance for quality lapses — inside one of St. Louis's most demanding multinational corporations." },
  { year: "30+ Years", text: "Has lived in Chesterfield for over three decades. Raised three daughters here with his wife. He is a member of this community, not a newcomer." },
  { year: "2012", text: "Joined the Chesterfield Regional Chamber of Commerce. Led the Business Education Committee for approximately three years." },
  { year: "2014–2019", text: "Served on the Chamber Board of Directors for five years, culminating as Chairman of the Board in 2019." },
  { year: "2017–Present", text: "Serves on the Finance & Administration Citizens Advisory Committee for the City of Chesterfield." },
];

// ── Concerns (Why CRKL) ─────────────────────────────────────
const CONCERNS = [
  {
    q: "Who am I actually working with — a U.S. company or an Indian firm?",
    a: "You work with CRKL Inc., a U.S.-registered corporation in Chesterfield, Missouri. Your contract is with a U.S. entity. Your primary contact is U.S.-based. KOPL in India delivers the work — but your relationship, your accountability, and your legal standing are all with CRKL Inc.",
  },
  {
    q: "What happens if something goes wrong or doesn't meet my expectations?",
    a: "CRKL Inc. handles all contractual, legal, or service issues directly with you in Chesterfield. You don't navigate time zones or foreign legal systems. Peri's commitment: \"If we fall short of your expectations, we will make it right.\"",
  },
  {
    q: "Is my financial and business data safe?",
    a: "All KOPL employees sign strict confidentiality and non-disclosure agreements before handling any client data. Work is conducted in a secure, dedicated office space. No data is accessed from personal devices or unsecured networks. Access is role-limited, monitored, and can be revoked at any time.",
  },
  {
    q: "Are your accounting professionals qualified for U.S. standards?",
    a: "Yes. Our accounting team holds postgraduate commerce degrees and is trained in U.S. workflows using QuickBooks Online. Saravana Kumar is a QuickBooks ProAdvisor (Certified 2024) and IRS Enrolled Agent (2026) — licensed to represent clients before the IRS.",
  },
  {
    q: "Will there be a language or communication barrier?",
    a: "Our team is fluent in English and experienced in professional U.S. business communication. Our General Manager, Beulah Radhakrishnan, is fluent in English, Hindi, Tamil, and Telugu. All deliverables are produced in clear, professional English.",
  },
  {
    q: "What about time zone differences?",
    a: "India Standard Time (IST) is 10.5 hours ahead of U.S. Central Time. In practice, your team in India is working while you sleep — so deliverables are often ready when your business day begins. Overlap hours and scheduled check-ins are set from day one.",
  },
  {
    q: "How much does this cost compared to hiring locally?",
    a: "Outsourcing through KOPL allows U.S. SMEs to access qualified, professional talent at a fraction of the cost of local hiring — without the overhead of benefits, payroll taxes, office space, or onboarding time. Pricing is discussed during your discovery call, scoped to your specific needs.",
  },
  {
    q: "How long does it take to get started?",
    a: "After the discovery call and scope agreement, onboarding typically takes 1–2 weeks — covering resource allocation, system setup, document protocols, and communication channels. We do not rush onboarding. A clean start prevents problems later.",
  },
  {
    q: "Do I need to manage the team on a daily basis?",
    a: "No. That is our job. You set the expectations, we manage the execution. CRKL Inc. monitors performance, quality, and timelines — so your time is spent on your business, not managing an offshore team.",
  },
  {
    q: "Can I stop or pause the engagement if my needs change?",
    a: "Yes. Engagement terms are discussed clearly upfront, including exit and pause conditions. We believe in long-term relationships built on results — not lock-in contracts that trap clients.",
  },
];

// ── 7-Step Roadmap ──────────────────────────────────────────
const ROADMAP = [
  { step: "01", title: "Agreement", sub: "You Sign with CRKL Inc. — and That's Your Only Contract.", body: "CRKL Inc. enters into a formal business agreement with you, defining scope, expectations, and standards. You also define the professional requirements — qualifications, experience, skills — for the individual who will carry out your work at KOPL's Madurai office." },
  { step: "02", title: "Sourcing", sub: "We Find the Right People. You Set the Standard.", body: "Using your defined requirements, KOPL's team in Madurai identifies and precisely screens qualified candidates from the local professional talent pool, leveraging established relationships with experienced staffing agencies. Only candidates who meet your criteria are presented." },
  { step: "03", title: "Interview", sub: "You See Who You're Hiring. You Make the Decision.", body: "We schedule a virtual video interview at a time that suits you, presenting the top one to three candidates. You assess them directly. You ask the questions. And you make the final selection. There is no guessing, no blind placement — the hiring decision is yours." },
  { step: "04", title: "Onboarding", sub: "We Handle Everything That Follows.", body: "Once you have approved your chosen candidate, KOPL manages the complete hiring and onboarding process — compensation, benefits, and all human resources administration — at zero additional burden to you. Your new team member is ready to work." },
  { step: "05", title: "Workspace", sub: "A Secure, Dedicated Environment from Day One.", body: "Your professional works from KOPL's dedicated, secure office in Madurai — fully equipped with the IT infrastructure, communication tools, and data security protocols required to handle your business work safely and efficiently." },
  { step: "06", title: "Management", sub: "You Monitor the Output. We Manage the People.", body: "CRKL Inc. and KOPL jointly manage employee performance, attendance, HR matters, data security, and quality standards on an ongoing basis. Your role is to review the work delivered. Our role is to ensure the team delivers it to your expectations, every day." },
  { step: "07", title: "Quality", sub: "If We Fall Short, We Make It Right.", body: "We ask one thing: regularly review the quality and output of the work so we can ensure your expectations are being met. If there is a gap between what was expected and what was delivered, CRKL Inc. will address it. Our promise is not just quality — it is accountability for quality." },
];

// ── Testimonials ────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Dennis Fry",
    role: "Business Owner, Chesterfield, MO",
    avatar: "DF",
    quote: "Peri and I sat down and discussed my business needs and the types of skillsets I needed to meet those needs. Then Peri, through his company in India, found me a pool of qualified candidates with 5-year accounting and finance degrees. I interviewed them virtually, selected the people I wanted to hire — and Peri handled the rest.",
  },
];

// ── Contact ─────────────────────────────────────────────────
const CONTACT_INFO = {
  phone: "+1 (314) 000-0000", // ← update
  email: "peri@crklinc.com",  // ← update
  location: "Chesterfield, Missouri, USA",
};

// ============================================================
// THEME
// ============================================================
const buildTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: PRIMARY },
      secondary: { main: SECONDARY },
      background: {
        default: mode === "dark" ? "#0a1929" : "#f0f9ff",
        paper:   mode === "dark" ? "#0d2137" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      h1: { fontFamily: "'Sora', sans-serif", fontWeight: 800 },
      h2: { fontFamily: "'Sora', sans-serif", fontWeight: 700 },
      h3: { fontFamily: "'Sora', sans-serif", fontWeight: 700 },
      h4: { fontFamily: "'Sora', sans-serif", fontWeight: 600 },
      h5: { fontFamily: "'Sora', sans-serif", fontWeight: 600 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 600, borderRadius: 10 } } },
      MuiCard:   { styleOverrides: { root: { borderRadius: 18 } } },
    },
  });

// ============================================================
// SCROLL TO TOP
// ============================================================
function ScrollToTop() {
  const trigger = useScrollTrigger({ threshold: 300, disableHysteresis: true });
  return (
    <Slide direction="up" in={trigger} unmountOnExit>
      <Fab
        size="medium"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        sx={{
          position: "fixed", bottom: 32, right: 32, zIndex: 9999,
          background: `linear-gradient(135deg,${PRIMARY},${SECONDARY})`, color: "#fff",
          "&:hover": { transform: "scale(1.1)", transition: "transform .2s" },
        }}
      >
        <ArrowUpIcon />
      </Fab>
    </Slide>
  );
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar({ mode, toggleMode, activeTab, setActiveTab }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 60 });
  const isDark = mode === "dark";

  const navigate = (link) => {
    setActiveTab(link);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AppBar
        position="fixed" elevation={trigger ? 4 : 0}
        sx={{
          backdropFilter: "blur(14px)",
          background: isDark
            ? trigger ? "rgba(10,25,41,0.97)" : "rgba(10,25,41,0.7)"
            : trigger ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.75)",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(29,137,200,0.12)"}`,
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box
            onClick={() => navigate("Home")}
            sx={{ flexGrow: 1, cursor: "pointer", display: "flex", alignItems: "baseline", gap: 1 }}
          >
            <Typography sx={{
              fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.4rem" },
              background: `linear-gradient(90deg,${PRIMARY},${SECONDARY})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              CRKL Inc.
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", opacity: 0.55, display: { xs: "none", sm: "block" } }}>
              U.S.-Managed Business Outsourcing
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link} onClick={() => navigate(link)}
                sx={{
                  color: activeTab === link ? PRIMARY : isDark ? "rgba(255,255,255,0.8)" : "rgba(20,40,60,0.8)",
                  fontWeight: activeTab === link ? 700 : 500,
                  borderBottom: activeTab === link ? `2px solid ${PRIMARY}` : "2px solid transparent",
                  borderRadius: 0, px: 1.5, pb: 0.25,
                  "&:hover": { color: PRIMARY, background: "transparent" },
                }}
              >
                {link}
              </Button>
            ))}
            <Tooltip title={isDark ? "Light mode" : "Dark mode"}>
              <IconButton onClick={toggleMode} sx={{ ml: 1, color: isDark ? SECONDARY : PRIMARY }}>
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            <Button
              variant="contained" size="small"
              href={BOOKING_URL} target="_blank"
              sx={{
                ml: 1.5, px: 2.5, py: 1,
                background: `linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
                boxShadow: `0 4px 16px ${PRIMARY}55`,
                "&:hover": { boxShadow: `0 6px 24px ${PRIMARY}88` },
              }}
            >
              Book a Call
            </Button>
          </Box>

          {/* Mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1, alignItems: "center" }}>
            <IconButton onClick={toggleMode} sx={{ color: isDark ? SECONDARY : PRIMARY }}>
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: isDark ? "#fff" : "#1d3a5a" }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 2, px: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography sx={{ fontWeight: 800, background: `linear-gradient(90deg,${PRIMARY},${SECONDARY})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              CRKL Inc.
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <Divider />
          <List>
            {NAV_LINKS.map((link) => (
              <ListItem key={link} disablePadding>
                <ListItemButton onClick={() => navigate(link)} selected={activeTab === link} sx={{ borderRadius: 2, my: 0.25 }}>
                  <ListItemText primary={link} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button fullWidth variant="contained" href={BOOKING_URL} target="_blank"
            sx={{ mt: 2, background: `linear-gradient(135deg,${PRIMARY},${SECONDARY})` }}>
            Book a Discovery Call
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

// ============================================================
// CTA BUTTON — reusable
// ============================================================
function CTAButton({ text = "Book a Free Discovery Call", sub, size = "large" }) {
  return (
    <Box>
      <Button
        variant="contained" size={size}
        href={BOOKING_URL} target="_blank"
        endIcon={<ArrowIcon />}
        sx={{
          background: `linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
          px: 4, py: 1.6, fontSize: "1rem",
          boxShadow: `0 6px 28px ${PRIMARY}55`,
          "&:hover": { boxShadow: `0 10px 36px ${PRIMARY}88` },
        }}
      >
        {text}
      </Button>
      {sub && (
        <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.6, textAlign: "center" }}>
          {sub}
        </Typography>
      )}
    </Box>
  );
}

// ============================================================
// TAB 1 — HOME
// ============================================================
function Home() {
  return (
    <Box>
      {/* ── HERO ── */}
      <Box sx={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        pt: { xs: 10, md: 8 },
        background: `radial-gradient(ellipse at 70% 40%,${SECONDARY}22 0%,transparent 55%),
                     radial-gradient(ellipse at 20% 80%,${PRIMARY}18 0%,transparent 50%)`,
        position: "relative", overflow: "hidden",
      }}>
        {/* blobs */}
        <Box sx={{ position:"absolute",top:-80,right:-80,width:400,height:400,borderRadius:"50%",background:`${PRIMARY}12`,filter:"blur(60px)",pointerEvents:"none" }} />
        <Box sx={{ position:"absolute",bottom:-60,left:-60,width:320,height:320,borderRadius:"50%",background:`${SECONDARY}18`,filter:"blur(50px)",pointerEvents:"none" }} />

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left */}
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <Chip label="Chesterfield, Missouri — U.S.-Managed" size="small"
                sx={{ mb: 3, background:`${PRIMARY}18`, color:PRIMARY, fontWeight:700, border:`1px solid ${PRIMARY}40` }} />

              <Typography variant="h1" sx={{
                fontSize:{ xs:"2.2rem",sm:"2.9rem",md:"3.4rem" }, lineHeight:1.15, mb:2.5,
                "& span":{ background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
              }}>
                Your books.<br/><span>Our discipline.</span><br/>Your growth.
              </Typography>

              <Typography variant="body1" sx={{ fontSize:"1.08rem", opacity:0.75, mb:4, maxWidth:500, lineHeight:1.8 }}>
                CRKL Inc. helps U.S. small and mid-sized businesses manage accounting, finance, and IT operations through a structured, secure, and professionally managed outsourcing model. You work with a trusted U.S.-based partner. We handle the rest.
              </Typography>

              <CTAButton
                text="Book a Free Discovery Call"
                sub="No commitment. 30 minutes. Let's understand your business needs first."
              />

              {/* Trust badges */}
              <Box sx={{ display:"flex", gap:3, mt:5, flexWrap:"wrap" }}>
                {["Missouri-Registered U.S. Corp","30+ Years in Chesterfield","One Roof. One Management."].map((t) => (
                  <Box key={t} sx={{ display:"flex", alignItems:"center", gap:0.6, opacity:0.75 }}>
                    <CheckIcon sx={{ fontSize:16, color:SECONDARY }} />
                    <Typography variant="caption" sx={{ fontWeight:600 }}>{t}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right — visual */}
            <Grid item xs={12} md={6} sx={{ order:{ xs:1, md:2 }, display:"flex", justifyContent:"center" }}>
              <Box sx={{
                width:{ xs:280,sm:360,md:440 }, height:{ xs:280,sm:360,md:440 },
                borderRadius:"32px",
                background:`linear-gradient(135deg,${PRIMARY}22,${SECONDARY}33)`,
                border:`2px solid ${PRIMARY}30`,
                display:"flex", alignItems:"center", justifyContent:"center",
                position:"relative", boxShadow:`0 24px 80px ${PRIMARY}28`,
              }}>
                {/* ← replace this with <img src="founder-photo.jpg" style={{...}} /> */}
                <Typography sx={{ fontSize:"7rem", userSelect:"none" }}>🤝</Typography>

                <Paper elevation={8} sx={{
                  position:"absolute", bottom:-20, left:-20, px:2.5, py:1.5, borderRadius:3,
                  background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`, color:"#fff",
                }}>
                  <Typography sx={{ fontWeight:800, fontSize:"1.4rem", lineHeight:1 }}>50+</Typography>
                  <Typography sx={{ fontSize:"0.7rem", opacity:0.9 }}>Years of experience</Typography>
                </Paper>

                <Paper elevation={6} sx={{
                  position:"absolute", top:-16, right:-16, px:2, py:1.2, borderRadius:3,
                }}>
                  <Typography sx={{ fontWeight:700, fontSize:"0.95rem", color:PRIMARY }}>Missouri</Typography>
                  <Typography sx={{ fontSize:"0.68rem", opacity:0.65 }}>U.S. Corporation</Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── THREE PILLARS ── */}
      <Box sx={{ py:{ xs:8,md:12 }, background:`linear-gradient(160deg,${PRIMARY}08 0%,${SECONDARY}08 100%)` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="What We Do" sx={{ mb:2, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              Three pillars. One trusted partner.
            </Typography>
            <Typography sx={{ opacity:0.65, maxWidth:520, mx:"auto", lineHeight:1.8 }}>
              Every service is delivered through KOPL's dedicated professionals in Madurai — managed from Chesterfield, Missouri.
            </Typography>
          </Box>

          <Box sx={{ display:"flex", flexWrap:"wrap", gap:3, justifyContent:{ xs:"center",md:"flex-start" } }}>
            {SERVICES.map((s, i) => (
              <Card key={i} sx={{
                flex:{ xs:"1 1 100%", sm:"1 1 calc(50% - 12px)", md:"1 1 calc(33.33% - 16px)" },
                maxWidth:{ sm:"calc(50% - 12px)", md:"calc(33.33% - 16px)" },
                border:`1px solid transparent`,
                transition:"all .28s ease",
                "&:hover":{ border:`1px solid ${s.color}50`, transform:"translateY(-6px)", boxShadow:`0 20px 60px ${s.color}20` },
              }}>
                <CardContent sx={{ p:3 }}>
                  <Typography sx={{ fontSize:"2.2rem", mb:2 }}>{s.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight:700, mb:1 }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ opacity:0.68, lineHeight:1.75, mb:2 }}>{s.summary}</Typography>
                  <Chip label={s.tag} size="small" sx={{ background:`${s.color}18`, color:s.color, fontWeight:700, fontSize:"0.7rem" }} />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── HOW IT WORKS ── */}
      <Box sx={{ py:{ xs:8,md:12 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="How It Works" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              Simple. Structured. Accountable.
            </Typography>
          </Box>
          <Box sx={{ display:"flex", flexDirection:"column", gap:3 }}>
            {[
              { n:"1", t:"Tell us what you need", d:"A 30-minute discovery call with CRKL Inc. is all it takes to scope your accounting or IT requirements, timelines, and reporting preferences." },
              { n:"2", t:"We match and set up", d:"CRKL assigns qualified professionals through KOPL, sets up secure communication channels, and establishes document workflows — all before day one." },
              { n:"3", t:"We deliver, you review", d:"Work runs on agreed schedules. You receive regular updates, review meetings, and accurate deliverables — without managing the team directly." },
            ].map((step) => (
              <Card key={step.n} sx={{ display:"flex", alignItems:"flex-start", gap:3, p:3, border:`1px solid ${PRIMARY}20`, "&:hover":{ borderColor:PRIMARY, boxShadow:`0 8px 30px ${PRIMARY}18` }, transition:"all .25s" }}>
                <Box sx={{
                  minWidth:52, height:52, borderRadius:"14px", flexShrink:0,
                  background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
                  display:"flex", alignItems:"center", justifyContent:"center", color:"#fff",
                }}>
                  <Typography sx={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:"1.4rem" }}>{step.n}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight:700, mb:0.5 }}>{step.t}</Typography>
                  <Typography variant="body2" sx={{ opacity:0.7, lineHeight:1.75 }}>{step.d}</Typography>
                </Box>
              </Card>
            ))}
          </Box>
          <Box sx={{ textAlign:"center", mt:6 }}>
            <CTAButton text="Book a Discovery Call" sub="Ready to reduce overhead and gain operational clarity?" />
          </Box>
        </Container>
      </Box>

      {/* ── TESTIMONIAL ── */}
      <Box sx={{ py:{ xs:8,md:10 }, background:`linear-gradient(160deg,${SECONDARY}0d 0%,${PRIMARY}0d 100%)` }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign:"center", mb:6 }}>
            <Chip label="Client Voice" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.4rem" } }}>
              What our clients say
            </Typography>
          </Box>
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} sx={{ p:{ xs:3,md:5 }, border:`1px solid ${PRIMARY}30`, boxShadow:`0 16px 60px ${PRIMARY}18` }}>
              <QuoteIcon sx={{ fontSize:"3rem", color:PRIMARY, opacity:0.25, mb:1 }} />
              <Typography variant="h6" sx={{ fontStyle:"italic", lineHeight:1.8, mb:3, fontWeight:400, opacity:0.85 }}>
                "{t.quote}"
              </Typography>
              <Divider sx={{ mb:2.5 }} />
              <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
                <Avatar sx={{ background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`, fontWeight:800 }}>{t.avatar}</Avatar>
                <Box>
                  <Typography sx={{ fontWeight:700 }}>{t.name}</Typography>
                  <Typography variant="caption" sx={{ opacity:0.6 }}>{t.role}</Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Container>
      </Box>
    </Box>
  );
}

// ============================================================
// TAB 2 — ABOUT US
// ============================================================
function About() {
  const [expanded, setExpanded] = useState(false);
  const toggle = (p) => (_, isExp) => setExpanded(isExp ? p : false);

  return (
    <Box sx={{ pt:{ xs:10,md:10 } }}>

      {/* ── FOUNDER HERO ── */}
      <Box sx={{
        py:{ xs:8,md:12 },
        background:`radial-gradient(ellipse at 60% 30%,${PRIMARY}18 0%,transparent 55%)`,
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip label="About the Founder" sx={{ mb:3, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
              <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.8rem" }, mb:1 }}>
                M. Peri Periasamy
              </Typography>
              <Typography sx={{ color:SECONDARY, fontWeight:700, mb:3, fontSize:"1.05rem" }}>
                Founder — CRKL Inc. & KOPL
              </Typography>
              <Typography sx={{ fontSize:"1.2rem", fontStyle:"italic", opacity:0.8, mb:3, borderLeft:`4px solid ${PRIMARY}`, pl:2 }}>
                "I've always loved business."
              </Typography>
              <Typography sx={{ opacity:0.75, lineHeight:1.85, mb:2 }}>
                Before you consider entrusting your business work to anyone, you deserve to know exactly who is accountable. Not a company name. Not a tagline. A person — with a verifiable background, a proven track record, and a genuine stake in this community.
              </Typography>
              <Typography sx={{ opacity:0.75, lineHeight:1.85 }}>
                Peri was born and raised in Madurai, Tamil Nadu, India. His father owned a small hardware products distribution company, and from his earliest years, Peri worked there during summers and college breaks. He learned what it truly means to operate a small business: the long hours, the discipline of cash flow management, the weight of customer trust, and the quiet satisfaction of building something with your own hands.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display:"flex", justifyContent:"center" }}>
              {/* ← Replace this with <img src="peri-portrait.jpg" style={{width:"100%",maxWidth:420,borderRadius:24}} /> */}
              <Box sx={{
                width:{ xs:260,md:380 }, height:{ xs:320,md:460 },
                borderRadius:"24px",
                background:`linear-gradient(160deg,${PRIMARY}25,${SECONDARY}35)`,
                border:`2px solid ${PRIMARY}35`,
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:`0 24px 80px ${PRIMARY}28`,
              }}>
                <Box sx={{ textAlign:"center", opacity:0.6 }}>
                  <Typography sx={{ fontSize:"5rem" }}>👤</Typography>
                  <Typography variant="caption">Founder portrait placeholder</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── EDUCATION & CAREER ── */}
      <Box sx={{ py:{ xs:6,md:10 }, background:`linear-gradient(160deg,${SECONDARY}08 0%,transparent 60%)` }}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p:3, height:"100%", border:`1px solid ${PRIMARY}20` }}>
                <Typography sx={{ fontSize:"2rem", mb:2 }}>🎓</Typography>
                <Typography variant="h6" sx={{ fontWeight:700, mb:1.5, color:PRIMARY }}>Education</Typography>
                {[
                  { d:"Doctorate in Chemistry", i:"Florida State University" },
                  { d:"MBA — International Business", i:"Saint Louis University" },
                  { d:"Law Degree", i:"Saint Louis University" },
                ].map((e) => (
                  <Box key={e.d} sx={{ mb:1.5 }}>
                    <Typography sx={{ fontWeight:600, fontSize:"0.95rem" }}>{e.d}</Typography>
                    <Typography variant="caption" sx={{ opacity:0.6 }}>{e.i}</Typography>
                  </Box>
                ))}
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p:3, height:"100%", border:`1px solid ${SECONDARY}20` }}>
                <Typography sx={{ fontSize:"2rem", mb:2 }}>🏢</Typography>
                <Typography variant="h6" sx={{ fontWeight:700, mb:1.5, color:SECONDARY }}>Career</Typography>
                <Typography variant="body2" sx={{ opacity:0.75, lineHeight:1.8 }}>
                  His career at Mallinckrodt — a multinational corporation headquartered in St. Louis — gave him deep exposure to American business culture: results-based decision-making, goals and target-date-driven operations, commitment to quality, cost discipline, and the essential role of trust and reliability in professional relationships.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p:3, height:"100%", border:`1px solid ${PRIMARY}20` }}>
                <Typography sx={{ fontSize:"2rem", mb:2 }}>🏛️</Typography>
                <Typography variant="h6" sx={{ fontWeight:700, mb:1.5, color:PRIMARY }}>Civic Leadership</Typography>
                {[
                  { y:"2012", t:"Joined Chesterfield Regional Chamber of Commerce" },
                  { y:"~3 yrs", t:"Led Business Education Committee" },
                  { y:"2014–2019", t:"Board of Directors — Chamber" },
                  { y:"2019", t:"Chairman of the Board" },
                  { y:"2017–Now", t:"Finance & Admin Citizens Advisory Committee, City of Chesterfield" },
                ].map((c) => (
                  <Box key={c.y} sx={{ display:"flex", gap:1.5, mb:1.2 }}>
                    <Chip label={c.y} size="small" sx={{ background:`${PRIMARY}15`, color:PRIMARY, fontWeight:700, fontSize:"0.65rem", minWidth:70 }} />
                    <Typography variant="caption" sx={{ lineHeight:1.6 }}>{c.t}</Typography>
                  </Box>
                ))}
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── FOUNDER QUOTE ── */}
      <Container maxWidth="md" sx={{ py:6, textAlign:"center" }}>
        <QuoteIcon sx={{ fontSize:"3rem", color:PRIMARY, opacity:0.3 }} />
        <Typography variant="h5" sx={{ fontStyle:"italic", fontWeight:400, lineHeight:1.7, my:2, opacity:0.85 }}>
          "Both experiences allowed me to better understand the business needs of small companies in the Chesterfield region."
        </Typography>
        <Typography sx={{ color:PRIMARY, fontWeight:700 }}>— M. Peri Periasamy, Founder, CRKL Inc.</Typography>
      </Container>

      {/* ── COMPANY OVERVIEW ── */}
      <Box sx={{ py:{ xs:8,md:12 }, background:`linear-gradient(160deg,${PRIMARY}0d 0%,${SECONDARY}0d 100%)` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="Company Overview" sx={{ mb:2, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              Two companies. One founder. One standard.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title:"CRKL Inc. — Chesterfield, MO",
                sub:"U.S.-Facing Corporation",
                desc:"A U.S.-registered corporation in Chesterfield, Missouri. Your contract, your contact, your accountability — all here in the U.S. CRKL Inc. is your single point of contact for every business, contractual, and quality-related matter.",
                color:PRIMARY, icon:"🇺🇸",
              },
              {
                title:"KOPL — Madurai, Tamil Nadu",
                sub:"Kamala Outsourcing Private Limited",
                desc:"KOPL is the dedicated Indian delivery arm — professionally staffed, securely operated, and directly overseen by Peri. All client work is performed in KOPL's dedicated, secure office in Madurai. Young, driven professionals who bring energy, precision, and a genuine commitment to exceeding the brief.",
                color:SECONDARY, icon:"🇮🇳",
              },
            ].map((co) => (
              <Grid item xs={12} md={5} key={co.title}>
                <Card sx={{
                  p:4, height:"100%", textAlign:"center",
                  border:`2px solid ${co.color}30`,
                  "&:hover":{ borderColor:co.color, boxShadow:`0 16px 50px ${co.color}22`, transform:"translateY(-4px)" },
                  transition:"all .28s",
                }}>
                  <Typography sx={{ fontSize:"3rem", mb:2 }}>{co.icon}</Typography>
                  <Chip label={co.sub} size="small" sx={{ mb:2, background:`${co.color}18`, color:co.color, fontWeight:700 }} />
                  <Typography variant="h6" sx={{ fontWeight:700, mb:2 }}>{co.title}</Typography>
                  <Typography variant="body2" sx={{ opacity:0.72, lineHeight:1.8 }}>{co.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign:"center", mt:4, py:3, borderRadius:3, background:`linear-gradient(135deg,${PRIMARY}15,${SECONDARY}15)`, border:`1px solid ${PRIMARY}30` }}>
            <Typography sx={{ fontStyle:"italic", fontWeight:600, opacity:0.85 }}>
              "One roof and one management — the same person who speaks with you is the person responsible for the outcome."
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── CONCERNS Q&A ── */}
      <Box sx={{ py:{ xs:8,md:12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="We Understand Your Concerns" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              You have questions. They are the right questions.
            </Typography>
            <Typography sx={{ opacity:0.65, maxWidth:540, mx:"auto", lineHeight:1.8 }}>
              If someone has suggested outsourcing your work to a firm with operations in India — you should have concerns. Every serious business owner does. CRKL Inc. not only understands those concerns; they were the reason this company was built.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {CONCERNS.map((c, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Card sx={{
                  p:3, height:"100%",
                  border:`1px solid ${i%2===0?PRIMARY:SECONDARY}22`,
                  "&:hover":{ borderColor:i%2===0?PRIMARY:SECONDARY, boxShadow:`0 8px 30px ${PRIMARY}15`, transform:"translateY(-3px)" },
                  transition:"all .25s",
                }}>
                  <Typography sx={{ fontWeight:700, mb:1.5, fontSize:"0.95rem", color:i%2===0?PRIMARY:SECONDARY }}>
                    "{c.q}"
                  </Typography>
                  <Divider sx={{ mb:1.5 }} />
                  <Typography variant="body2" sx={{ opacity:0.75, lineHeight:1.8 }}>{c.a}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt:6, p:4, borderRadius:3, background:`linear-gradient(135deg,${PRIMARY}15,${SECONDARY}15)`, border:`1px solid ${PRIMARY}30`, textAlign:"center" }}>
            <Typography sx={{ fontWeight:700, fontSize:"1.05rem", mb:0.5 }}>
              CRKL Inc. has taken full ownership of the concerns and risks associated with outsourcing to India — so that you do not have to.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── 7-STEP ROADMAP ── */}
      <Box sx={{ py:{ xs:8,md:12 }, background:`linear-gradient(160deg,${SECONDARY}0d 0%,${PRIMARY}0d 100%)` }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="Your Journey with CRKL Inc." sx={{ mb:2, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              From first call to measurable results
            </Typography>
            <Typography sx={{ opacity:0.65 }}>
              Your contract is with CRKL Inc. Your concerns are ours to carry.
            </Typography>
          </Box>

          <Box sx={{ display:"flex", flexDirection:"column", gap:2 }}>
            {ROADMAP.map((r, i) => (
              <Accordion
                key={i} expanded={expanded===`r${i}`} onChange={toggle(`r${i}`)}
                disableGutters elevation={0}
                sx={{
                  border:`1px solid ${expanded===`r${i}`?PRIMARY:"transparent"}40`,
                  borderRadius:"14px !important", overflow:"hidden", "&:before":{ display:"none" },
                  transition:"border-color .2s",
                  "&.Mui-expanded":{ boxShadow:`0 8px 32px ${PRIMARY}18` },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color:expanded===`r${i}`?PRIMARY:"inherit" }} />} sx={{ px:3, py:1 }}>
                  <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
                    <Typography sx={{
                      fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:"1.6rem",
                      background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
                      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", minWidth:48,
                    }}>
                      {r.step}
                    </Typography>
                    <Box>
                      <Typography sx={{ fontWeight:700, fontSize:"1rem" }}>{r.title}</Typography>
                      <Typography variant="caption" sx={{ opacity:0.6 }}>{r.sub}</Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ px:3, pb:3, pt:0, pl:9 }}>
                  <Typography sx={{ opacity:0.75, lineHeight:1.8 }}>{r.body}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Box sx={{ mt:5, p:4, borderRadius:3, textAlign:"center", background:`linear-gradient(135deg,${PRIMARY}12,${SECONDARY}12)`, border:`1px solid ${PRIMARY}25` }}>
            <Typography sx={{ fontStyle:"italic", fontWeight:600, mb:0.5, opacity:0.85 }}>
              "Our motto is to promise what we can deliver, and then deliver what we promised. Our strategy, however, is to deliver more than we promised."
            </Typography>
            <Typography variant="caption" sx={{ opacity:0.5 }}>— M. Peri Periasamy</Typography>
          </Box>
        </Container>
      </Box>

      {/* ── KOPL LEADERSHIP ── */}
      <Box sx={{ py:{ xs:8,md:10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="KOPL Leadership" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" } }}>
              The team behind your work
            </Typography>
          </Box>

          <Card sx={{ maxWidth:700, mx:"auto", p:{ xs:3,md:5 }, border:`1px solid ${SECONDARY}30`, boxShadow:`0 16px 60px ${SECONDARY}18` }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm="auto" sx={{ textAlign:{ xs:"center",sm:"left" } }}>
                <Avatar sx={{
                  width:100, height:100, mx:{ xs:"auto",sm:0 },
                  fontSize:"2rem", fontWeight:800,
                  background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
                }}>BR</Avatar>
              </Grid>
              <Grid item xs={12} sm>
                <Typography variant="h5" sx={{ fontWeight:700 }}>Beulah Radhakrishnan</Typography>
                <Typography sx={{ color:SECONDARY, fontWeight:600, mb:0.5 }}>General Manager, KOPL</Typography>
                <Typography variant="caption" sx={{ opacity:0.6 }}>B.Tech — Information Technology</Typography>

                <Typography sx={{ mt:2, opacity:0.75, lineHeight:1.8, fontSize:"0.95rem" }}>
                  Beulah leads core operations and organizational development at KOPL. With over five years of consulting experience at CRKL Inc. and nearly three years as a Software Developer at Tata Consultancy Services, she brings a rare combination of technical depth and business management capability.
                </Typography>

                <Box sx={{ display:"flex", flexWrap:"wrap", gap:1, mt:2.5 }}>
                  {["Project Management","Technology Execution","TCS Alumni","Avgira Technologies","Multi-lingual"].map((tag) => (
                    <Chip key={tag} label={tag} size="small"
                      sx={{ background:`${PRIMARY}15`, color:PRIMARY, fontWeight:600, fontSize:"0.7rem" }} />
                  ))}
                </Box>

                <Box sx={{ display:"flex", gap:1, mt:2, flexWrap:"wrap" }}>
                  {["English","Hindi","Tamil","Telugu"].map((lang) => (
                    <Chip key={lang} label={lang} size="small" variant="outlined"
                      sx={{ borderColor:`${SECONDARY}50`, color:SECONDARY, fontSize:"0.7rem" }} />
                  ))}
                </Box>

                <Typography sx={{ mt:2.5, fontStyle:"italic", opacity:0.7, fontSize:"0.9rem", borderLeft:`3px solid ${SECONDARY}`, pl:2 }}>
                  "Leadership is about coordination, clarity, and care."
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* ── MISSION & VISION ── */}
      <Box sx={{ py:{ xs:8,md:10 }, overflow:"hidden" }}>
        <Container maxWidth="lg">
          <Grid container sx={{ borderRadius:3, overflow:"hidden", boxShadow:`0 16px 60px ${PRIMARY}20` }}>
            <Grid item xs={12} md={6}
              sx={{ background:`linear-gradient(135deg,${PRIMARY},#145e8e)`, p:{ xs:5,md:7 }, color:"#fff" }}>
              <Typography sx={{ fontWeight:800, fontSize:"0.75rem", letterSpacing:2, mb:3, opacity:0.7, textTransform:"uppercase" }}>
                Our Mission
              </Typography>
              <Typography variant="h5" sx={{ lineHeight:1.7, fontStyle:"italic" }}>
                To provide cost-effective, high-quality, and reliable business outsourcing — delivered in a timely and secure manner, consistently meeting the needs and expectations of our clients.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}
              sx={{ background:(t) => t.palette.mode==="dark"?"#0d2137":"#f8fcff", p:{ xs:5,md:7 } }}>
              <Typography sx={{ fontWeight:800, fontSize:"0.75rem", letterSpacing:2, mb:3, opacity:0.6, textTransform:"uppercase", color:PRIMARY }}>
                Our Vision
              </Typography>
              <Typography variant="h5" sx={{ lineHeight:1.7, fontStyle:"italic", color:PRIMARY }}>
                To build an outsourcing ecosystem where capability, security, and dependability converge — creating lasting value for businesses, teams, and the regions we serve.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── ABOUT CTA ── */}
      <Box sx={{ py:{ xs:8,md:10 }, textAlign:"center", background:`linear-gradient(160deg,${PRIMARY}0d 0%,${SECONDARY}0d 100%)` }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ mb:2, fontWeight:700 }}>Want to know if we're the right fit?</Typography>
          <Typography sx={{ opacity:0.65, mb:4 }}>
            Book a discovery call with CRKL Inc. — we'll be straightforward about what we can and cannot do for your business.
          </Typography>
          <CTAButton text="Book a Discovery Call" />
        </Container>
      </Box>
    </Box>
  );
}

// ============================================================
// TAB 3 — SERVICES
// ============================================================
function Services() {
  return (
    <Box sx={{ pt:{ xs:10,md:10 } }}>
      {/* Hero */}
      <Box sx={{ py:{ xs:8,md:12 }, textAlign:"center", background:`radial-gradient(ellipse at 50% 30%,${PRIMARY}18 0%,transparent 60%)` }}>
        <Container maxWidth="md">
          <Chip label="Services" sx={{ mb:3, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
          <Typography variant="h1" sx={{ fontSize:{ xs:"2.2rem",md:"3rem" }, mb:2 }}>
            Professional services. Measurable outcomes.
          </Typography>
          <Typography sx={{ opacity:0.65, fontSize:"1.08rem", lineHeight:1.8 }}>
            Every service is delivered by qualified professionals at KOPL's secure Madurai office — managed from Chesterfield by M. Peri Periasamy.
          </Typography>
        </Container>
      </Box>

      {/* Service Pillars */}
      {SERVICES.map((s, i) => (
        <Box key={i} sx={{ py:{ xs:8,md:10 }, background:i%2!==0?`linear-gradient(160deg,${s.color}08 0%,transparent 60%)`:"transparent" }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center" direction={i%2!==0?"row-reverse":"row"}>
              <Grid item xs={12} md={5}>
                <Box sx={{
                  p:4, borderRadius:"24px",
                  background:`linear-gradient(135deg,${s.color}15,${s.color}08)`,
                  border:`2px solid ${s.color}25`,
                  textAlign:"center",
                }}>
                  <Typography sx={{ fontSize:"5rem", mb:2 }}>{s.icon}</Typography>
                  <Typography variant="h4" sx={{ fontWeight:800, color:s.color, mb:1 }}>Pillar {i+1} of 3</Typography>
                  <Typography variant="h5" sx={{ fontWeight:700 }}>{s.title}</Typography>
                  <Chip label={s.tag} sx={{ mt:2, background:`${s.color}20`, color:s.color, fontWeight:700 }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography variant="h4" sx={{ fontWeight:700, mb:2 }}>{s.title}</Typography>
                <Typography sx={{ opacity:0.72, lineHeight:1.85, mb:3 }}>{s.summary}</Typography>
                <Box sx={{ display:"flex", flexDirection:"column", gap:1.5 }}>
                  {s.items.map((item) => (
                    <Box key={item} sx={{ display:"flex", alignItems:"flex-start", gap:1.5 }}>
                      <CheckIcon sx={{ fontSize:20, color:s.color, mt:0.2, flexShrink:0 }} />
                      <Typography variant="body2" sx={{ opacity:0.8, lineHeight:1.7 }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}

      {/* Services CTA */}
      <Box sx={{ py:{ xs:8,md:10 }, textAlign:"center", background:`linear-gradient(160deg,${PRIMARY}0d 0%,${SECONDARY}0d 100%)` }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ mb:2, fontWeight:700 }}>Not sure which services you need?</Typography>
          <Typography sx={{ opacity:0.65, mb:4 }}>
            Book a discovery call. We'll listen first, then recommend only what makes sense for your business size and stage.
          </Typography>
          <CTAButton text="Book a Discovery Call" />
        </Container>
      </Box>
    </Box>
  );
}

// ============================================================
// TAB 4 — WHY CRKL
// ============================================================
function WhyCRKL() {
  const [expanded, setExpanded] = useState(false);
  const toggle = (p) => (_, isExp) => setExpanded(isExp ? p : false);

  const FAQ_GROUPS = [
    {
      label:"Trust & Accountability",
      items: CONCERNS.slice(0,4),
    },
    {
      label:"Data Security & Confidentiality",
      items:[
        { q:"Who has access to my QuickBooks or financial systems?", a:"Only the specific team members assigned to your engagement. Access is role-limited, monitored, and can be revoked at any time. We use cloud-based systems with access logs, so there is always a verifiable record." },
        { q:"What happens to my data if we end the engagement?", a:"Your data belongs to you. Upon engagement closure, all access is revoked, and data handling procedures are followed per the terms of your agreement. We can walk you through exactly what this looks like before you sign anything." },
      ],
    },
    {
      label:"Cost, Pricing & Value",
      items:[
        { q:"Are there hidden costs I should know about?", a:"No. Every engagement is scoped in writing before it begins. Costs, scope, and any potential additions are discussed transparently upfront. You will not receive surprise invoices." },
        { q:"Can I start with just one service and expand later?", a:"Yes. Most clients begin with one focused area — typically bookkeeping or tax support — and expand as they see results. We grow with your business at your pace." },
      ],
    },
    {
      label:"Process & Onboarding",
      items:[
        { q:"What information do I need to provide to get started?", a:"Typically: access to your accounting software (QuickBooks), a summary of your current processes, any existing reports or chart of accounts, and your preferred reporting formats. We guide you through a checklist — you don't need to figure it out alone." },
        { q:"Can I stop or pause the engagement if my needs change?", a:"Yes. Engagement terms are discussed clearly upfront, including exit and pause conditions. We believe in long-term relationships built on results — not lock-in contracts that trap clients." },
      ],
    },
    {
      label:"IT Services",
      items:[
        { q:"Do I need a technical background to work with your IT team?", a:"No. Our IT team translates technical requirements into plain business language. You describe the problem or the outcome you want — we handle the implementation and report back in terms you can act on." },
        { q:"What kind of businesses is the IT service suited for?", a:"SMEs that need reliable web development, automation, or IT system support — but do not have the volume to justify a full-time in-house developer or IT manager." },
      ],
    },
  ];

  return (
    <Box sx={{ pt:{ xs:10,md:10 } }}>
      {/* Hero */}
      <Box sx={{ py:{ xs:8,md:12 }, background:`radial-gradient(ellipse at 60% 30%,${SECONDARY}18 0%,transparent 55%)` }}>
        <Container maxWidth="md" sx={{ textAlign:"center" }}>
          <Chip label="Why CRKL Inc." sx={{ mb:3, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
          <Typography variant="h1" sx={{ fontSize:{ xs:"2.2rem",md:"3rem" }, mb:3 }}>
            The solution built around your concerns
          </Typography>
          <Typography sx={{ opacity:0.7, fontSize:"1.05rem", lineHeight:1.85, mb:5 }}>
            As outsourcing expanded, a clear pattern emerged: large companies reap its cost savings, while small businesses remain reluctant. Their hesitation centers on real, valid concerns. CRKL Inc. was built to address every single one.
          </Typography>

          {/* Common concerns list */}
          <Box sx={{ display:"flex", flexDirection:"column", gap:1.5, textAlign:"left", maxWidth:560, mx:"auto" }}>
            {[
              "Who is this Indian company? How can we trust them?",
              "What about data security? Will our business information be safe?",
              "Do they have the knowledge to meet U.S. small business needs?",
              "What if their work is not up to our standards?",
              "Won't language and cultural differences create barriers?",
            ].map((concern) => (
              <Box key={concern} sx={{ display:"flex", gap:1.5, alignItems:"flex-start" }}>
                <Typography sx={{ color:PRIMARY, fontSize:"1.2rem", lineHeight:1.2 }}>?</Typography>
                <Typography sx={{ opacity:0.75, lineHeight:1.75, fontSize:"0.95rem" }}>{concern}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* The Solution */}
      <Box sx={{ py:{ xs:8,md:12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="Our Solution" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              The ideal and viable model
            </Typography>
            <Typography sx={{ opacity:0.65, maxWidth:560, mx:"auto", lineHeight:1.8 }}>
              Instead of connecting U.S. small businesses to an unknown Indian firm, we started our own — KOPL — as the dedicated Indian arm of CRKL Inc. One roof. One management. One standard.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { icon:"🤝", t:"U.S. Contract, U.S. Accountability", d:"Your signed agreement is with CRKL Inc. — a Missouri-registered U.S. corporation. Not with KOPL. Not with India. With us." },
              { icon:"🔒", t:"Secure, Dedicated Office", d:"All work is performed in KOPL's dedicated, secure office in Madurai — not in a remote or unsupervised environment." },
              { icon:"👥", t:"You Choose Who You Hire", d:"You conduct the virtual interview. You approve the candidate. No blind placements — ever." },
              { icon:"⚡", t:"We Manage Everything Else", d:"Hiring, onboarding, HR, performance management, and daily oversight — handled by CRKL Inc. and KOPL. You review the output." },
              { icon:"📋", t:"Written Scope. No Surprises.", d:"Every engagement begins with a formal scope agreement. Costs, timelines, and standards are in writing before work begins." },
              { icon:"🎯", t:"Same Team. Every Day.", d:"A dedicated team handles your account. Same professionals, same context — no shared queues, no handoffs." },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{
                  p:3, height:"100%", border:`1px solid ${i%2===0?PRIMARY:SECONDARY}20`,
                  "&:hover":{ borderColor:i%2===0?PRIMARY:SECONDARY, transform:"translateY(-4px)", boxShadow:`0 12px 40px ${PRIMARY}18` },
                  transition:"all .25s",
                }}>
                  <Typography sx={{ fontSize:"2rem", mb:2 }}>{item.icon}</Typography>
                  <Typography sx={{ fontWeight:700, mb:1 }}>{item.t}</Typography>
                  <Typography variant="body2" sx={{ opacity:0.7, lineHeight:1.75 }}>{item.d}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Accordion grouped */}
      <Box sx={{ py:{ xs:8,md:12 }, background:`linear-gradient(160deg,${PRIMARY}0d 0%,${SECONDARY}0d 100%)` }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="FAQ" sx={{ mb:2, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              Every question answered
            </Typography>
          </Box>

          {FAQ_GROUPS.map((group, gi) => (
            <Box key={gi} sx={{ mb:5 }}>
              <Typography sx={{
                fontWeight:800, mb:2, color:gi%2===0?PRIMARY:SECONDARY,
                fontSize:"0.8rem", textTransform:"uppercase", letterSpacing:1.5,
              }}>
                {group.label}
              </Typography>
              <Box sx={{ display:"flex", flexDirection:"column", gap:1.5 }}>
                {group.items.map((item, i) => {
                  const key = `g${gi}-i${i}`;
                  return (
                    <Accordion key={key} expanded={expanded===key} onChange={toggle(key)}
                      disableGutters elevation={0}
                      sx={{
                        border:`1px solid ${expanded===key?(gi%2===0?PRIMARY:SECONDARY):"transparent"}40`,
                        borderRadius:"14px !important", overflow:"hidden", "&:before":{ display:"none" },
                        "&.Mui-expanded":{ boxShadow:`0 6px 24px ${PRIMARY}15` },
                      }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color:expanded===key?(gi%2===0?PRIMARY:SECONDARY):"inherit" }} />} sx={{ px:3, py:0.5 }}>
                        <Typography sx={{ fontWeight:600, fontSize:"0.95rem" }}>{item.q}</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ px:3, pb:3, pt:0 }}>
                        <Typography sx={{ opacity:0.72, lineHeight:1.8 }}>{item.a}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Container>
      </Box>

      {/* Why CTA */}
      <Box sx={{ py:{ xs:8,md:10 }, textAlign:"center" }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ mb:2, fontWeight:700 }}>Still have a question we haven't answered?</Typography>
          <Typography sx={{ opacity:0.65, mb:4 }}>
            Book a 30-minute call with Peri. Ask anything. No pitch, no pressure.
          </Typography>
          <CTAButton text="Book a Discovery Call" />
        </Container>
      </Box>
    </Box>
  );
}

// ============================================================
// TAB 5 — CONTACT
// ============================================================
function Contact() {
  const [form, setForm] = useState({ name:"", email:"", company:"", service:"", message:"" });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Please describe your needs";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    // ← Replace with your API / form handler
    setSnack(true);
    setForm({ name:"", email:"", company:"", service:"", message:"" });
    setErrors({});
  };

  const field = (label, key, multiline=false, rows=1) => (
    <TextField
      fullWidth label={label} value={form[key]}
      multiline={multiline} rows={rows}
      error={!!errors[key]} helperText={errors[key]}
      onChange={(e) => { setForm(p=>({...p,[key]:e.target.value})); setErrors(p=>({...p,[key]:""})); }}
      sx={{
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{ borderColor:PRIMARY },
        "& .MuiInputLabel-root.Mui-focused":{ color:PRIMARY },
      }}
    />
  );

  return (
    <Box sx={{ pt:{ xs:10,md:10 } }}>
      {/* Hero */}
      <Box sx={{ py:{ xs:8,md:12 }, textAlign:"center", background:`radial-gradient(ellipse at 50% 30%,${PRIMARY}15 0%,transparent 55%)` }}>
        <Container maxWidth="md">
          <Chip label="Contact" sx={{ mb:3, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
          <Typography variant="h1" sx={{ fontSize:{ xs:"2.2rem",md:"3rem" }, mb:2 }}>
            Let's talk about your business
          </Typography>
          <Typography sx={{ opacity:0.65, fontSize:"1.05rem", lineHeight:1.8 }}>
            A 30-minute discovery call is all it takes. No commitment. No pressure. Just an honest conversation about your needs.
          </Typography>
        </Container>
      </Box>

      {/* Form + Info */}
      <Box sx={{ py:{ xs:4,md:8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="flex-start">
            {/* Info panel */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display:"flex", flexDirection:"column", gap:3 }}>
                <Typography variant="h5" sx={{ fontWeight:700 }}>M. Peri Periasamy</Typography>
                <Typography sx={{ opacity:0.65, lineHeight:1.8 }}>
                  Founder, CRKL Inc. — Chesterfield, Missouri<br/>
                  U.S.-Managed Business Outsourcing
                </Typography>
                {[
                  { icon:<PhoneIcon />, label:"Phone", val:CONTACT_INFO.phone },
                  { icon:<EmailIcon />, label:"Email", val:CONTACT_INFO.email },
                  { icon:<LocationIcon />, label:"Location", val:CONTACT_INFO.location },
                ].map((item) => (
                  <Box key={item.label} sx={{ display:"flex", gap:2, alignItems:"flex-start" }}>
                    <Box sx={{
                      width:46, height:46, borderRadius:2.5, flexShrink:0,
                      background:`linear-gradient(135deg,${PRIMARY}20,${SECONDARY}20)`,
                      display:"flex", alignItems:"center", justifyContent:"center", color:PRIMARY,
                    }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="caption" sx={{ opacity:0.5, textTransform:"uppercase", letterSpacing:1, fontWeight:700 }}>{item.label}</Typography>
                      <Typography sx={{ fontWeight:600 }}>{item.val}</Typography>
                    </Box>
                  </Box>
                ))}

                <Divider />
                <Button variant="contained" href={BOOKING_URL} target="_blank" size="large"
                  sx={{ background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`, boxShadow:`0 6px 24px ${PRIMARY}44` }}>
                  Book a Discovery Call Directly
                </Button>
                <Typography variant="caption" sx={{ opacity:0.5, textAlign:"center" }}>
                  No commitment. 30 minutes.
                </Typography>
              </Box>
            </Grid>

            {/* Form */}
            <Grid item xs={12} md={8}>
              <Card sx={{ p:{ xs:3,md:4.5 } }}>
                <Typography variant="h6" sx={{ fontWeight:700, mb:3 }}>Send a message</Typography>
                <Box sx={{ display:"flex", flexDirection:"column", gap:2.5 }}>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>{field("Full Name *","name")}</Grid>
                    <Grid item xs={12} sm={6}>{field("Email Address *","email")}</Grid>
                  </Grid>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>{field("Company / Business Name","company")}</Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth select label="Service of Interest"
                        value={form.service}
                        onChange={(e)=>setForm(p=>({...p,service:e.target.value}))}
                        SelectProps={{ native:true }}
                        sx={{ "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{ borderColor:PRIMARY } }}
                      >
                        <option value=""></option>
                        <option value="accounting">Accounting & Finance</option>
                        <option value="tax">Tax Services</option>
                        <option value="it">IT Services</option>
                        <option value="general">General Inquiry</option>
                      </TextField>
                    </Grid>
                  </Grid>
                  {field("Tell us about your business and what you need *","message",true,5)}
                  <Button
                    variant="contained" size="large" endIcon={<SendIcon />}
                    onClick={handleSubmit}
                    sx={{
                      alignSelf:"flex-end",
                      background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
                      px:4, py:1.4,
                      boxShadow:`0 6px 24px ${PRIMARY}44`,
                      "&:hover":{ boxShadow:`0 10px 36px ${PRIMARY}66` },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar open={snack} autoHideDuration={5000} onClose={()=>setSnack(false)} anchorOrigin={{ vertical:"bottom",horizontal:"center" }}>
        <Alert severity="success" variant="filled" sx={{ background:SECONDARY }}>
          Message received! We'll be in touch within 24 hours.
        </Alert>
      </Snackbar>
    </Box>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ mode }) {
  return (
    <Box component="footer" sx={{ py:6, background:mode==="dark"?"#05111d":"#0c1e30", color:"rgba(255,255,255,0.7)" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={5}>
            <Typography sx={{
              fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:"1.3rem",
              background:`linear-gradient(90deg,${PRIMARY},${SECONDARY})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", mb:1,
            }}>CRKL Inc.</Typography>
            <Typography variant="body2" sx={{ opacity:0.55, lineHeight:1.8, mb:1 }}>
              U.S.-Managed Business Outsourcing<br/>
              Chesterfield, Missouri
            </Typography>
            <Typography variant="caption" sx={{ opacity:0.4 }}>crklinc.com</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography sx={{ fontWeight:700, mb:1.5, color:"#fff" }}>Quick Links</Typography>
            {NAV_LINKS.map((l) => (
              <Typography key={l} variant="body2" sx={{ mb:0.75, opacity:0.55, cursor:"pointer", "&:hover":{ opacity:1, color:PRIMARY } }}>{l}</Typography>
            ))}
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography sx={{ fontWeight:700, mb:1.5, color:"#fff" }}>Contact</Typography>
            <Typography variant="body2" sx={{ opacity:0.55, mb:0.5 }}>{CONTACT_INFO.email}</Typography>
            <Typography variant="body2" sx={{ opacity:0.55, mb:0.5 }}>{CONTACT_INFO.phone}</Typography>
            <Typography variant="body2" sx={{ opacity:0.55 }}>{CONTACT_INFO.location}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my:4, borderColor:"rgba(255,255,255,0.08)" }} />
        <Box sx={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:1 }}>
          <Typography variant="caption" sx={{ opacity:0.35 }}>
            © {new Date().getFullYear()} CRKL Inc. All rights reserved. Chesterfield, Missouri.
          </Typography>
          <Typography variant="caption" sx={{ opacity:0.35 }}>
            Privacy Policy · Terms of Service
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  const [mode, setMode] = useState("light"); // ← change to "dark" for dark default
  const [activeTab, setActiveTab] = useState("Home");
  const theme = buildTheme(mode);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "Home":        return <Home />;
      case "About":       return <About />;
      case "Services":    return <Services />;
      case "Why CRKL":    return <WhyCRKL />;
      case "Contact":     return <Contact />;
      default:            return <Home />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} toggleMode={()=>setMode(m=>m==="light"?"dark":"light")} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>{renderTab()}</main>
      <Footer mode={mode} />
      <ScrollToTop />
    </ThemeProvider>
  );
}
