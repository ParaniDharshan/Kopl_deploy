import React, { useState } from "react";

import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  HomeWork as HometownIcon,
  FlightTakeoff as MoveIcon,
  MenuBook as DegreeIcon,
  BusinessCenter as CorpIcon,
  LocationCity as CityIcon,
  Storefront as FoundedIcon,
  Groups as ChamberIcon,
  AccountBalance as BoardIcon,
  Gavel as CivicIcon,
  School as SchoolIcon,
  WorkOutlined as CareerIcon,
  EmojiEvents as CivicCatIcon,
} from "@mui/icons-material";

import { Close as CloseIcon } from "@mui/icons-material";

const PRIMARY = "#1d89c8";

const SECONDARY = "#3eb8af";

// ─── Journey Data ────────────────────────────────────────────

const JOURNEY = [
  {
    category: "Education",
    color: PRIMARY,
    icon: <SchoolIcon sx={{ fontSize: 20 }} />,
    steps: [
      {
        label: "Madurai Roots",
        icon: <HometownIcon />, // imported as HometownIcon
        description:
          "Born and raised in Madurai, Tamil Nadu. Worked in his father's small hardware distribution business — learning cash flow, customer trust, and the weight of building something by hand.",
      },
      {
        label: "Florida State University",
        icon: <MoveIcon />, // imported as FlightTakeoff → MoveIcon
        description:
          "Moved to the U.S. over 50 years ago to attend Florida State University, earning his Doctorate in Chemistry.",
      },
      {
        label: "MBA & Law — Saint Louis University",
        icon: <DegreeIcon />, // imported as MenuBook → DegreeIcon
        description:
          "Earned both MBA and Law degrees from Saint Louis University with a concentration in international business.",
      },
    ],
  },
  {
    category: "Career",
    color: SECONDARY,
    icon: <CareerIcon sx={{ fontSize: 20 }} />,
    steps: [
      {
        label: "Mallinckrodt",
        icon: <CorpIcon />, // imported as BusinessCenter → CorpIcon
        description:
          "Built deep fluency in American business culture — results-driven operations, cost discipline, zero tolerance for quality lapses — inside one of St. Louis's most demanding multinational corporations.",
      },
      {
        label: "30+ Years in Chesterfield",
        icon: <CityIcon />, // imported as LocationCity → CityIcon
        description:
          "Has lived in Chesterfield for over three decades. Raised three daughters here with his wife. He is a member of this community, not a newcomer.",
      },
      {
        label: "KOPL — Founded",
        icon: <FoundedIcon />, // imported as Storefront → FoundedIcon
        description:
          "Founded KOPL to bring structured, U.S.-managed outsourcing to American small businesses — combining decades of corporate discipline with a genuine understanding of the SME journey.",
      },
    ],
  },
  {
    category: "Civic",
    color: "#7c6fcd",
    icon: <CivicIcon sx={{ fontSize: 20 }} />,
    steps: [
      {
        label: "2012 — Chesterfield Chamber of Commerce",
        icon: <ChamberIcon />, // imported as Groups → ChamberIcon
        description:
          "Joined the Chesterfield Regional Chamber of Commerce. Led the Business Education Committee for approximately three years.",
      },
      {
        label: "2014–2019 — Board of Directors",
        icon: <BoardIcon />, // imported as AccountBalance → BoardIcon
        description:
          "Served on the Chamber Board of Directors for five years, culminating as Chairman of the Board in 2019.",
      },
      {
        label: "2017–Present — City Advisory Committee",
        icon: <CivicIcon />, // imported as Gavel → CivicIcon
        description:
          "Serves on the Finance & Administration Citizens Advisory Committee for the City of Chesterfield.",
      },
    ],
  },
];

// ─── Stepper Column ──────────────────────────────────────────

