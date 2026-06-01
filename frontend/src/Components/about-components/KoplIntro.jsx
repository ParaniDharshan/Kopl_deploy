import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { alpha } from "@mui/material/styles";
import { PRIMARY, SECONDARY } from "../../Constants.js";

// Local images for About intro
const OFFICE_IMG = new URL("../../assets/Office/Conference Hall.webp", import.meta.url).href;
const LEADER_IMG = new URL("../../assets/Our Team/2.webp", import.meta.url).href;

// ─── Content Data ─────────────────────────────────────────────────────────────

const OFFICE_BULLETS = [
  "Purpose-built for secure, focused client work",
  "U.S.-standard IT infrastructure and communication tools",
  "Data security protocols for handling U.S. business operations",
  "Professional workspace equipped from day one",
];

const TEAM_BULLETS = [
  "Degree-qualified professionals with U.S. accounting, finance, and IT training",
  "Fast learners with proven ability to adapt to client-specific processes",
  "Committed to consistent, high-quality output — not intermittent performance",
  "Directly managed by KOPL leadership, overseen by CRKL Inc. from Chesterfield",
];

const LEADERSHIP_TAGS = [
  "Project Management",
  "Technology Execution",
  "TCS Alumni",
  "Avgira Technologies",
  "Multi-lingual",
];

const LEADERSHIP_LANGS = ["English", "Hindi", "Tamil", "Telugu"];

// ─── MediaSlot: dashed placeholder for images/video ──────────────────────────

