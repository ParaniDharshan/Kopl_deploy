import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Chip,
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

// ─── DATA ────────────────────────────────────────────────────────────────────

const education = [
  {
    icon: <ScienceIcon fontSize="small" />,
    degree: "Doctorate in Chemistry",
    school: "Florida State University",
    color: "#1565C0",
    bg: "#E3F2FD",
  },
  {
    icon: <BusinessCenterIcon fontSize="small" />,
    degree: "MBA — International Business",
    school: "Saint Louis University",
    color: "#1B5E20",
    bg: "#E8F5E9",
  },
  {
    icon: <GavelIcon fontSize="small" />,
    degree: "Law Degree",
    school: "Saint Louis University",
    color: "#4A148C",
    bg: "#F3E5F5",
  },
];

const careerPoints = [
  "Results-based decision-making & goal-driven operations",
  "Deep exposure to American business culture at multinational level",
  "Commitment to quality, cost discipline & strategic execution",
  "Built a reputation on trust, reliability & professional integrity",
];

const civicTimeline = [
  { year: "2012", event: "Joined Chesterfield Regional Chamber of Commerce" },
  { year: "~3 yrs", event: "Led Business Education Committee" },
  { year: "2014–2019", event: "Board of Directors — Chamber" },
  { year: "2019", event: "Chairman of the Board" },
  { year: "2017–Now", event: "Finance & Admin Citizens Advisory Committee, City of Chesterfield" },
];

// ─── ANIMATION HOOK ───────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── BENTO CARD ───────────────────────────────────────────────────────────────