function JourneyColumn({ section, isLast }) {
  const [active, setActive] = useState(null);

  return (
    <Box
      sx={{
        flex: 1,
        pr: { xs: 0, md: 3 },
        pb: { xs: 4, md: 0 },
        borderBottom: isLast
          ? "none"
          : { xs: `1px solid ${section.color}22`, md: "none" },
        mb: { xs: 2, md: 0 },
      }}
    >
      {/* Column header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
          pb: 2,
          borderBottom: `2px solid ${section.color}33`,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `${section.color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: section.color,
            flexShrink: 0,
          }}
        >
          {section.icon}
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: section.color,
            fontFamily: "'Sora', sans-serif",
          }}
        >
          {section.category}
        </Typography>
      </Box>

      {/* Steps */}
      <Stepper
        activeStep={-1}
        orientation="vertical"
        sx={{
          "& .MuiStepConnector-line": {
            borderColor: `${section.color}33`,

            borderLeftWidth: 2,

            minHeight: 20,
          },
        }}
      >
        {section.steps.map((step, idx) => (
          <Step key={step.label} expanded>
            <StepLabel
              onClick={() => setActive(active === idx ? null : idx)}
              StepIconComponent={() => (
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    
                    border: `2px solid ${section.color}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: `background 0.3s ease, transform 0.25s ease`,
                    transform: active === idx ? "scale(1.15)" : "scale(1)",
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </Box>
              )}
              sx={{
                cursor: "pointer",
                alignItems: "flex-start",
                "& .MuiStepLabel-label": { mt: 0.3 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: active === idx ? 700 : 600,
                  fontSize: "0.82rem",
                  color: active === idx ? section.color : "inherit",
                  lineHeight: 1.4,
                  transition: "color 0.25s ease",
                  cursor: "pointer",
                }}
              >
                {step.label}
              </Typography>
            </StepLabel>

            <StepContent
              sx={{
                borderLeft: `2px solid ${section.color}33`,

                ml: "13px",
              }}
            >
              <Box
                sx={{
                  maxHeight: active === idx ? 200 : 0,

                  overflow: "hidden",

                  transition: "max-height 0.4s ease, opacity 0.3s ease",

                  opacity: active === idx ? 1 : 0,

                  pb: active === idx ? 1.5 : 0,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.78rem",

                    opacity: 0.72,

                    lineHeight: 1.75,

                    pt: 0.5,

                    pr: 1,
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

// ─── Main Modal Component ────────────────────────────────────

export default function FounderJourneyModal({ open, onClose }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 4,

            background: theme.palette.mode === "dark" ? "#0d2137" : "#ffffff",

            border: `1px solid ${PRIMARY}18`,

            overflow: "hidden",

            maxHeight: isMobile ? "100vh" : "88vh",
          },
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            px: { xs: 3, md: 4 },

            pt: { xs: 3, md: 3.5 },

            pb: 2.5,

            background: `linear-gradient(135deg, ${PRIMARY}12 0%, ${SECONDARY}10 100%)`,

            borderBottom: `1px solid ${PRIMARY}18`,

            display: "flex",

            alignItems: "flex-start",

            justifyContent: "space-between",

            flexShrink: 0,

            position: "sticky",

            top: 0,

            zIndex: 10,

            backdropFilter: "blur(12px)",
          }}
        >
          <Box>
            <Chip
              label="Founder Profile"
              size="small"
              sx={{
                mb: 1,

                background: `${PRIMARY}18`,

                color: PRIMARY,

                fontWeight: 700,

                fontSize: "0.68rem",

                letterSpacing: 1,

                border: `1px solid ${PRIMARY}33`,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Sora', sans-serif",

                fontWeight: 700,

                fontSize: { xs: "1.2rem", md: "1.45rem" },

                lineHeight: 1.3,

                "& span": {
                  background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,

                  WebkitBackgroundClip: "text",

                  WebkitTextFillColor: "transparent",
                },
              }}
            >
              M. Peri <span>Periasamy</span>
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.6, mt: 0.5, fontSize: "0.82rem" }}
            >
              Education · Career · Civic
            </Typography>
          </Box>

          <IconButton
            onClick={() => setOpen(false)}
            size="small"
            sx={{
              mt: 0.5,

              border: `1px solid ${PRIMARY}33`,

              color: PRIMARY,

              "&:hover": {
                background: `${PRIMARY}14`,

                borderColor: PRIMARY,
              },
            }}
          >
            <CloseIcon onClick={onClose} fontSize="small" />
          </IconButton>
        </Box>

        {/* Modal Body */}
        <DialogContent
          sx={{
            px: { xs: 3, md: 4 },

            py: { xs: 3, md: 4 },

            overflowY: "auto",

            "&::-webkit-scrollbar": { width: 6 },

            "&::-webkit-scrollbar-track": { background: "transparent" },

            "&::-webkit-scrollbar-thumb": {
              background: `${PRIMARY}44`,

              borderRadius: 3,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",

              flexDirection: { xs: "column", md: "row" },

              gap: { xs: 0, md: 0 },
            }}
          >
            {JOURNEY.map((section, idx) => (
              <JourneyColumn
                key={section.category}
                section={section}
                isLast={idx === JOURNEY.length - 1}
              />
            ))}
          </Box>
        </DialogContent>

        {/* Modal Footer */}
        <Box
          sx={{
            px: { xs: 3, md: 4 },

            py: 2.5,

            borderTop: `1px solid ${PRIMARY}18`,

            background: `${PRIMARY}06`,

            display: "flex",

            alignItems: "center",

            justifyContent: "space-between",

            flexWrap: "wrap",

            gap: 1.5,

            flexShrink: 0,
          }}
        >
          <Typography
            variant="caption"
            sx={{ opacity: 0.5, fontSize: "0.75rem" }}
          >
            Chesterfield, Missouri — U.S.-Based Founder
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={onClose}
            sx={{
              background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,

              px: 3,

              py: 0.9,

              fontSize: "0.8rem",

              boxShadow: `0 4px 16px ${PRIMARY}44`,
            }}
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </>
  );
}

