import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Portal,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  CheckCircleRounded,
  Close as CloseIcon,
  EmailOutlined,
  IntegrationInstructions,
  LockOutlined,
  LocationOnOutlined,
  PhoneOutlined,
  SendRounded,
  Shield,
  SupportAgent,
  TrendingUp,
  VerifiedOutlined,
} from "@mui/icons-material";
import { PRIMARY, SECONDARY, CONTACT_INFO as DEFAULT_CONTACT_INFO } from "../Constants.js";

/* ─────────────────────────────────────────────────────────────
   LOCAL TAILWIND MICRO-ENGINE
   All utility classes used in this file, scoped to .contact-root
───────────────────────────────────────────────────────────── */
const TAILWIND_CSS = `
/* ── Overflow fix ── */
.contact-root { overflow-x: hidden !important; }

/* ── Reset / base ── */
.contact-root *, .contact-root *::before, .contact-root *::after { box-sizing: border-box; }

/* ── Display ── */
.contact-root .relative   { position: relative; }
.contact-root .absolute   { position: absolute; }
.contact-root .fixed      { position: fixed; }
.contact-root .inset-0    { top: 0; right: 0; bottom: 0; left: 0; }
.contact-root .sticky     { position: sticky; }
.contact-root .top-24     { top: 6rem; }

/* ── Display types ── */
.contact-root .hidden  { display: none; }
.contact-root .block   { display: block; }
.contact-root .inline-flex { display: inline-flex; }
.contact-root .flex    { display: flex; }
.contact-root .grid    { display: grid; }

/* ── Flex ── */
.contact-root .flex-col       { flex-direction: column; }
.contact-root .flex-wrap      { flex-wrap: wrap; }
.contact-root .flex-shrink-0  { flex-shrink: 0; }
.contact-root .flex-1         { flex: 1 1 0%; }
.contact-root .items-start    { align-items: flex-start; }
.contact-root .items-center   { align-items: center; }
.contact-root .justify-center { justify-content: center; }
.contact-root .justify-between{ justify-content: space-between; }
.contact-root .self-start     { align-self: flex-start; }

/* ── Grid ── */
.contact-root .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.contact-root .place-items-center { place-items: center; }

/* ── Gap ── */
.contact-root .gap-1    { gap: 0.25rem; }
.contact-root .gap-1\\.5 { gap: 0.375rem; }
.contact-root .gap-2    { gap: 0.5rem; }
.contact-root .gap-2\\.5 { gap: 0.625rem; }
.contact-root .gap-3    { gap: 0.75rem; }
.contact-root .gap-4    { gap: 1rem; }
.contact-root .gap-5    { gap: 1.25rem; }
.contact-root .gap-6    { gap: 1.5rem; }
.contact-root .gap-8    { gap: 2rem; }
.contact-root .gap-16   { gap: 4rem; }

/* ── Padding ── */
.contact-root .p-8     { padding: 2rem; }
.contact-root .pt-1    { padding-top: 0.25rem; }
.contact-root .pt-4    { padding-top: 1rem; }
.contact-root .pb-3\\.5 { padding-bottom: 0.875rem; }
.contact-root .px-2    { padding-left: 0.5rem; padding-right: 0.5rem; }
.contact-root .px-4    { padding-left: 1rem; padding-right: 1rem; }
.contact-root .px-6    { padding-left: 1.5rem; padding-right: 1.5rem; }
.contact-root .py-2    { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.contact-root .py-3    { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.contact-root .py-20   { padding-top: 5rem; padding-bottom: 5rem; }

/* ── Margin ── */
.contact-root .mx-auto  { margin-left: auto; margin-right: auto; }
.contact-root .mx-4     { margin-left: 1rem; margin-right: 1rem; }
.contact-root .mt-0\\.5  { margin-top: 0.125rem; }
.contact-root .mt-1     { margin-top: 0.25rem; }
.contact-root .mt-1\\.5  { margin-top: 0.375rem; }
.contact-root .mb-1     { margin-bottom: 0.25rem; }
.contact-root .mb-2\\.25 { margin-bottom: 0.5625rem; }
.contact-root .ml-0\\.5  { margin-left: 0.125rem; }
.contact-root .ml-1\\.5  { margin-left: 0.375rem; }
.contact-root .-mt-1    { margin-top: -0.25rem; }

/* ── Sizing ── */
.contact-root .w-1      { width: 0.25rem; }
.contact-root .w-8      { width: 2rem; }
.contact-root .w-full   { width: 100%; }
.contact-root .w-fit    { width: fit-content; }
.contact-root .h-px     { height: 1px; }
.contact-root .h-0\\.5   { height: 0.125rem; }
.contact-root .h-1      { height: 0.25rem; }
.contact-root .h-full   { height: 100%; }
.contact-root .h-8      { width: 2rem; height: 2rem; }
.contact-root .min-h-screen { min-height: 100vh; }
.contact-root .max-w-7xl  { max-width: 80rem; }
.contact-root .max-w-sm   { max-width: 24rem; }
.contact-root .max-w-none { max-width: none; }

/* ── Overflow ── */
.contact-root .overflow-hidden { overflow: hidden; }
.contact-root .overflow-x-hidden { overflow-x: hidden; }

/* ── Border radius ── */
.contact-root .rounded      { border-radius: 0.25rem; }
.contact-root .rounded-full { border-radius: 9999px; }
.contact-root .rounded-lg   { border-radius: 0.5rem; }
.contact-root .rounded-2xl  { border-radius: 1rem; }

/* ── Border ── */
.contact-root .border   { border-width: 1px; border-style: solid; }
.contact-root .border-none { border: none; }

/* ── Background ── */
.contact-root .bg-slate-100 { background-color: rgb(241 245 249); }

/* ── Text ── */
.contact-root .text-xs     { font-size: 0.75rem; line-height: 1rem; }
.contact-root .text-sm     { font-size: 0.875rem; line-height: 1.25rem; }
.contact-root .text-base   { font-size: 1rem; line-height: 1.5rem; }
.contact-root .text-center { text-align: center; }
.contact-root .text-red-500 { color: rgb(239 68 68); }
.contact-root .text-\\[11px\\] { font-size: 11px; }
.contact-root .text-\\[10px\\] { font-size: 10px; }
.contact-root .text-\\[0\\.8125rem\\] { font-size: 0.8125rem; }
.contact-root .text-\\[1rem\\]  { font-size: 1rem; }
.contact-root .text-\\[2rem\\]  { font-size: 2rem; }
.contact-root .text-\\[0\\.7rem\\] { font-size: 0.7rem; }
.contact-root .text-\\[0\\.8125rem\\] { font-size: 0.8125rem; }

/* ── Font weight ── */
.contact-root .font-normal   { font-weight: 400; }
.contact-root .font-medium   { font-weight: 500; }
.contact-root .font-semibold { font-weight: 600; }
.contact-root .font-bold     { font-weight: 700; }

/* ── Line height ── */
.contact-root .leading-snug    { line-height: 1.375; }
.contact-root .leading-relaxed { line-height: 1.625; }
.contact-root .leading-\\[1\\.14\\] { line-height: 1.14; }

/* ── Tracking ── */
.contact-root .tracking-tight      { letter-spacing: -0.025em; }
.contact-root .tracking-\\[0\\.22em\\] { letter-spacing: 0.22em; }
.contact-root .tracking-\\[0\\.2em\\]  { letter-spacing: 0.2em; }
.contact-root .tracking-\\[0\\.18em\\] { letter-spacing: 0.18em; }
.contact-root .tracking-\\[0\\.12em\\] { letter-spacing: 0.12em; }

/* ── Uppercase ── */
.contact-root .uppercase { text-transform: uppercase; }

/* ── Pointer ── */
.contact-root .cursor-pointer      { cursor: pointer; }
.contact-root .cursor-not-allowed  { cursor: not-allowed; }

/* ── User select ── */
.contact-root .select-none { user-select: none; }

/* ── Outline ── */
.contact-root .outline-none { outline: none; }

/* ── Opacity ── */
.contact-root .opacity-70 { opacity: 0.7; }

/* ── Tabular nums ── */
.contact-root .tabular-nums { font-variant-numeric: tabular-nums; }

/* ── Scroll ── */
.contact-root .scroll-mt-20 { scroll-margin-top: 5rem; }

/* ── Transition ── */
.contact-root .transition-all      { transition-property: all; transition-timing-function: cubic-bezier(0.4,0,0.2,1); transition-duration: 150ms; }
.contact-root .transition-colors   { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4,0,0.2,1); transition-duration: 150ms; }
.contact-root .duration-200 { transition-duration: 200ms; }
.contact-root .duration-300 { transition-duration: 300ms; }
.contact-root .ease-out { transition-timing-function: cubic-bezier(0,0,0.2,1); }

/* ── Transform ── */
.contact-root .translate-y-0      { transform: translateY(0px); }
.contact-root .-translate-y-\\[1px\\] { transform: translateY(-1px); }
.contact-root .scale-\\[1\\.03\\]    { transform: scale(1.03); }
.contact-root .scale-\\[0\\.97\\]    { transform: scale(0.97); }
.contact-root .scale-\\[0\\.988\\]   { transform: scale(0.988); }

/* ── Hover states ── */
.contact-root .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }
.contact-root .hover\\:-translate-y-\\[1px\\]:hover { transform: translateY(-1px); }
.contact-root .hover\\:scale-\\[1\\.03\\]:hover  { transform: scale(1.03); }

/* ── Active states ── */
.contact-root .active\\:translate-y-0:active    { transform: translateY(0); }
.contact-root .active\\:scale-\\[0\\.988\\]:active { transform: scale(0.988); }
.contact-root .active\\:scale-\\[0\\.97\\]:active  { transform: scale(0.97); }

/* ── Focus-visible ── */
.contact-root .focus-visible\\:outline-none:focus-visible { outline: none; }
.contact-root .focus-visible\\:ring-2:focus-visible        { box-shadow: 0 0 0 2px; }
.contact-root .focus-visible\\:ring-offset-2:focus-visible { box-shadow: 0 0 0 4px; }

/* ── Vertical align ── */
.contact-root .align-middle { vertical-align: middle; }

/* ── Pointer events ── */
.contact-root .pointer-events-none { pointer-events: none; }

/* ── Responsive: sm (640px) ── */
@media (min-width: 640px) {
  .contact-root .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .contact-root .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
}

/* ── Responsive: md (768px) ── */
@media (min-width: 768px) {
  .contact-root .md\\:text-\\[2\\.5rem\\] { font-size: 2.5rem; }
  .contact-root .md\\:p-10 { padding: 2.5rem; }
}

/* ── Responsive: lg (1024px) ── */
@media (min-width: 1024px) {
  .contact-root .lg\\:grid-cols-2   { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .contact-root .lg\\:sticky        { position: sticky; }
  .contact-root .lg\\:top-24        { top: 6rem; }
  .contact-root .lg\\:px-12         { padding-left: 3rem; padding-right: 3rem; }
  .contact-root .lg\\:py-28         { padding-top: 7rem; padding-bottom: 7rem; }
  .contact-root .lg\\:gap-16        { gap: 4rem; }
}

/* ── Responsive: xl (1280px) ── */
@media (min-width: 1280px) {
  .contact-root .xl\\:gap-24 { gap: 6rem; }
}

/* ── Original embedded animations ── */
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pillEnter {
  from { opacity: 0; transform: translateY(8px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.contact-root .pill-enter {
  animation: pillEnter 0.35s cubic-bezier(0.22,1,0.36,1);
}
.contact-root .form-card-enter {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
}
.contact-root .form-card-enter.visible {
  opacity: 1;
  transform: translateY(0);
}
.contact-root .eyebrow-dot {
  animation: fadeUp 2.5s ease-in-out infinite;
}
.contact-root .btn-submit {
  position: relative;
  overflow: hidden;
}
.contact-root .btn-submit::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.contact-root .btn-submit:not(:disabled):hover::after {
  opacity: 1;
  animation: shimmer 0.7s ease forwards;
}
.contact-root .MuiOutlinedInput-root:focus-within {
  transform: translateY(-1px);
}
.contact-root .field-reveal {
  opacity: 0;
  transform: translateY(12px);
  animation: fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
}
`;

