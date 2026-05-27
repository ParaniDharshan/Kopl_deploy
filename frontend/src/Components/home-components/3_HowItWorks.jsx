import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PhoneInTalk, VerifiedUser, Autorenew } from "@mui/icons-material";
import { PRIMARY, SECONDARY } from "../../constants";

const steps = [
  {
    label: "Tell us what you need",
    icon: <PhoneInTalk sx={{ fontSize: 28 }} />,
    description:
      "A 30-minute discovery call with CRKL Inc. is all it takes to scope your accounting or IT requirements, timelines, and reporting preferences.",
    tag: "Step 01",
  },
  {
    label: "We match and set up",
    icon: <VerifiedUser sx={{ fontSize: 28 }} />,
    description:
      "CRKL assigns qualified professionals through KOPL, sets up secure communication channels, and establishes document workflows — all before day one.",
    tag: "Step 02",
  },
  {
    label: "We deliver, you review",
    icon: <Autorenew sx={{ fontSize: 28 }} />,
    description:
      "Work runs on agreed schedules. You receive regular updates, review meetings, and accurate deliverables — without managing the team directly.",
    tag: "Step 03",
  },
];

/* ─── Horizontal card (desktop) ─── */
function HorizontalStep({ step, index, active, onHover, onLeave }) {
  const isLast = index === steps.length - 1;

  return (
    <Box
      sx={{
        flex: 1,
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {/* Connector line */}
      {!isLast && (
        <Box
          sx={{
            position: "absolute",
            top: 28,
            left: "calc(50% + 36px)",
            right: "calc(-50% + 36px)",
            height: 2,
            background: `linear-gradient(90deg, ${PRIMARY}55, ${SECONDARY}55)`,
            zIndex: 0,
            "&::after": {
              content: '""',
              position: "absolute",
              top: -3,
              right: -1,
              width: 8,
              height: 8,
              borderTop: `2px solid ${SECONDARY}88`,
              borderRight: `2px solid ${SECONDARY}88`,
              transform: "rotate(45deg)",
            },
          }}
        />
      )}

      {/* Card */}
      <Paper
        elevation={0}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={onLeave}
        sx={{
          flex: 1,
          mx: 1.5,
          p: 3.5,
          borderRadius: 3,
          border: `1px solid ${active ? PRIMARY : PRIMARY + "22"}`,
          background: active
            ? `linear-gradient(135deg, ${PRIMARY}14 0%, ${SECONDARY}10 100%)`
            : "rgba(255,255,255,0.02)",
          backdropFilter: "blur(10px)",
          transition: "all 0.35s ease",
          transform: active ? "translateY(-6px)" : "translateY(0)",
          boxShadow: active ? `0 20px 40px ${PRIMARY}22` : "none",
          cursor: "default",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Step tag */}
        <Typography
          variant="overline"
          sx={{
            fontSize: "0.65rem",
            letterSpacing: 2,
            color: SECONDARY,
            fontWeight: 700,
            display: "block",
            mb: 2,
          }}
        >
          {step.tag}
        </Typography>

        {/* Icon bubble */}
        <Box
          sx={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: active
              ? `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`
              : `${PRIMARY}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: active ? "#fff" : PRIMARY,
            mb: 2.5,
            transition: "background 0.35s ease, color 0.35s ease",
          }}
        >
          {step.icon}
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, fontSize: "1rem", mb: 1.5 }}
        >
          {step.label}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{ opacity: 0.68, lineHeight: 1.85, fontSize: "0.875rem" }}
        >
          {step.description}
        </Typography>

        {/* Active bottom accent */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            borderRadius: "0 0 12px 12px",
            background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
            opacity: active ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />
      </Paper>
    </Box>
  );
}

/* ─── Vertical (mobile) ─── */
function VerticalStepper() {
  return (
    <Stepper
      orientation="vertical"
      sx={{
        "& .MuiStepConnector-line": {
          borderColor: `${PRIMARY}44`,
          borderLeftWidth: 2,
        },
      }}
    >
      {steps.map((step, i) => (
        <Step key={step.label} active>
          <StepLabel
            StepIconComponent={() => (
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </Box>
            )}
          >
            <Typography
              variant="overline"
              sx={{
                color: SECONDARY,
                fontWeight: 700,
                fontSize: "0.65rem",
                letterSpacing: 2,
                display: "block",
                lineHeight: 1,
              }}
            >
              {step.tag}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 0.5 }}>
              {step.label}
            </Typography>
          </StepLabel>
          <StepContent>
            <Typography
              variant="body2"
              sx={{ opacity: 0.7, lineHeight: 1.85, mt: 1, pb: 2 }}
            >
              {step.description}
            </Typography>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}

/* ─── Main export ─── */
export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: `radial-gradient(ellipse at 70% 60%, ${SECONDARY}10 0%, transparent 55%),
                     radial-gradient(ellipse at 20% 30%, ${PRIMARY}12 0%, transparent 55%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Section header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{
              color: PRIMARY,
              fontWeight: 700,
              letterSpacing: 3,
              fontSize: "0.75rem",
              display: "block",
              mb: 1.5,
            }}
          >
            The Process
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              fontWeight: 700,
              lineHeight: 1.25,
              mb: 2,
              "& span": {
                background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              },
            }}
          >
            How it <span>works</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{ opacity: 0.65, maxWidth: 480, mx: "auto", lineHeight: 1.8 }}
          >
            From your first call to consistent delivery — here's exactly how we
            get you up and running.
          </Typography>
        </Box>

        {/* Stepper */}
        {isMobile ? (
          <VerticalStepper />
        ) : (
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            {steps.map((step, index) => (
              <HorizontalStep
                key={step.label}
                step={step}
                index={index}
                active={activeStep === index}
                onHover={setActiveStep}
                onLeave={() => setActiveStep(null)}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