function MediaSlot({ label, icon: Icon, color, minH = 280 }) {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: minH,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.1)}, ${alpha(color, 0.03)})`,
        border: `1.5px dashed ${alpha(color, 0.3)}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        p: 3,
      }}
    >
      <Icon sx={{ fontSize: 42, color: alpha(color, 0.45) }} />
      <Typography
        sx={{
          fontSize: "0.8rem",
          fontWeight: 600,
          color: alpha(color, 0.5),
          textAlign: "center",
          letterSpacing: 0.4,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ─── BulletList ───────────────────────────────────────────────────────────────

function BulletList({ items, color }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {items.map((item) => (
        <Box key={item} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: color,
              flexShrink: 0,
              mt: "8px",
            }}
          />
          <Typography sx={{ fontSize: "0.9rem", opacity: 0.76, lineHeight: 1.75 }}>
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

// ─── SectionBlock: chip + two-column row (content | media, alternating) ───────
//   reverse=false → content LEFT,  media RIGHT
//   reverse=true  → media LEFT,    content RIGHT  (via row-reverse)

function SectionBlock({ label, labelIcon, labelColor, reverse, mediaSlot, children }) {
  return (
    <Box>
      {/* Section chip — always full-width above the row */}
      <Chip
        icon={React.cloneElement(labelIcon, { style: { fontSize: 14 } })}
        label={label}
        size="small"
        sx={{
          mb: 3,
          background: `${labelColor}18`,
          color: labelColor,
          fontWeight: 700,
          fontSize: "0.75rem",
        }}
      />

      {/* Two-column row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" },
          gap: { xs: 3, md: 5 },
          alignItems: "stretch",
        }}
      >
        {/* Content column — grows to fill remaining space */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>

        {/* Media column — fixed width, never shrinks */}
        <Box
          sx={{
            width: { xs: "100%", md: "42%" },
            flexShrink: 0,
          }}
        >
          {mediaSlot}
        </Box>
      </Box>
    </Box>
  );
}

// ─── ABCDialog: full-screen modal ────────────────────────────────────────────

function KOPLDialog({ open, onClose }) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 0,
          background: theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : "#fafbfd",
          overflow: "hidden",
        },
      }}
    >
      {/* ── Sticky header ── */}
      <DialogTitle
        sx={{
          p: 0,
          flexShrink: 0,
          background: `linear-gradient(120deg, ${alpha(PRIMARY, 0.08)}, ${alpha(SECONDARY, 0.06)})`,
          borderBottom: `1px solid ${alpha(PRIMARY, 0.1)}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2.5, md: 6 },
            py: 2.5,
            maxWidth: 1100,
            mx: "auto",
            width: "100%",
          }}
        >
          <Box>
            <Chip
              label="India Delivery Arm"
              size="small"
              sx={{
                mb: 0.5,
                background: `${SECONDARY}20`,
                color: SECONDARY,
                fontWeight: 700,
                fontSize: "0.72rem",
              }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.5rem" }, lineHeight: 1.2 }}
            >
              Kamala Outsourcing Private Limited — Full Overview
            </Typography>
            <Typography sx={{ opacity: 0.55, fontSize: "0.85rem", mt: 0.25 }}>
              Madurai, Tamil Nadu · Founded by M. Peri Periasamy
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              background: alpha(PRIMARY, 0.08),
              "&:hover": { background: alpha(PRIMARY, 0.16) },
              ml: 2,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* ── Scrollable body ── */}
      <DialogContent
        sx={{
          px: 0,
          py: 0,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 2.5, md: 6 },
            py: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >

          {/* ── 1. The Office — image RIGHT ── */}
          <SectionBlock
            label="The KOPL Office"
            labelIcon={<BusinessIcon />}
            labelColor={PRIMARY}
            reverse={false}
            mediaSlot={
              <Box
                component="img"
                src={OFFICE_IMG}
                alt="KOPL Office - Conference Hall"
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 200, md: 280 },
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />
            }
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, fontSize: "1.15rem" }}>
              A professional workspace built for client delivery
            </Typography>
            <Typography sx={{ opacity: 0.72, lineHeight: 1.9, mb: 2.5, fontSize: "0.95rem" }}>
              All client work is performed at KOPL's dedicated professional office in Madurai.
              The workspace is purpose-built for secure, focused client work — equipped with
              the IT infrastructure, communication tools, and data security protocols required
              to handle U.S. business operations from day one.
            </Typography>
            <BulletList items={OFFICE_BULLETS} color={PRIMARY} />
          </SectionBlock>

          <Divider sx={{ borderColor: alpha(PRIMARY, 0.1) }} />

          {/* ── 2. Leadership — image LEFT (reverse) ── */}
          <SectionBlock
            label="KOPL Leadership"
            labelIcon={<PersonIcon />}
            labelColor={SECONDARY}
            reverse={true}
            mediaSlot={
              <Box
                component="img"
                src={LEADER_IMG}
                alt="KOPL Leadership - Beulah Radhakrishnan"
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 220, md: 320 },
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />
            }
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.4, fontSize: "1.15rem" }}>
              Beulah Radhakrishnan
            </Typography>
            <Typography sx={{ color: SECONDARY, fontWeight: 700, fontSize: "0.88rem", mb: 0.4 }}>
              General Manager, KOPL
            </Typography>
            <Typography sx={{ opacity: 0.5, fontSize: "0.8rem", mb: 2 }}>
              B.Tech — Information Technology
            </Typography>

            <Typography sx={{ opacity: 0.74, lineHeight: 1.9, mb: 2.5, fontSize: "0.95rem" }}>
              Beulah leads core operations and organisational development at KOPL. She brings
              over five years of consulting experience with CRKL Inc. and nearly three
              years as a Software Developer at Tata Consultancy Services — a combination
              of technical depth and business management capability directly applied to
              client engagement delivery. Her background also includes consulting at
              Avgira Technologies and entrepreneurial leadership across multiple ventures.
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 1.8 }}>
              {LEADERSHIP_TAGS.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  sx={{ background: `${PRIMARY}15`, color: PRIMARY, fontWeight: 600, fontSize: "0.7rem" }}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 2.5 }}>
              {LEADERSHIP_LANGS.map((l) => (
                <Chip
                  key={l}
                  label={l}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: `${SECONDARY}55`, color: SECONDARY, fontSize: "0.7rem" }}
                />
              ))}
            </Box>

            <Box
              sx={{
                borderLeft: `3px solid ${SECONDARY}`,
                pl: 2,
                py: 0.75,
                background: alpha(SECONDARY, 0.05),
                borderRadius: "0 6px 6px 0",
              }}
            >
              <Typography sx={{ fontStyle: "italic", opacity: 0.72, fontSize: "0.92rem", lineHeight: 1.6 }}>
                "Leadership is about coordination, clarity, and care."
              </Typography>
              <Typography sx={{ fontSize: "0.74rem", opacity: 0.48, mt: 0.5, fontWeight: 600 }}>
                — Beulah Radhakrishnan, General Manager, KOPL
              </Typography>
            </Box>
          </SectionBlock>

          <Divider sx={{ borderColor: alpha(SECONDARY, 0.1) }} />

          {/* ── 3. The Team — image RIGHT ── */}
          <SectionBlock
            label="The KOPL Team"
            labelIcon={<GroupsIcon />}
            labelColor={PRIMARY}
            reverse={false}
            mediaSlot={
              <Box
                component="img"
                src={TEAM_IMG}
                alt="KOPL Team"
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 200, md: 300 },
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />
            }
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, fontSize: "1.15rem" }}>
              Selected for qualification, discipline, and delivery
            </Typography>
            <Typography sx={{ opacity: 0.72, lineHeight: 1.9, mb: 2.5, fontSize: "0.95rem" }}>
              KOPL's professionals are selected for their qualifications, their discipline,
              and their demonstrated capacity to deliver to U.S. business standards. Every
              team member is directly managed by KOPL leadership and overseen by CRKL Inc.
              from Chesterfield.
            </Typography>
            <BulletList items={TEAM_BULLETS} color={SECONDARY} />
          </SectionBlock>

        </Box>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function KOPLIntroduction() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          py: { xs: 5, md: 7 },
          background: (theme) =>
            theme.palette.mode === "dark"
              ? `linear-gradient(135deg, ${alpha(SECONDARY, 0.06)}, ${alpha(PRIMARY, 0.04)})`
              : `linear-gradient(135deg, ${alpha(SECONDARY, 0.06)}, ${alpha(PRIMARY, 0.03)})`,
          borderTop: `1px solid ${alpha(PRIMARY, 0.08)}`,
          borderBottom: `1px solid ${alpha(SECONDARY, 0.08)}`,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Chip
              icon={<LocationOnIcon sx={{ fontSize: "14px !important" }} />}
              label="Madurai, Tamil Nadu — India Delivery"
              sx={{
                mb: 2,
                background: `${SECONDARY}20`,
                color: SECONDARY,
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />

            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "1.85rem", md: "2.5rem" }, fontWeight: 800, mb: 2, maxWidth: 680, lineHeight: 1.25 }}
            >
              Introducing{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Kamala Outsourcing Private Limited
              </Box>
            </Typography>

            <Typography
              sx={{ opacity: 0.75, lineHeight: 1.9, fontSize: { xs: "0.98rem", md: "1.05rem" }, maxWidth: 760, mb: 1 }}
            >
              KOPL Limited is the India-based delivery arm of CRKL Inc., founded by{" "}
              <Box component="span" sx={{ fontWeight: 700, opacity: 1 }}>M. Peri Periasamy</Box>
              {" "}— the same founder who leads operations in Chesterfield. It is not a
              third-party vendor and not an agency with a separate agenda. KOPL is where all
              client outsourcing work is carried out, staffed from Madurai's large, educated,
              English-speaking professional workforce and overseen by the same individual
              accountable to you in the U.S.
            </Typography>

            <Typography
              sx={{ opacity: 0.5, fontSize: "0.88rem", mb: 3, display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <LocationOnIcon sx={{ fontSize: 15 }} />
              Madurai is one of South India's major university and industrial cities — home to
              a large talent pool in accounting, finance, IT, and software development.
            </Typography>

            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              sx={{
                borderColor: SECONDARY,
                color: SECONDARY,
                fontWeight: 700,
                fontSize: "0.92rem",
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": { borderColor: SECONDARY, background: alpha(SECONDARY, 0.07) },
              }}
            >
              Know More About KOPL →
            </Button>
          </Box>

          {/* Summary cards */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mt: 1 }}>
            {[
              { icon: <BusinessIcon sx={{ fontSize: 20 }} />, label: "The Office", desc: "Dedicated professional workspace in Madurai with U.S.-grade IT infrastructure.", color: PRIMARY },
              { icon: <PersonIcon sx={{ fontSize: 20 }} />, label: "Leadership", desc: "Beulah Radhakrishnan, General Manager — 5+ years consulting experience with CRKL Inc. and TCS background.", color: SECONDARY },
              { icon: <GroupsIcon sx={{ fontSize: 20 }} />, label: "The Team", desc: "Degree-qualified professionals trained in U.S. accounting, finance, and IT workflows.", color: PRIMARY },
            ].map((card) => (
              <Box
                key={card.label}
                onClick={() => setOpen(true)}
                sx={{
                  flex: 1,
                  p: { xs: 2, md: 2.5 },
                  borderRadius: 2.5,
                  border: `1px solid ${alpha(card.color, 0.18)}`,
                  background: (theme) =>
                    theme.palette.mode === "dark" ? alpha(card.color, 0.06) : alpha(card.color, 0.04),
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                  "&:hover": {
                    borderColor: alpha(card.color, 0.45),
                    background: alpha(card.color, 0.08),
                    transform: "translateY(-3px)",
                    boxShadow: `0 8px 28px ${alpha(card.color, 0.14)}`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 38, height: 38, borderRadius: 1.5,
                    background: alpha(card.color, 0.12),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: card.color, mb: 1.5,
                  }}
                >
                  {card.icon}
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: "0.93rem", mb: 0.5 }}>{card.label}</Typography>
                <Typography sx={{ opacity: 0.65, fontSize: "0.83rem", lineHeight: 1.6 }}>{card.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <KOPLDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

// Team image (requested)
const TEAM_IMG = new URL("../../assets/Events/Annual Conference/IMG20250605214643.webp", import.meta.url).href;