const SERVICE_OPTIONS = [
  { value: "Accounting Services", label: "Accounting" },
  { value: "Tax Services", label: "Tax" },
  { value: "IT Services", label: "IT" },
];

const TRUST_FACTORS = [
  {
    Icon: Shield,
    heading: "SOC 2 Type II Certified",
    body: "Enterprise-grade data security and compliance baked in from day one.",
  },
  {
    Icon: SupportAgent,
    heading: "Dedicated Account Teams",
    body: "A named specialist handles your account - no ticket queues, no hand-offs.",
  },
  {
    Icon: IntegrationInstructions,
    heading: "Deep ERP & CRM Integrations",
    body: "Native connectors for SAP, NetSuite, Salesforce, and 40+ enterprise platforms.",
  },
  {
    Icon: TrendingUp,
    heading: "Proven at Scale",
    body: "Trusted by finance and ops teams at companies from Series B to Fortune 500.",
  },
];

const MAX_DESC = 500;
const INITIAL_FORM = {
  name: "",
  company: "",
  email: "",
  services: [],
  description: "",
};

const POPUP = {
  title: "Message received",
  body:
    "A specialist will review your inquiry and follow up within 2 business hours. Check your inbox for a confirmation.",
  cta: "Done",
};

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function FieldLabel({ children, required = false, dark = false }) {
  return (
    <Typography
      sx={{
        fontSize: "0.68rem",
        fontWeight: 800,
        color: dark ? "#a7bfd6" : "#38505e",
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

function ServicePill({ label, value, active, onToggle, delay, dark }) {
  return (
    <motion.button
      type="button"
      onClick={() => onToggle(value)}
      aria-pressed={active}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: active ? PRIMARY : dark ? "#0b1d31" : "#fff",
        borderColor: active ? PRIMARY : dark ? "rgba(148,163,184,0.2)" : "#e2e8f0",
        color: active ? "#fff" : dark ? "#dbeafe" : "#475569",
        boxShadow: active
          ? "0 10px 22px rgba(29,137,200,0.22)"
          : dark
            ? "0 4px 14px rgba(0,0,0,0.26)"
            : "0 4px 14px rgba(15,23,42,0.04)",
      }}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-[0.8125rem] font-medium select-none cursor-pointer outline-none transition-all duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
    >
      <span
        className="flex items-center justify-center transition-all duration-200"
        style={{ width: active ? 16 : 0, overflow: "hidden", opacity: active ? 1 : 0 }}
      >
        <CheckCircleRounded sx={{ fontSize: 13, color: "#ffffff" }} />
      </span>
      {label}
    </motion.button>
  );
}

function TrustRow({ Icon, heading, body, delay, dark }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="flex items-start gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-18px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div
        className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg border flex items-center justify-center"
        style={{
          backgroundColor: hovered
            ? dark
              ? "rgba(14,165,233,0.14)"
              : "rgba(14,165,233,0.06)"
            : dark
              ? "#0b1d31"
              : "#f8fafc",
          borderColor: hovered
            ? "rgba(14,165,233,0.25)"
            : dark
              ? "rgba(148,163,184,0.18)"
              : "#f1f5f9",
          transition: "background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
          transform: hovered ? "scale(1.12)" : "scale(1)",
        }}
      >
        <Icon
          sx={{
            fontSize: 16,
            color: hovered ? PRIMARY : dark ? "#9bb3c8" : "#94a3b8",
            transition: "color 0.25s ease",
          }}
        />
      </div>
      <div>
        <p
          className="text-sm font-semibold leading-snug transition-colors duration-200"
          style={{ color: hovered ? (dark ? "#eef6ff" : "#0f172a") : dark ? "#d8e6f3" : "#1e293b" }}
        >
          {heading}
        </p>
        <p
          className="text-xs font-normal mt-0.5 leading-relaxed"
          style={{ color: dark ? "rgba(157,178,200,0.82)" : "#64748b" }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function SuccessPopup({ open, onClose }) {
  const confetti = Array.from({ length: 22 }, (_, i) => ({
    color: [PRIMARY, SECONDARY, "#1d4ed8", "#38bdf8", "#0f4c81", "#7dd3fc"][i % 6],
    left: `${(i / 22) * 96 + 2}%`,
    size: 5 + (i % 4),
    dur: 2.35 + (i % 4) * 0.28,
    delay: i * 0.045,
    round: i % 3 === 0,
  }));

  return (
    <Portal>
      <AnimatePresence mode="wait">
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
              {confetti.map((piece, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -18, rotate: -10, scale: 0.9 }}
                  animate={{ opacity: [0, 1, 0], y: "108vh", rotate: 540, scale: [0.9, 1, 0.85] }}
                  transition={{ duration: piece.dur, delay: piece.delay, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: piece.left,
                    width: piece.size,
                    height: piece.size,
                    borderRadius: piece.round ? "50%" : "2px",
                    background: piece.color,
                  }}
                />
              ))}
            </Box>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.22, ease: "easeOut" } }}
              exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
              onClick={onClose}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1500,
                background: "rgba(8,32,58,0.66)",
                backdropFilter: "blur(10px)",
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
                initial={{ opacity: 0, scale: 0.9, y: 26, filter: "blur(6px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { type: "spring", stiffness: 190, damping: 20, mass: 0.95 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  y: 18,
                  filter: "blur(5px)",
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
                style={{ width: "min(460px, 92vw)", pointerEvents: "auto" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: `1px solid ${PRIMARY}24`,
                    background: "#fff",
                    boxShadow: "0 28px 80px rgba(8,32,58,0.28)",
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
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background:
                          "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.22), transparent 34%), radial-gradient(circle at 50% 110%, rgba(255,255,255,0.12), transparent 38%)",
                      }}
                    />

                    <motion.div
                      initial={{ scale: 0.78, rotate: -12, opacity: 0 }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        opacity: 1,
                        transition: { type: "spring", stiffness: 240, damping: 18 },
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: 82,
                          height: 82,
                          mx: "auto",
                          mb: 2.25,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            inset: -8,
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${SECONDARY}2a 0%, transparent 70%)`,
                            filter: "blur(2px)",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            background: `linear-gradient(145deg, ${PRIMARY}, ${SECONDARY})`,
                            boxShadow: "0 12px 30px rgba(29,137,200,0.35)",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 10,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,255,255,0.24)",
                            backdropFilter: "blur(2px)",
                          }}
                        />
                        <Box
                          sx={{
                            position: "relative",
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.96)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
                          }}
                        >
                          <CheckCircleRounded sx={{ fontSize: 30, color: PRIMARY }} />
                        </Box>
                      </Box>
                    </motion.div>

                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "1.4rem",
                        position: "relative",
                        fontFamily: '"Sora", sans-serif',
                        letterSpacing: "-0.03em",
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
                        transition: "transform 0.2s ease, color 0.2s ease",
                        "&:hover": { color: PRIMARY, transform: "rotate(90deg)" },
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
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          boxShadow: `0 12px 30px ${PRIMARY}50`,
                          transform: "translateY(-1px)",
                        },
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

function validate(form) {
  const errors = {};

  if (form.name.trim().length < 2) errors.name = "Full name is required.";
  if (form.company.trim().length < 2) errors.company = "Company name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid work email address.";
  }
  if (form.services.length === 0) errors.services = "Select at least one service area.";
  if (form.description.trim().length < 15) {
    errors.description = "Please provide at least 15 characters of context.";
  }

  return errors;
}

export default function Contact() {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "", sev: "success" });
  const [formVisible, setFormVisible] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const backgroundColor = dark ? "#0a1929" : "#f0f9ff";
    const color = dark ? "#e8f4ff" : "#0f172a";
    const previousHtmlBg = document.documentElement.style.backgroundColor;
    const previousBodyBg = document.body.style.backgroundColor;
    const previousBodyColor = document.body.style.color;
    const root = document.getElementById("root");
    const previousRootBg = root ? root.style.backgroundColor : "";

    document.documentElement.style.backgroundColor = backgroundColor;
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = color;
    if (root) root.style.backgroundColor = backgroundColor;

    return () => {
      document.documentElement.style.backgroundColor = previousHtmlBg;
      document.body.style.backgroundColor = previousBodyBg;
      document.body.style.color = previousBodyColor;
      if (root) root.style.backgroundColor = previousRootBg;
    };
  }, [dark]);

  useEffect(() => {
    if (!formRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFormVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    if (name === "description" && value.length > MAX_DESC) return;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }, []);

  const toggleService = useCallback((service) => {
    setForm((previous) => {
      const services = previous.services.includes(service)
        ? previous.services.filter((item) => item !== service)
        : [...previous.services, service];
      return { ...previous, services };
    });
    setErrors((previous) => ({ ...previous, services: "" }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setToast({ open: true, msg: "Please resolve the highlighted fields.", sev: "error" });
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm(INITIAL_FORM);
    }, 650);
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
  };

  const contactInfo = [
    { Icon: LocationOnOutlined, label: "Office", value: DEFAULT_CONTACT_INFO.location },
    { Icon: PhoneOutlined, label: "Phone", value: DEFAULT_CONTACT_INFO.phone },
    { Icon: EmailOutlined, label: "Email", value: DEFAULT_CONTACT_INFO.email },
    { Icon: LockOutlined, label: "Privacy", value: "Encrypted in transit and at rest" },
  ];

  const descLen = form.description.length;
  const descRatio = descLen / MAX_DESC;
  const paperBg = dark ? "#0d2137" : "#ffffff";

  return (
    <>
      {/* Inject scoped micro-engine styles */}
      <style>{TAILWIND_CSS}</style>

      <div className="contact-root">
        <section
          id="contact"
          aria-label="Contact Us"
          className="relative min-h-screen scroll-mt-20 mx-4"
          style={{
            scrollBehavior: "smooth",
            fontFamily: '"DM Sans", "Segoe UI", sans-serif',
            background: dark ? "#0a1929" : "#f0f9ff",
          }}
        >
          <div
            className="h-px w-full"
            style={{ backgroundColor: dark ? "rgba(148,163,184,0.18)" : "rgba(29,137,200,0.12)" }}
          />

          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-12 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
              <div className="flex flex-col gap-3 lg:sticky lg:top-24">
                <Reveal delay={0}>
                  <div className="flex flex-col gap-2">
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: dark ? "#9db2c8" : "#94a3b8" }}
                    >
                      Contact Us
                    </p>
                    <div className="inline-flex items-center gap-1 w-fit">
                      <div className="eyebrow-dot w-1 h-1 rounded-full" style={{ backgroundColor: PRIMARY }} />
                      <span
                        className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: SECONDARY }}
                      >
                        Enterprise Partnerships
                      </span>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={80}>
                  <div className="flex flex-col gap-1">
                    <h2
                      className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.14] tracking-tight mb-1"
                      style={{ fontFamily: '"Sora", sans-serif', color: dark ? "#eef6ff" : "#0f172a", margin: 0 }}
                    >
                      Partner with us to scale your enterprise operations.
                    </h2>
                    <p
                      className="text-base font-normal leading-relaxed max-w-sm mt-0"
                      style={{ color: dark ? "rgba(226,239,255,0.76)" : "#64748b", margin: 0 }}
                    >
                      Accounting, tax, and IT expertise - delivered as a unified service layer for growing enterprises.
                    </p>
                  </div>
                </Reveal>

                <div className="flex flex-col gap-2">
                  <Reveal delay={0}>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{ fontFamily: '"Sora", sans-serif', color: dark ? "#9db2c8" : "#94a3b8" }}
                    >
                      Why enterprise teams choose us
                    </p>
                  </Reveal>
                  {TRUST_FACTORS.map((factor, index) => (
                    <TrustRow
                      key={factor.heading}
                      {...factor}
                      delay={index * 90}
                      dark={dark}
                    />
                  ))}
                </div>

                <Reveal delay={0}>
                  <div className="flex items-start gap-2 pt-1">
                    <LockOutlined sx={{ fontSize: 12, color: dark ? "#9bb3c8" : "#94a3b8", mt: "2px", flexShrink: 0 }} />
                    <span
                      className="text-[11px] font-normal leading-relaxed"
                      style={{ color: dark ? "rgba(157,178,200,0.82)" : "#94a3b8" }}
                    >
                      All submissions are encrypted in transit and at rest. We never sell or share your data.
                    </span>
                  </div>
                </Reveal>
              </div>

              <div
                ref={formRef}
                className={`form-card-enter w-full rounded-2xl overflow-hidden${formVisible ? " visible" : ""}`}
                style={{
                  transitionDelay: "120ms",
                  background: paperBg,
                  border: dark ? "1px solid rgba(148,163,184,0.18)" : "1px solid #e2e8f0",
                  boxShadow: dark ? "0 18px 54px rgba(0,0,0,0.38)" : "0 2px 24px rgba(15,23,42,0.06)",
                }}
              >
                <div className="p-8 md:p-10">
                  {submitted ? (
                    <SuccessPopup open={submitted} onClose={handleReset} />
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      aria-label="Enterprise contact form"
                      className="flex flex-col gap-5"
                    >
                      <div
                        className="mb-1 field-reveal"
                        style={{ animationDelay: formVisible ? "180ms" : "9999ms" }}
                      >
                        <p
                          className="text-[1rem] font-semibold tracking-tight"
                          style={{ fontFamily: '"Sora", sans-serif', color: dark ? "#eef6ff" : "#0f172a" }}
                        >
                          Get in touch
                        </p>
                        <p className="text-xs font-normal mt-0.5" style={{ color: dark ? "rgba(165,185,205,0.9)" : "#94a3b8" }}>
                          Fill in the form and a specialist will respond within 2 business hours.
                        </p>
                      </div>

                      <Divider sx={{ borderColor: dark ? "rgba(148,163,184,0.18)" : "#e2e8f0" }} />

                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 field-reveal"
                        style={{ animationDelay: formVisible ? "240ms" : "9999ms" }}
                      >
                        <TextField
                          name="name"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: 52,
                            },
                            "& .MuiInputBase-input": {
                              padding: "0 14px",
                              height: "100%",
                              boxSizing: "border-box",
                            },
                            "& .MuiInputLabel-root": {
                              transform: "translate(14px, 14px) scale(1)",
                            },
                            "& .MuiInputLabel-shrink": {
                              transform: "translate(14px, -6px) scale(0.75)",
                            },
                          }}
                          value={form.name}
                          onChange={handleChange}
                          error={Boolean(errors.name)}
                          helperText={errors.name || ""}
                          label="Full Name"
                          placeholder="Jane Smith"
                          autoComplete="name"
                          inputProps={{ "aria-label": "Full Name" }}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          error={Boolean(errors.company)}
                          helperText={errors.company || ""}
                          label="Company Name"
                          placeholder="Acme Corp"
                          autoComplete="organization"
                          inputProps={{ "aria-label": "Company Name" }}
                          
sx={{
    "& .MuiOutlinedInput-root": {
      height: 52,              // ✅ control full height cleanly
    },
    "& .MuiInputBase-input": {
      padding: "0 14px",       // ✅ remove vertical padding (important)
      height: "100%",          // ✅ center text vertically
      boxSizing: "border-box",
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 14px) scale(1)",  // ✅ fix initial label position
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)", // ✅ fix floating label position
    }
  }}

                        />
                      </div>

                      <div
                        className="field-reveal"
                        style={{ animationDelay: formVisible ? "300ms" : "9999ms" }}
                      >
                        <TextField
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          error={Boolean(errors.email)}
                          helperText={errors.email || ""}
                          label="Work Email"
                          type="email"
                          placeholder="jane@acmecorp.com"
                          autoComplete="email"
                          inputProps={{ "aria-label": "Work Email" }}
                          
sx={{
    "& .MuiOutlinedInput-root": {
      height: 52,              // ✅ control full height cleanly
    },
    "& .MuiInputBase-input": {
      padding: "0 14px",       // ✅ remove vertical padding (important)
      height: "100%",          // ✅ center text vertically
      boxSizing: "border-box",
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 14px) scale(1)",  // ✅ fix initial label position
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)", // ✅ fix floating label position
    }
  }}

                        />
                      </div>

                      <div
                        className="flex flex-col gap-2 field-reveal"
                        style={{ animationDelay: formVisible ? "360ms" : "9999ms" }}
                      >
                        <label
                          className="text-[0.8125rem] font-medium"
                          style={{ fontFamily: '"DM Sans", "Segoe UI", sans-serif', color: dark ? "#a7bfd6" : "#64748b" }}
                        >
                          Service Area
                          <span className="ml-1.5 font-normal text-xs" style={{ color: dark ? "rgba(167,191,214,0.7)" : "#cbd5e1" }}>
                            (multi-select)
                          </span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {SERVICE_OPTIONS.map(({ value, label }, index) => (
                            <ServicePill
                              key={value}
                              value={value}
                              label={label}
                              active={form.services.includes(value)}
                              onToggle={toggleService}
                              delay={index * 60}
                              dark={dark}
                            />
                          ))}
                        </div>
                        {errors.services && (
                          <p className="text-[0.7rem] text-red-500 mt-0.5" role="alert" style={{ animation: "fadeUp 0.25s ease both" }}>
                            {errors.services}
                          </p>
                        )}
                      </div>

                      <div
                        className="flex flex-col field-reveal"
                        style={{ animationDelay: formVisible ? "420ms" : "9999ms" }}
                      >
                        <TextField
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          error={Boolean(errors.description)}
                          helperText={errors.description || ""}
                          label="Project Description"
                          placeholder="Describe your project scope, goals, team size, and timeline..."
                          multiline
                          minRows={4}
                          maxRows={8}
                          inputProps={{
                            "aria-label": "Project Description",
                            maxLength: MAX_DESC,
                          }}
                        />
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: dark ? "rgba(148,163,184,0.16)" : "#e2e8f0" }}>
                            <div
                              className="h-full rounded-full transition-all duration-300 ease-out"
                              style={{
                                width: `${descRatio * 100}%`,
                                backgroundColor: descRatio >= 1 ? "#ef4444" : descRatio >= 0.85 ? "#f59e0b" : PRIMARY,
                              }}
                            />
                          </div>
                          <span
                            className="tabular-nums text-[10px] font-medium transition-colors duration-200 flex-shrink-0"
                            style={{
                              color: descRatio >= 1 ? "#ef4444" : descRatio >= 0.85 ? "#f59e0b" : dark ? "#9bb3c8" : "#94a3b8",
                            }}
                          >
                            {descLen} / {MAX_DESC}
                          </span>
                        </div>
                      </div>

                      <Divider sx={{ borderColor: dark ? "rgba(148,163,184,0.18)" : "#e2e8f0" }} />

                      <div className="field-reveal" style={{ animationDelay: formVisible ? "480ms" : "9999ms" }}>
                        <button
                          type="submit"
                          disabled={loading}
                          className={[
                            "btn-submit w-full flex items-center justify-center gap-2.5",
                            "py-3 px-6 rounded-lg text-sm font-semibold text-white",
                            "border",
                            "transition-all duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                            loading
                              ? "opacity-70 cursor-not-allowed"
                              : "hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.988]",
                          ].join(" ")}
                          style={{
                            background: PRIMARY,
                            borderColor: PRIMARY,
                            boxShadow: "0 10px 24px rgba(29,137,200,0.18)",
                          }}
                        >
                          {loading ? (
                            <>
                              <CircularProgress size={14} sx={{ color: "#fff" }} />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <SendRounded sx={{ fontSize: 15, transition: "transform 0.2s ease" }} />
                            </>
                          )}
                        </button>
                      </div>

                      <div className="field-reveal" style={{ animationDelay: formVisible ? "540ms" : "9999ms" }}>
                        <p className="text-center text-[11px] font-normal -mt-1" style={{ color: dark ? "rgba(157,178,200,0.8)" : "#94a3b8" }}>
                          <VerifiedOutlined
                            sx={{ fontSize: 11, mr: 0.5, verticalAlign: "middle", color: dark ? "#9bb3c8" : "#94a3b8" }}
                          />
                          Encrypted &amp; confidential. No spam, ever.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-slate-100" />
        </section>

        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={() => setToast((previous) => ({ ...previous, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={toast.sev}
            variant="filled"
            onClose={() => setToast((previous) => ({ ...previous, open: false }))}
            sx={{
              fontFamily: '"DM Sans", "Segoe UI", sans-serif',
              fontWeight: 500,
              fontSize: "0.8125rem",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              backgroundColor: dark ? "#0d2137" : undefined,
            }}
          >
            {toast.msg}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}