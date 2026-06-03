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
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { LinkedIn } from "@mui/icons-material";
import { MailIcon } from "lucide-react";
import { alpha } from "@mui/material/styles";
import { PRIMARY, SECONDARY } from "../../Constants.js";

// Images
const OFFICE_IMG = new URL("../../assets/Office/Conference Hall.webp", import.meta.url).href;
const TEAM_IMG = new URL("../../assets/Events/Annual Conference/IMG20250605214643.webp", import.meta.url).href;
import PERI_SIR_IMAGE from "../../assets/Images/Peri_Sir_Image.png";

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
  "Directly managed by CRKL Inc leadership, overseen by CRKL Inc from Chesterfield",
];

const PERI_TAGS = [
  "30+ yrs Chesterfield",
  "PhD Chemistry",
  "MBA + JD",
  "Chamber Chairman 2019",
];

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

// ─── SectionBlock ─────────────────────────────────────────────────────────────

function SectionBlock({ label, labelIcon, labelColor, reverse, mediaSlot, children }) {
  return (
    <Box>
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

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" },
          gap: { xs: 3, md: 5 },
          alignItems: "stretch",
        }}
      >
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

        <Box sx={{ width: { xs: "100%", md: "42%" }, flexShrink: 0 }}>
          {mediaSlot}
        </Box>
      </Box>
    </Box>
  );
}

