/**
 * CRKLContact.jsx
 * ─────────────────────────────────────────────────────────────
 * CRKL Inc. — Contact Page
 * Fits exactly like a Hero section: height: 100vh, no scroll.
 * Fully responsive · All fields validated · Themed success popup
 *
 * STACK : Material UI v5 + Tailwind CSS + Framer Motion
 * PLACE : frontend/src/pages/Contact.jsx
 *
 * ── WHERE TO EDIT ──────────────────────────────────────────
 *  [EDIT: COLORS]        PRIMARY / SECONDARY brand colors
 *  [EDIT: BRAND]         Name, tagline, chip text, CTA label
 *  [EDIT: ABOUT]         Left-panel paragraph
 *  [EDIT: CONTACT_INFO]  Address / phone / email / hours
 *  [EDIT: TRUST_ITEMS]   Four trust bullets
 *  [EDIT: SERVICES]      Checkbox options
 *  [EDIT: SIZE_OPTIONS]  Company size dropdown
 *  [EDIT: POPUP]         Success popup copy
 *  [EDIT: SUBMIT_HANDLER]Replace the console.log with your API call
 * ───────────────────────────────────────────────────────────
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  Grid,
  Paper,
  Divider,
  IconButton,
  Portal,
} from "@mui/material";
import { PRIMARY, SECONDARY } from "../Constants.js";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import EastIcon from "@mui/icons-material/East";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

// ─── [EDIT: COLORS] ────────────────────────────────────────
const DARK_BG =
  "linear-gradient(145deg, #0a1929 0%, #12375f 52%, #0d2137 100%)";
// ───────────────────────────────────────────────────────────

// ─── [EDIT: BRAND] ─────────────────────────────────────────
const BRAND = {
  chip: "Chesterfield, Missouri — U.S.-Managed",
  cta: "Book a Free Discovery Call",
  ctaSub: "No commitment · 30 minutes · We understand your business first",
};
// ───────────────────────────────────────────────────────────

// ─── [EDIT: ABOUT] ─────────────────────────────────────────
const ABOUT =
  "CRKL Inc. helps U.S. small and mid-sized businesses manage accounting, finance, and IT operations through a structured, secure, and professionally managed outsourcing model. You work with a trusted U.S.-based partner. We handle the rest.";
// ───────────────────────────────────────────────────────────

// ─── [EDIT: CONTACT_INFO] ──────────────────────────────────
const CONTACT_INFO = [
  {
    Icon: LocationOnOutlinedIcon,
    label: "Office",
    value: "Chesterfield, Missouri, USA",
  },
  { Icon: PhoneOutlinedIcon, label: "Phone", value: "+1 (636) 555-0180" },
  { Icon: EmailOutlinedIcon, label: "Email", value: "hello@crklinc.com" },
  {
    Icon: AccessTimeOutlinedIcon,
    label: "Hours",
    value: "Mon – Fri  8 AM – 6 PM CST",
  },
];
// ───────────────────────────────────────────────────────────

// ─── [EDIT: TRUST_ITEMS] ───────────────────────────────────
const TRUST_ITEMS = [
  { Icon: VerifiedOutlinedIcon, text: "U.S.-Based Management & Oversight" },
  { Icon: LockOutlinedIcon, text: "NDA & Data Protection Guaranteed" },
  {
    Icon: SupportAgentOutlinedIcon,
    text: "Dedicated Account Manager Assigned",
  },
  {
    Icon: HandshakeOutlinedIcon,
    text: "Free Initial Consultation — No Strings",
  },
];
// ───────────────────────────────────────────────────────────

// ─── [EDIT: SERVICES] ──────────────────────────────────────
const SERVICES = [
  "Accounting & Bookkeeping",
  "Tax Preparation & Planning",
  "Payroll Management",
  "IT Support & Infrastructure",
  "Financial Reporting & Analysis",
  "CFO Advisory Services",
];
// ───────────────────────────────────────────────────────────

// ─── [EDIT: SIZE_OPTIONS] ──────────────────────────────────
const SIZE_OPTIONS = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "200+ employees",
];
// ───────────────────────────────────────────────────────────

// ─── [EDIT: POPUP] ─────────────────────────────────────────
const POPUP = {
  title: "You're all set!",
  body: "A CRKL Inc. specialist will reach out within 2–3 business days to schedule your free 30-minute discovery call. Watch your inbox — a confirmation is on its way.",
  badge1: "2–3 Business Days",
  badge2: "Confirmation Email Sent",
  cta: "Got it — thank you!",
};
// ───────────────────────────────────────────────────────────

// ── Shared MUI TextField/Select sx ─────────────────────────
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#ffffff",
    fontSize: "0.87rem",
    transition: "box-shadow 0.2s",
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: PRIMARY,
      borderWidth: "1.5px",
    },
    "&.Mui-focused": { boxShadow: `0 0 0 3px ${PRIMARY}1e` },
  },
  "& label.Mui-focused": { color: PRIMARY },
  "& .MuiFormHelperText-root": { fontSize: "0.72rem", mt: "3px" },
};

function FieldLabel({ children, required = false }) {
  return (
    <Typography
      sx={{
        fontSize: "0.68rem",
        fontWeight: 800,
        color: "#38505e",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        lineHeight: 1.2,
      }}
    >
      {children}
      {required && (
        <Box component="span" sx={{ color: PRIMARY, ml: 0.5 }}>
          *
        </Box>
      )}
    </Typography>
  );
}

const EASE = [0.22, 1, 0.36, 1];

// ── Validation helpers ──────────────────────────────────────
const VALIDATORS = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name"),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? ""
      : "Enter a valid work email",
  company: (v) => (v.trim().length >= 2 ? "" : "Company name is required"),
  phone: (v) =>
    v === "" || /^[\d\s\-()+]{7,}$/.test(v.trim())
      ? ""
      : "Enter a valid phone number",
  size: (v) => (v !== "" ? "" : "Please select a company size"),
};

// ════════════════════════════════════════════════════════════
// Sub-components
// ════════════════════════════════════════════════════════════

function InfoRow({ Icon, label, value }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.4, mb: 1.6 }}>
      <Box sx={{ mt: "2px", color: SECONDARY, flexShrink: 0 }}>
        <Icon sx={{ fontSize: 16 }} />
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.84rem",
            color: "rgba(255,255,255,0.85)",
            fontWeight: 500,
            mt: 0.2,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

function TrustRow({ Icon, text, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.45, delay, ease: EASE },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          py: 0.75,
          px: 1.2,
          mb: 0.7,
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.03)",
          transition: "background 0.2s",
          "&:hover": { background: "rgba(255,255,255,0.07)" },
        }}
      >
        <Box sx={{ color: `${SECONDARY}bb`, flexShrink: 0 }}>
          <Icon sx={{ fontSize: 15 }} />
        </Box>
        <Typography
          sx={{ fontSize: "0.79rem", color: "rgba(255,255,255,0.65)" }}
        >
          {text}
        </Typography>
      </Box>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════
// Success Popup — CRKL themed
// ════════════════════════════════════════════════════════════
function SuccessPopup({ open, onClose }) {
  const CONF = Array.from({ length: 22 }, (_, i) => ({
    color: [PRIMARY, SECONDARY, "#2563eb", "#38bdf8", "#1d4ed8", "#0ea5e9"][
      i % 6
    ],
    left: `${(i / 22) * 96 + 2}%`,
    size: 6 + (i % 5),
    dur: 2.1 + (i % 4) * 0.3,
    delay: i * 0.055,
    round: i % 3 === 0,
  }));

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <>
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 1700,
                overflow: "hidden",
              }}
            >
              {CONF.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, y: -10, rotate: 0 }}
                  animate={{ opacity: 0, y: "108vh", rotate: 580 }}
                  transition={{
                    duration: c.dur,
                    delay: c.delay,
                    ease: "easeIn",
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: c.left,
                    width: c.size,
                    height: c.size,
                    borderRadius: c.round ? "50%" : "2px",
                    background: c.color,
                  }}
                />
              ))}
            </Box>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1500,
                background: "rgba(8,32,58,0.78)",
                backdropFilter: "blur(6px)",
              }}
            />

            <Box
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                pointerEvents: "none",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.82, y: 32 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 22 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  y: 20,
                  transition: { duration: 0.18 },
                }}
                style={{ width: "min(460px, 92vw)", pointerEvents: "auto" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "22px",
                    overflow: "hidden",
                    border: `1px solid ${PRIMARY}30`,
                    background: "#fff",
                  }}
                >
                  <Box
                    sx={{
                      background: `linear-gradient(140deg, #0a1f3d 0%, ${PRIMARY} 55%, #0f4c81 100%)`,
                      pt: 4.5,
                      pb: 4,
                      px: 4,
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.06,
                        pointerEvents: "none",
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />

                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                          type: "spring",
                          stiffness: 280,
                          damping: 18,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 72,
                          height: 72,
                          borderRadius: "50%",
                          background: `${SECONDARY}22`,
                          border: `2px solid ${SECONDARY}55`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        <CheckCircleIcon
                          sx={{ fontSize: 42, color: SECONDARY }}
                        />
                      </Box>
                    </motion.div>

                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "1.4rem",
                        position: "relative",
                      }}
                    >
                      {POPUP.title}
                    </Typography>
                  </Box>

                  <Box sx={{ px: 4, pt: 3, pb: 3.5, position: "relative" }}>
                    <IconButton
                      onClick={onClose}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 10,
                        color: "#8aa6c7",
                        "&:hover": { color: PRIMARY },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>

                    <Typography
                      sx={{
                        fontSize: "0.88rem",
                        color: "#4a5a55",
                        textAlign: "center",
                        mb: 2.5,
                        lineHeight: 1.8,
                      }}
                    >
                      {POPUP.body}
                    </Typography>

                    <Button
                      onClick={onClose}
                      fullWidth
                      variant="contained"
                      sx={{
                        background: `linear-gradient(135deg, ${PRIMARY}, #0f4c81)`,
                        borderRadius: "11px",
                        py: 1.4,
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: `0 8px 24px ${PRIMARY}35`,
                        "&:hover": { boxShadow: `0 12px 30px ${PRIMARY}50` },
                      }}
                    >
                      {POPUP.cta}
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </Box>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}

// ════════════════════════════════════════════════════════════
// Main Component
// ════════════════════════════════════════════════════════════
export default function CRKLContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    size: "",
    message: "",
  });
  const [services, setServices] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ── Field change ─────────────────────────────────────────
  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setForm((p) => ({ ...p, [field]: val }));
    if (touched[field]) {
      const msg = VALIDATORS[field] ? VALIDATORS[field](val) : "";
      setErrors((p) => ({ ...p, [field]: msg }));
    }
  };

  // ── Blur validation ──────────────────────────────────────
  const handleBlur = (field) => () => {
    setTouched((p) => ({ ...p, [field]: true }));
    const msg = VALIDATORS[field] ? VALIDATORS[field](form[field]) : "";
    setErrors((p) => ({ ...p, [field]: msg }));
  };

  const toggleService = (svc) => setServices((p) => ({ ...p, [svc]: !p[svc] }));

  // ── Full validate on submit ──────────────────────────────
  const validateAll = () => {
    const fields = ["name", "email", "phone", "company", "size"];
    const errs = {};
    fields.forEach((f) => {
      const msg = VALIDATORS[f] ? VALIDATORS[f](form[f]) : "";
      if (msg) errs[f] = msg;
    });
    // At least one service selected
    const anyService = Object.values(services).some(Boolean);
    if (!anyService) errs.services = "Please select at least one service";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateAll();
    // Mark all as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      size: true,
    });
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    // ── [EDIT: SUBMIT_HANDLER] ──────────────────────────
    // Replace with your real API call:
    //   await fetch("/api/contact", { method:"POST",
    //     headers:{"Content-Type":"application/json"},
    //     body: JSON.stringify({ ...form, services }) })
    console.log("Form submitted:", { ...form, services });
    // ───────────────────────────────────────────────────

    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      size: "",
      message: "",
    });
    setServices({});
    setTouched({});
    setErrors({});
  };

  return (
    <>
      {/* ── Outer container: fills viewport like Hero ─── */}
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          pt: { xs: 10, md: 10 },
          pb: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 10 },
          borderRadius: { xs: "18px", md: "24px" },
          overflow: "hidden",
          border: "1px solid rgba(23, 54, 81, 0.1)",

          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {/* ══════════════════════════════════════════════
            LEFT PANEL
        ══════════════════════════════════════════════ */}
        <Box
          sx={{
            width: { xs: "100%", lg: "45%" },
            minHeight: { xs: "auto", lg: "100%" },
            background: DARK_BG,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3.5, sm: 5, lg: 7 },
            py: { xs: 5, lg: 0 },
          }}
        >
          {/* Blobs */}
          <Box
            sx={{
              position: "absolute",
              top: "-20%",
              right: "-20%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: `${PRIMARY}22`,
              filter: "blur(85px)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "-14%",
              left: "-12%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: `${SECONDARY}14`,
              filter: "blur(70px)",
              pointerEvents: "none",
            }}
          />
          {/* Grid texture */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.04,
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1, maxWidth: 460 }}>
            {/* Location chip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: EASE },
              }}
            >
              <Chip
                label={BRAND.chip}
                size="small"
                sx={{
                  mb: 2.5,
                  background: `${PRIMARY}2e`,
                  color: SECONDARY,
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  letterSpacing: "0.06em",
                  border: `1px solid ${PRIMARY}55`,
                }}
              />
            </motion.div>

            {/* Headline — mirrors Hero h1 gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, delay: 0.08, ease: EASE },
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "1.95rem", sm: "2.4rem", lg: "2.6rem" },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                  mb: 2,
                  color: "#fff",
                  "& .grad": {
                    background: `linear-gradient(135deg,${PRIMARY} 20%,${SECONDARY})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                }}
              >
                Your books.
                <br />
                <span className="grad">Our discipline.</span>
                <br />
                Your growth.
              </Typography>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.16, ease: EASE },
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.83rem",
                  color: "rgba(255,255,255,0.48)",
                  lineHeight: 1.85,
                  mb: 3,
                }}
              >
                {ABOUT}
              </Typography>
            </motion.div>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 2.5 }} />

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.24, duration: 0.5 },
              }}
            >
              {CONTACT_INFO.map((r) => (
                <InfoRow
                  key={r.label}
                  Icon={r.Icon}
                  label={r.label}
                  value={r.value}
                />
              ))}
            </motion.div>
          </Box>
        </Box>

        {/* ══════════════════════════════════════════════
            RIGHT PANEL — FORM
            Scrollable only on mobile; fits on desktop
        ══════════════════════════════════════════════ */}
        <Box
          sx={{
            flex: 1,
            height: { xs: "auto", lg: "100%" },
            overflowY: { xs: "visible", lg: "auto" },
            display: "flex",
            alignItems: { xs: "flex-start", lg: "center" },
            justifyContent: "center",
            background: "#f3f8fc",
            px: { xs: 3, sm: 5, lg: 5 },
            py: { xs: 4, lg: 4 },
            // Apply consistent two-line spacing for text and form controls
            "& .contact-line-spacing, & .MuiTypography-root, & label, & .MuiFormLabel-root, & .MuiInputBase-input, & .MuiInputBase-inputMultiline, & input, & textarea, & .MuiButton-root":
              {
                lineHeight: 1.5,
              },
          }}
        >
          <Box sx={{ width: "100%", py: { lg: 2 } }}>
            {/* Form header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE },
              }}
            >
              <Typography
                sx={{
                  display: "block",
                  fontSize: "0.67rem",
                  fontWeight: 700,
                  color: PRIMARY,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  mb: 0.5,
                }}
              >
                Free Discovery Call
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#0d1f1c",
                  letterSpacing: "-0.025em",
                  mb: 0.5,
                  fontSize: { xs: "1.7rem", sm: "2rem" },
                }}
              >
                {BRAND.cta}
              </Typography>
              <Typography
                sx={{ fontSize: "0.85rem", color: "#7a8a85", mb: 0.5 }}
              >
                {BRAND.ctaSub}
              </Typography>
            </motion.div>

            {/* ── FORM ── */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                {/* Name */}
                <Grid item xs={12} sm={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.08, duration: 0.45, ease: EASE },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.85,
                      }}
                    >
                      <FieldLabel required>Your Name</FieldLabel>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={fieldSx}
                      />
                    </Box>
                  </motion.div>
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.12, duration: 0.45, ease: EASE },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.85,
                      }}
                    >
                      <FieldLabel required>Work Email</FieldLabel>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        type="email"
                        placeholder="name@company.com"
                        value={form.email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={fieldSx}
                      />
                    </Box>
                  </motion.div>
                </Grid>

                {/* Company */}
                <Grid item xs={12} sm={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.16, duration: 0.45, ease: EASE },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.85,
                      }}
                    >
                      <FieldLabel required>Company Name</FieldLabel>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        placeholder="Your business name"
                        value={form.company}
                        onChange={handleChange("company")}
                        onBlur={handleBlur("company")}
                        error={!!errors.company}
                        helperText={errors.company}
                        sx={fieldSx}
                      />
                    </Box>
                  </motion.div>
                </Grid>

                {/* Phone */}
                <Grid item xs={12} sm={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2, duration: 0.45, ease: EASE },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.85,
                      }}
                    >
                      <FieldLabel>Phone Number</FieldLabel>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        sx={fieldSx}
                      />
                    </Box>
                  </motion.div>
                </Grid>

                {/* Company size */}
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.24, duration: 0.45, ease: EASE },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.85,
                      }}
                    >
                      <FieldLabel required>Company Size</FieldLabel>
                      <FormControl fullWidth size="small" error={!!errors.size}>
                        <Select
                          displayEmpty
                          value={form.size}
                          onChange={handleChange("size")}
                          onBlur={handleBlur("size")}
                          renderValue={(value) =>
                            value ? value : "Select company size"
                          }
                          sx={{
                            borderRadius: "10px",
                            background: "#ffffff",
                            fontSize: "0.87rem",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "rgba(32, 71, 102, 0.18)",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: PRIMARY,
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: PRIMARY,
                              borderWidth: "1.5px",
                            },
                            "&.Mui-focused": {
                              boxShadow: `0 0 0 3px ${PRIMARY}1e`,
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select company size
                          </MenuItem>
                          {SIZE_OPTIONS.map((s) => (
                            <MenuItem key={s} value={s}>
                              {s}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.size && (
                          <Typography
                            sx={{
                              fontSize: "0.72rem",
                              color: "#d32f2f",
                              mt: "3px",
                              ml: "14px",
                            }}
                          >
                            {errors.size}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                  </motion.div>
                </Grid>

                {/* Services */}
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.28, duration: 0.45, ease: EASE },
                    }}
                  >
                    <FieldLabel required>Services you're exploring</FieldLabel>
                    <Paper
                      elevation={0}
                      sx={{
                        border: `1px solid ${errors.services ? "#d32f2f" : "#d8e2de"}`,
                        borderRadius: "10px",
                        px: 2,
                        py: 1.25,
                        background: "#fff",
                      }}
                    >
                      <Grid container spacing={1.2}>
                        {SERVICES.map((svc) => (
                          <Grid item xs={12} sm={6} key={svc}>
                            <Box
                              component="label"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.1,
                                width: "100%",
                                minHeight: 52,
                                px: 1.4,
                                py: 1.1,
                                borderRadius: "10px",
                                border: `1px solid ${services[svc] ? `${PRIMARY}40` : "#dfe7e3"}`,
                                background: services[svc]
                                  ? `${PRIMARY}08`
                                  : "#fff",
                                cursor: "pointer",
                                transition: "all 0.18s ease",
                                "&:hover": { borderColor: `${PRIMARY}60` },
                              }}
                            >
                              <Checkbox
                                checked={!!services[svc]}
                                onChange={() => toggleService(svc)}
                                size="small"
                                sx={{
                                  color: "#c5d0cb",
                                  "&.Mui-checked": { color: PRIMARY },
                                  p: 0,
                                  flexShrink: 0,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "0.82rem",
                                  color: services[svc] ? PRIMARY : "#3a4a45",
                                  fontWeight: services[svc] ? 700 : 500,
                                  lineHeight: 1.4,
                                }}
                              >
                                {svc}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                    {errors.services && (
                      <Typography
                        sx={{
                          fontSize: "0.72rem",
                          color: "#d32f2f",
                          mt: "3px",
                          ml: "14px",
                        }}
                      >
                        {errors.services}
                      </Typography>
                    )}
                  </motion.div>
                </Grid>

                {/* Message */}
                <Grid item xs={20}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.32, duration: 0.45, ease: EASE },
                    }}
                    style={{ width: "100%" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.85,
                        width: "210%",
                        maxWidth: "none",
                        minWidth: 0,
                        flexBasis: "100%",
                      }}
                    >
                      <FieldLabel>Describe your challenge</FieldLabel>
                      <Paper
                        elevation={0}
                        sx={{
                          border: "1px solid #d8e2de",
                          borderRadius: "10px",
                          px: 2,
                          py: 1.25,
                          background: "#fff",
                          width: "100%",
                          maxWidth: "none",
                          minWidth: 0,
                          boxSizing: "border-box",
                        }}
                      >
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="e.g. We're behind on reconciliations, or our IT team is stretched thin…"
                          value={form.message}
                          onChange={handleChange("message")}
                          multiline
                          rows={7}
                          variant="standard"
                          InputProps={{ disableUnderline: true }}
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-root": {
                              alignItems: "flex-start",
                              width: "100%",
                              "&:before": { display: "none" },
                              "&:after": { display: "none" },
                            },
                            "& .MuiInput-underline:before, & .MuiInput-underline:after":
                              { display: "none" },
                            "& .MuiInputBase-inputMultiline": {
                              paddingTop: "8px",
                              lineHeight: 1.55,
                              width: "100%",
                            },
                            "& textarea": {
                              width: "100% !important",
                              border: "none",
                              outline: "none",
                              boxShadow: "none",
                              resize: "vertical",
                            },
                          }}
                        />
                      </Paper>

                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          mt: 2,
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.012 }}
                          whileTap={{ scale: 0.975 }}
                          style={{ width: "100%", maxWidth: 340 }}
                        >
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            endIcon={<EastIcon />}
                            sx={{
                              background: `linear-gradient(135deg,${PRIMARY} 0%,#0c4037 100%)`,
                              borderRadius: "11px",
                              py: 1.55,
                              fontWeight: 800,
                              fontSize: "0.95rem",
                              textTransform: "none",
                              letterSpacing: "0.005em",
                              boxShadow: `0 6px 24px ${PRIMARY}40`,
                              transition: "box-shadow 0.25s",
                              "&:hover": {
                                boxShadow: `0 12px 32px ${PRIMARY}55`,
                              },
                            }}
                          >
                            {BRAND.cta}
                          </Button>
                        </motion.div>
                        <Typography
                          sx={{
                            fontSize: "0.73rem",
                            color: "#a0b0ab",
                            textAlign: "center",
                            mt: 1.4,
                          }}
                        >
                          🔒 100% confidential · No spam, ever.
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── SUCCESS POPUP ─────────────────────────────── */}
      <SuccessPopup open={submitted} onClose={() => setSubmitted(false)} />
    </>
  );
}