function BentoCard({ children, sx = {}, delay = 0, visible }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #E0E0E0",
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

// ─── CIVIC STEPPER ────────────────────────────────────────────────────────────

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {civicTimeline.map((item, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          {/* Line + dot */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 20 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                mt: "4px",
                flexShrink: 0,
                background: i <= active ? "#1565C0" : "#E0E0E0",
                border: i === active ? "2.5px solid #90CAF9" : "2px solid transparent",
                transition: "background 0.4s, border 0.4s",
                boxShadow: i === active ? "0 0 0 3px #E3F2FD" : "none",
              }}
            />
            {i < civicTimeline.length - 1 && (
              <Box
                sx={{
                  width: 2,
                  flex: 1,
                  minHeight: 28,
                  background: i < active ? "#1565C0" : "#E0E0E0",
                  transition: "background 0.4s",
                  mt: "2px",
                  mb: "2px",
                }}
              />
            )}
          </Box>

          {/* Content */}
          <Box
            sx={{
              pb: i < civicTimeline.length - 1 ? 1.5 : 0,
              opacity: i <= active ? 1 : 0.35,
              transition: "opacity 0.4s",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "#1565C0",
                fontFamily: "'DM Mono', monospace",
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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function FounderSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        maxWidth: 1100,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 10 },
        fontFamily: "'Lora', serif",
      }}
    >
      {/* ── Section heading ── */}
      <Box
        sx={{
          mb: 6,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.5s, transform 0.5s",
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "#1565C0",
            letterSpacing: 3,
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
          }}
        >
          About Our Founder
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Lora', serif",
            fontWeight: 700,
            color: "#1A237E",
            fontSize: { xs: "1.8rem", md: "2.4rem" },
            lineHeight: 1.25,
            mt: 0.5,
          }}
        >
          The Mind Behind CRKL
        </Typography>
      </Box>

      {/* ── Bento grid ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
          gridTemplateRows: { md: "auto auto" },
          gap: 2.5,
        }}
      >
        {/* ── LEFT: Founder photo card (spans 2 rows) ── */}
        <BentoCard
          delay={0}
          visible={visible}
          sx={{
            gridRow: { md: "1 / 3" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            background: "linear-gradient(160deg, #1A237E 0%, #1565C0 100%)",
            border: "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* decorative circle */}
          <Box
            sx={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
            }}
          />

          <Avatar
            src="/founder-photo.jpg"
            alt="Founder"
            sx={{
              width: 130,
              height: 130,
              mt: 2,
              border: "4px solid rgba(255,255,255,0.3)",
              fontSize: "3rem",
              bgcolor: "#0D47A1",
            }}
          >
            F
          </Avatar>

          <Box sx={{ textAlign: "center", zIndex: 1 }}>
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontFamily: "'Lora', serif", fontWeight: 700 }}
            >
              Founder & Principal
            </Typography>
            <Typography variant="body2" sx={{ color: "#90CAF9", mt: 0.5 }}>
              CRKL Consulting
            </Typography>
          </Box>

          <Divider sx={{ width: "80%", borderColor: "rgba(255,255,255,0.15)" }} />

          {/* Credential chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center", px: 1 }}>
            {["PhD Chemistry", "MBA", "J.D. Law"].map((c) => (
              <Chip
                key={c}
                label={c}
                size="small"
                sx={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#E3F2FD",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </Box>

          <Box sx={{ textAlign: "center", px: 2, pb: 1, zIndex: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, fontSize: "0.82rem" }}
            >
              A rare blend of scientific rigor, global business acumen, and legal expertise — built over decades of multinational leadership.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, pb: 1 }}>
            {[
              { icon: <StarIcon sx={{ fontSize: 16 }} />, label: "20+ yrs" },
              { icon: <EmojiEventsIcon sx={{ fontSize: 16 }} />, label: "Chamber Chair" },
            ].map(({ icon, label }) => (
              <Box key={label} sx={{ textAlign: "center" }}>
                <Box sx={{ color: "#FFD54F", mb: 0.3 }}>{icon}</Box>
                <Typography variant="caption" sx={{ color: "#90CAF9", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem" }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </BentoCard>

        {/* ── TOP RIGHT: Education ── */}
        <BentoCard delay={150} visible={visible}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <AccountBalanceIcon sx={{ color: "#1565C0", fontSize: 20 }} />
            <Typography
              variant="overline"
              sx={{ fontFamily: "'DM Mono', monospace", color: "#1565C0", letterSpacing: 2, fontSize: "0.68rem" }}
            >
              Education
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {education.map(({ icon, degree, school, color, bg }, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: "10px",
                  background: bg,
                  border: `1px solid ${color}22`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateX(20px)",
                  transition: `opacity 0.5s ${200 + i * 120}ms, transform 0.5s ${200 + i * 120}ms`,
                }}
              >
                <Box sx={{ color, mt: "2px" }}>{icon}</Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "#1A237E", fontSize: "0.85rem" }}>
                    {degree}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#607D8B", fontFamily: "'DM Mono', monospace" }}>
                    {school}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </BentoCard>

        {/* ── BOTTOM RIGHT: 2-col split — Career + Civic ── */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.5 }}>
          {/* Career */}
          <BentoCard delay={300} visible={visible} sx={{ background: "#F8F9FF" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <BusinessCenterIcon sx={{ color: "#1565C0", fontSize: 20 }} />
              <Typography
                variant="overline"
                sx={{ fontFamily: "'DM Mono', monospace", color: "#1565C0", letterSpacing: 2, fontSize: "0.68rem" }}
              >
                Career
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#37474F", mb: 1.5, fontSize: "0.8rem", lineHeight: 1.6 }}>
              Led key roles at <strong>Mallinckrodt</strong>, a multinational corporation headquartered in St. Louis.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {careerPoints.map((pt, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    gap: 1,
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.5s ${400 + i * 100}ms`,
                  }}
                >
                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#1565C0",
                      mt: "7px",
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="caption" sx={{ color: "#455A64", lineHeight: 1.6 }}>
                    {pt}
                  </Typography>
                </Box>
              ))}
            </Box>
          </BentoCard>

          {/* Civic stepper */}
          <BentoCard delay={400} visible={visible}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <EmojiEventsIcon sx={{ color: "#1565C0", fontSize: 20 }} />
              <Typography
                variant="overline"
                sx={{ fontFamily: "'DM Mono', monospace", color: "#1565C0", letterSpacing: 2, fontSize: "0.68rem" }}
              >
                Civic Leadership
              </Typography>
            </Box>
            <CivicStepper visible={visible} />
          </BentoCard>
        </Box>
      </Box>
    </Box>
  );
}