// ─── KOPLDialog ───────────────────────────────────────────────────────────────

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
              label="US Delivery Arm"
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
              CRKL Inc — Full Overview
            </Typography>
            <Typography sx={{ opacity: 0.55, fontSize: "0.85rem", mt: 0.25 }}>
              Chesterfield, Missouri · Founded by M. Peri Periasamy
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
      <DialogContent sx={{ px: 0, py: 0, overflowY: "auto" }}>
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
            label="The CRKL Inc Office"
            labelIcon={<BusinessIcon />}
            labelColor={PRIMARY}
            reverse={false}
            mediaSlot={
              <Box
                component="img"
                src={OFFICE_IMG}
                alt="CRKL Inc Office - Conference Hall"
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
              All client work is performed at CRKL Inc's dedicated professional office in Chesterfield.
              The workspace is purpose-built for secure, focused client work — equipped with
              the IT infrastructure, communication tools, and data security protocols required
              to handle U.S. business operations from day one.
            </Typography>
            <BulletList items={OFFICE_BULLETS} color={PRIMARY} />
          </SectionBlock>

          <Divider sx={{ borderColor: alpha(PRIMARY, 0.1) }} />

          {/* ── 2. Founder — Peri (moved from FounderSection) — image LEFT (reverse) ── */}
          <SectionBlock
            label="Our Founder"
            labelIcon={<PersonIcon />}
            labelColor={PRIMARY}
            reverse={true}
            mediaSlot={
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  minHeight: { xs: 220, md: 340 },
                  boxShadow: 3,
                  "&:hover .overlay": { opacity: 1 },
                }}
              >
                <Box
                  component="img"
                  src={PERI_SIR_IMAGE}
                  alt="M. Peri Periasamy"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    p: 2,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(3,18,33,0.78) 100%)",
                    color: "#fff",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                    <Button
                      href="mailto:peri@example.com"
                      variant="contained"
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: 999,
                        bgcolor: "transparent",
                        color: "#fff",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <MailIcon />
                    </Button>
                    <Button
                      href="https://www.linkedin.com/in/peri-periasamy"
                      target="_blank"
                      rel="noreferrer"
                      variant="contained"
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        fontWeight: 700,
                        borderRadius: 999,
                        bgcolor: "transparent",
                        color: "#fff",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <LinkedIn />
                    </Button>
                  </Stack>
                </Box>
              </Box>
            }
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.4, fontSize: "1.15rem" }}>
              M. Peri Periasamy
            </Typography>
            <Typography sx={{ color: PRIMARY, fontWeight: 700, fontSize: "0.88rem", mb: 0.4 }}>
              Founder & CEO, CRKL INC.
            </Typography>
            <Typography sx={{ opacity: 0.5, fontSize: "0.8rem", mb: 2 }}>
              PhD Chemistry · MBA · JD (International Business)
            </Typography>

            <Typography sx={{ opacity: 0.74, lineHeight: 1.9, mb: 1.5, fontSize: "0.95rem" }}>
              Peri was born and raised in Madurai, Tamil Nadu, India. His father owned a small
              hardware distribution company — and from his earliest years, Peri worked there
              during summers and college breaks, learning what it truly means to operate a
              small business.
            </Typography>
            <Typography sx={{ opacity: 0.74, lineHeight: 1.9, mb: 2.5, fontSize: "0.95rem" }}>
              He moved to the United States more than 50 years ago, earned a doctorate at
              Florida State University, then an MBA and Law degree from Saint Louis University
              with a concentration in international business. He has lived in Chesterfield for
              over 30 years, served on the Chamber Board of Directors, and chaired the Chamber
              in 2019.
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 2.5 }}>
              {PERI_TAGS.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  sx={{
                    background: `${SECONDARY}15`,
                    color: SECONDARY,
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              ))}
            </Box>

            <Box
              sx={{
                borderLeft: `3px solid ${PRIMARY}`,
                pl: 2,
                py: 0.75,
                background: alpha(PRIMARY, 0.05),
                borderRadius: "0 6px 6px 0",
              }}
            >
              <Typography sx={{ fontStyle: "italic", opacity: 0.72, fontSize: "0.92rem", lineHeight: 1.6 }}>
                "Both experiences allowed me to better understand the business needs of
                small companies in the Chesterfield region."
              </Typography>
              <Typography sx={{ fontSize: "0.74rem", opacity: 0.48, mt: 0.5, fontWeight: 600 }}>
                — M. Peri Periasamy, Founder
              </Typography>
            </Box>
          </SectionBlock>

          <Divider sx={{ borderColor: alpha(SECONDARY, 0.1) }} />

          {/* ── 3. The Team — image RIGHT ── */}
          <SectionBlock
            label="The CRKL Inc Team"
            labelIcon={<GroupsIcon />}
            labelColor={PRIMARY}
            reverse={false}
            mediaSlot={
              <Box
                component="img"
                src={TEAM_IMG}
                alt="CRKL Inc Team"
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
              CRKL Inc's professionals are selected for their qualifications, their discipline,
              and their demonstrated capacity to deliver to U.S. business standards. Every
              team member is directly managed by CRKL Inc leadership and overseen by CRKL Inc
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
              label="Chesterfield, Missouri — US Delivery"
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
              sx={{
                fontSize: { xs: "1.85rem", md: "2.5rem" },
                fontWeight: 800,
                mb: 2,
                maxWidth: 680,
                lineHeight: 1.25,
              }}
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
                CRKL Inc
              </Box>
            </Typography>

            <Typography
              sx={{
                opacity: 0.75,
                lineHeight: 1.9,
                fontSize: { xs: "0.98rem", md: "1.05rem" },
                maxWidth: 760,
                mb: 1,
              }}
            >
              CRKL Inc is the US-based outsourcing company, founded by{" "}
              <Box component="span" sx={{ fontWeight: 700, opacity: 1 }}>
                M. Peri Periasamy
              </Box>{" "}
              — the same founder who leads operations in Chesterfield. It is not a
              third-party vendor and not an agency with a separate agenda. CRKL Inc is where all
              client outsourcing work is carried out, staffed from Chesterfield's large, educated,
              English-speaking professional workforce and overseen by the same individual
              accountable to you in the U.S.
            </Typography>

            <Typography
              sx={{
                opacity: 0.5,
                fontSize: "0.88rem",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <LocationOnIcon sx={{ fontSize: 15 }} />
              Chesterfield is one of Missouri's premier business cities — home to
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
              Know More About CRKL Inc →
            </Button>
          </Box>

          {/* Summary cards */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mt: 1,
            }}
          >
            {[
              {
                icon: <BusinessIcon sx={{ fontSize: 20 }} />,
                label: "The Office",
                desc: "Dedicated professional workspace in Chesterfield with U.S.-grade IT infrastructure.",
                color: PRIMARY,
              },
              {
                icon: <PersonIcon sx={{ fontSize: 20 }} />,
                label: "Our Founder",
                desc: "M. Peri Periasamy — PhD, MBA & JD. 30+ years in Chesterfield, Chamber Chairman 2019.",
                color: PRIMARY,
              },
              {
                icon: <GroupsIcon sx={{ fontSize: 20 }} />,
                label: "The Team",
                desc: "Degree-qualified professionals trained in U.S. accounting, finance, and IT workflows.",
                color: SECONDARY,
              },
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
                    theme.palette.mode === "dark"
                      ? alpha(card.color, 0.06)
                      : alpha(card.color, 0.04),
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
                    width: 38,
                    height: 38,
                    borderRadius: 1.5,
                    background: alpha(card.color, 0.12),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: card.color,
                    mb: 1.5,
                  }}
                >
                  {card.icon}
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: "0.93rem", mb: 0.5 }}>
                  {card.label}
                </Typography>
                <Typography sx={{ opacity: 0.65, fontSize: "0.83rem", lineHeight: 1.6 }}>
                  {card.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <KOPLDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}