import React, { useEffect, useRef, useState, useCallback } from "react";
import PolicyIcon from '@mui/icons-material/Policy';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import { useTheme } from "@mui/material/styles";
import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import { PRIMARY, SECONDARY } from "../../Constants";

const STEPS = [
  {
    tag: "Step 01",
    railLabel: "Discovery",
    label: "Tell us what you need",
    description:
      "A 30-minute discovery call with CRKL Inc. is all it takes to scope your accounting or IT requirements, timelines, and reporting preferences.",
    stat: "30 min",
    statLabel: "Discovery call",
    Icon: PolicyIcon,
  },
  {
    tag: "Step 02",
    railLabel: "Setup",
    label: "We match and set up",
    description:
      "CRKL assigns qualified professionals through KOPL, sets up secure communication channels, and establishes document workflows — all before day one.",
    stat: "< 24h",
    statLabel: "Team onboarding",
    Icon: SettingsSuggestIcon,
  },
  {
    tag: "Step 03",
    railLabel: "Delivery",
    label: "We deliver, you review",
    description:
      "Work runs on agreed schedules. You receive regular updates, review meetings, and accurate deliverables — without managing the team directly.",
    stat: "100%",
    statLabel: "Managed delivery",
    Icon: SendTimeExtensionIcon,
  },
];

const N = STEPS.length;
const STEP_SPAN = Math.max(1, N - 1);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export default function HowItWorks() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  // isMob: hide rail on mobile, show only cards
  const isMob = useMediaQuery(theme.breakpoints.down("md"));

  const [active, setActive] = useState(0);
  const railRef = useRef(null);
  const nodeRefs = useRef([]);
  const [segments, setSegments] = useState([]);
  const totalRailRef = useRef(0);
  const [filledPx, setFilledPx] = useState(0);
  const [lineCenterX, setLineCenterX] = useState(26);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollable = sectionHeight - viewportHeight;
      if (scrollable <= 0) return;
      const scrolled = clamp(window.scrollY - sectionTop, 0, scrollable);
      const progress = scrolled / scrollable;
      const idx = clamp(Math.round(progress * STEP_SPAN), 0, STEP_SPAN);
      setActive(idx);
      const { firstCenter = 0, totalSpan = 0 } = totalRailRef.current || {};
      setFilledPx(firstCenter + progress * totalSpan);
    });
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const measure = () => {
      const container = railRef.current;
      if (!container || !nodeRefs.current) return;
      const getOffsetTopInRail = (el) => {
        let top = 0; let node = el;
        while (node && node !== container) { top += node.offsetTop; node = node.offsetParent; }
        return top;
      };
      const getOffsetLeftInRail = (el) => {
        let left = 0; let node = el;
        while (node && node !== container) { left += node.offsetLeft; node = node.offsetParent; }
        return left;
      };
      const centers = nodeRefs.current.map((n) => {
        if (!n) return 0;
        const circle = n.querySelector("div") || n;
        return getOffsetTopInRail(circle) + circle.offsetHeight / 2;
      });
      const firstNode = nodeRefs.current[0];
      if (firstNode) {
        const nodeCircle = firstNode.querySelector("div");
        if (nodeCircle) setLineCenterX(getOffsetLeftInRail(nodeCircle) + nodeCircle.offsetWidth / 2);
      }
      const segs = centers.slice(0, -1).map((top, i) => ({ top, height: centers[i + 1] - centers[i] }));
      setSegments(segs);
      totalRailRef.current = {
        firstCenter: centers[0] || 0,
        totalSpan: (centers[centers.length - 1] || 0) - (centers[0] || 0),
      };
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  const jumpToStep = useCallback((idx) => {
    const el = sectionRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) { setActive(idx); return; }
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const target = sectionTop + (idx / STEP_SPAN) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const bg = isDark
    ? `linear-gradient(160deg, rgba(4, 12, 24, 1) 0%, rgba(7, 21, 36, 1) 100%)`
    : `linear-gradient(160deg,${PRIMARY}08 0%,${SECONDARY}08 100%)`;
  const cardBg = isDark ? "#061525" : "#ffffff";
  const textPri = isDark ? "#e8f4ff" : "#061b2e";
  const textMut = isDark ? "#7a9bb5" : "#5b7488";
  const trackC = isDark ? "rgba(180,210,240,0.12)" : "rgba(8,45,74,0.10)";
  const borderC = isDark ? "rgba(255,255,255,0.06)" : "rgba(180,215,245,0.6)";

  const nodeActiveBg = PRIMARY;
  const nodePastBg = isDark ? "#0d2a45" : "#e0f0ff";
  const nodeInactiveBg = isDark ? "#0a1e30" : "#eaf4fb";
  const nodeActiveBorder = PRIMARY;
  const nodePastBorder = isDark ? `${PRIMARY}88` : `${PRIMARY}66`;
  const nodeInactiveBorder = isDark ? "rgba(180,210,240,0.18)" : "rgba(8,45,74,0.14)";
  const nodeActiveIconColor = "#ffffff";
  const nodePastIconColor = PRIMARY;
  const nodeInactiveIconColor = isDark ? "rgba(120,160,190,0.55)" : "rgba(8,45,74,0.30)";
  const nodeActiveShadow = `0 0 0 4px ${PRIMARY}22, 0 4px 14px ${PRIMARY}44`;
  const nodePastShadow = `0 2px 8px ${PRIMARY}18`;
  const nodeInactiveShadow = isDark ? "0 2px 6px rgba(0,0,0,0.35)" : "0 2px 6px rgba(8,45,74,0.07)";

  return (
    <>
      <style>{`
        @keyframes nodeRing {
          0%,100% { opacity:.7; transform:scale(1); }
          50%      { opacity:.15; transform:scale(1.3); }
        }
        @keyframes scrollDot {
          0%,100% { opacity:1; transform:translateX(-50%) translateY(0); }
          70%      { opacity:0; transform:translateX(-50%) translateY(8px); }
        }
        .hiw-card {
          position:absolute; inset:0;
          border-radius:20px;
          transition: opacity .55s cubic-bezier(.22,1,.36,1),
                      transform .55s cubic-bezier(.22,1,.36,1),
                      filter .55s cubic-bezier(.22,1,.36,1);
          will-change: transform, opacity;
        }
        .hiw-node-ring {
          position:absolute; inset:-6px; border-radius:9999px;
          border:1.2px solid ${PRIMARY}33;
          animation: nodeRing 2.2s ease-in-out infinite;
        }
      `}</style>

      <Box
        component="section"
        ref={sectionRef}
        sx={{ position: "relative", height: `calc(100vh * ${N})`, background: bg }}
      >

        {/* ── Sticky viewport ── */}
        <Box
          className="sticky top-0 flex flex-col items-center justify-start overflow-hidden"
          sx={{ height: "100vh", boxSizing: "border-box" }}
        >
          {/* ── Section heading ── */}
          <Box
            className="relative z-10 w-full max-w-[1240px] px-5 pt-8 sm:px-6 lg:px-12 lg:pt-26"
          >
            <Box sx={{ textAlign: "center", mb: 2, mx: "auto", maxWidth: 860 }}>
              <Chip
                label="How It Works"
                sx={{ mb: 3, height: 28, px: 0.5, background: isDark ? `${SECONDARY}26` : `${SECONDARY}20`, color: SECONDARY, fontWeight: 700, fontSize: "0.72rem" }}
              />
              <Typography variant="h2" sx={{ fontSize: { xs: "1.7rem", md: "2.25rem" }, mb: 3, color: isDark ? "#eef6ff" : "inherit", fontFamily: "'Sora',sans-serif", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.05em" }}>
                Simple, Structured, Accountable.
              </Typography>
              <Typography sx={{ opacity: isDark ? 0.78 : 0.65, mx: "auto", lineHeight: 1.7, fontSize: { xs: "0.9rem", md: "0.98rem" }, color: isDark ? "rgba(226,239,255,0.86)" : "inherit" }}>
                Every service is delivered through KOPL's dedicated professionals in Madurai — managed from Chesterfield, Missouri.
              </Typography>
            </Box>
          </Box>

          {/* ── Two-column layout ── */}
          <Box
            className="relative z-10 w-full"
            sx={{
              maxWidth: 1240,
              marginTop: isMob ? "6px" : "4px",
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
              display: "grid",
              // On mobile: single column (rail hidden, card takes full width)
              // On desktop: original two-column
              gridTemplateColumns: isMob ? "1fr" : "300px minmax(0,1fr)",
              gap: isMob ? 0 : 3,
              px: { xs: 3, sm: 4, md: 6, lg: 12 },
              py: { xs: 1, md: 0 },
            }}
          >
            {/* ── LEFT: stepper rail — hidden on mobile ── */}
            {!isMob && (
              <Box className="flex flex-col justify-start pt-0 lg:pt-0">
                <Box className="relative" ref={railRef}>
                  {segments.map((s, i) => {
                    const LINE_Y_INSET = 24;
                    const insetTop = s.top + LINE_Y_INSET;
                    const insetHeight = Math.max(0, s.height - LINE_Y_INSET * 2);
                    return (
                      <Box key={`seg-base-${i}`} className="absolute rounded-full" sx={{ left: lineCenterX, transform: "translateX(-50%)", width: 2, top: insetTop, height: insetHeight, background: trackC, zIndex: -10 }} />
                    );
                  })}
                  {segments.map((s, i) => {
                    const LINE_Y_INSET = 24;
                    const insetTop = s.top + LINE_Y_INSET;
                    const insetHeight = Math.max(0, s.height - LINE_Y_INSET * 2);
                    const filledInSegment = Math.max(0, Math.min(insetHeight, filledPx - insetTop));
                    const isFilled = filledInSegment > 0;
                    return (
                      <Box key={`seg-fill-${i}`} className="absolute rounded-full" sx={{ left: lineCenterX, transform: "translateX(-50%)", width: 2, top: insetTop, height: `${filledInSegment}px`, background: isFilled ? `linear-gradient(180deg,${PRIMARY},${SECONDARY})` : "transparent", boxShadow: isFilled ? `0 0 6px 1px ${PRIMARY}55` : "none", transition: "height .18s linear, background .18s linear, box-shadow .18s linear", zIndex: -9 }} />
                    );
                  })}
                  {STEPS.map((step, i) => {
                    const isPast = i < active;
                    const isActive = i === active;
                    const NodeIcon = step.Icon;
                    const nodeBg = isActive ? nodeActiveBg : isPast ? nodePastBg : nodeInactiveBg;
                    const nodeBorder = isActive ? nodeActiveBorder : isPast ? nodePastBorder : nodeInactiveBorder;
                    const nodeIconColor = isActive ? nodeActiveIconColor : isPast ? nodePastIconColor : nodeInactiveIconColor;
                    const nodeShadow = isActive ? nodeActiveShadow : isPast ? nodePastShadow : nodeInactiveShadow;
                    return (
                      <Box component="button" ref={(el) => (nodeRefs.current[i] = el)} key={step.tag} type="button" onClick={() => jumpToStep(i)}
                        className={`relative grid gap-3 w-full text-left transition-opacity duration-300 cursor-pointer ${i < N - 1 ? "mb-7" : ""} ${isActive ? "opacity-100" : isPast ? "opacity-80" : "opacity-45"}`}
                        sx={{ gridTemplateColumns: "44px 1fr" }}
                      >
                        <Box className="relative flex items-center justify-center rounded-full transition-all duration-500" sx={{ width: 44, height: 44, zIndex: 50, border: `1.5px solid ${nodeBorder}`, boxShadow: nodeShadow, backdropFilter: "none", WebkitBackdropFilter: "none", isolation: "isolate", overflow: "hidden" }}>
                          <Box aria-hidden sx={{ position: "absolute", inset: 0, borderRadius: "9999px", background: bg, zIndex: 0 }} />
                          <Box aria-hidden sx={{ position: "absolute", inset: 0, borderRadius: "9999px", background: nodeBg, zIndex: 1 }} />
                          <NodeIcon sx={{ fontSize: 18, position: "relative", zIndex: 4, color: nodeIconColor, transition: "color 0.3s ease" }} />
                          {isActive && <Box className="hiw-node-ring" sx={{ zIndex: 2 }} />}
                        </Box>
                        <Box className="flex flex-col justify-center gap-1.5">
                          <Typography component="span" className="text-[0.55rem] font-bold uppercase tracking-[.18em] transition-colors duration-300" sx={{ color: (isActive || isPast) ? PRIMARY : textMut }}>{step.tag}</Typography>
                          <Typography component="span" className="font-bold leading-snug tracking-tight transition-colors duration-300" sx={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(.82rem,1.1vw,0.98rem)", color: (isActive || isPast) ? textPri : textMut }}>{step.railLabel}</Typography>
                          <Typography component="span" className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[0.66rem] transition-all duration-300" sx={{ border: `1px solid ${(isActive || isPast) ? PRIMARY + "40" : borderC}`, background: (isActive || isPast) ? PRIMARY + "10" : isDark ? "rgba(255,255,255,0.03)" : "#f8fbff" }}>
                            <Typography component="strong" sx={{ color: (isActive || isPast) ? PRIMARY : textMut }}>{step.stat}</Typography>
                            <Typography component="span" sx={{ color: textMut }}>{step.statLabel}</Typography>
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                <Box className="flex items-baseline gap-1 mt-5">
                  <Typography component="span" className="font-extrabold leading-none transition-all duration-400" sx={{ fontFamily: "'Sora',sans-serif", fontSize: "1.8rem", color: PRIMARY }}>{String(active + 1).padStart(2, "0")}</Typography>
                  <Typography component="span" className="text-base" sx={{ color: textMut }}>&nbsp;/ {String(N).padStart(2, "0")}</Typography>
                </Box>
              </Box>
            )}

            {/* ── RIGHT: stacked cards — full width on mobile ── */}
            <Box
              className="relative"
              sx={{
                height: isMob ? "min(72vw, 340px)" : "min(55vh, 360px)",
                minHeight: isMob ? 260 : 0,
                gap: 6,
              }}
            >
              {STEPS.map((step, i) => {
                const delta = i - active;
                const CardIcon = step.Icon;
                let opacity = 1, ty = 0, tx = 0, sc = 1, blur = 0, zi = 1, pe = "none";
                if (delta === 0) { opacity = 1; zi = 4; pe = "auto"; }
                else if (delta === 1) { opacity = 1; ty = 34; tx = isMob ? 8 : 14; sc = 0.88; blur = 0; zi = 3; }
                else if (delta === 2) { opacity = 1; ty = 68; tx = isMob ? 14 : 24; sc = 0.82; blur = 0; zi = 2; }
                else if (delta === -1) { opacity = 1; ty = -46; sc = 0.9; blur = 0; }
                const transform = `translateY(${ty}px) translateX(${tx}px) scale(${sc})`;
                const filter = `blur(${blur}px)`;
                return (
                  <Box component="article" key={step.tag} className="hiw-card flex flex-col overflow-hidden"
                    sx={{ opacity, transform, filter, zIndex: zi, pointerEvents: pe, background: cardBg, boxShadow: delta === 0 ? isDark ? "0 24px 80px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04)" : "0 20px 60px rgba(10,60,110,0.12), 0 1px 0 rgba(255,255,255,0.9)" : "none", padding: isMob ? "14px 14px" : "clamp(16px,2.2vw,24px)" }}
                  >
                    <Box className="pointer-events-none absolute rounded-full" sx={{ top: -70, left: -70, width: 240, height: 240, background: `radial-gradient(circle, ${PRIMARY}14 0%, transparent 65%)` }} />
                    <Box className="relative z-10 flex items-start justify-between mb-6 lg:mb-7">
                      <Box className="flex items-center justify-center rounded-[14px]" sx={{ width: 44, height: 44, background: `linear-gradient(135deg,${PRIMARY}20,${SECONDARY}10)`, border: `1px solid ${PRIMARY}25`, color: PRIMARY }}>
                        <CardIcon sx={{ fontSize: 18 }} />
                      </Box>
                      <Typography component="span" className="leading-none tracking-[-0.06em] select-none" sx={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem,5.8vw,4.3rem)", color: isDark ? "rgba(255,255,255,0.05)" : "rgba(10,40,80,0.05)" }}>0{i + 1}</Typography>
                    </Box>
                    <Box className="relative z-10 mb-2 text-[0.55rem] font-bold uppercase tracking-[.18em]" sx={{ color: PRIMARY }}>{step.tag}</Box>
                    <Typography component="h3" className="relative z-10 mb-3 leading-[1.06] tracking-[-0.03em]" sx={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: isMob ? "0.98rem" : "clamp(0.98rem,1.4vw,1.28rem)", color: isDark ? "#e8f4ff" : "#061b2e" }}>{step.label}</Typography>
                    <Typography component="p" className="relative z-10 mb-6 leading-[1.7]" sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMob ? "0.76rem" : "clamp(0.76rem,0.88vw,0.84rem)", color: isDark ? "rgba(180,210,240,0.68)" : "rgba(15,50,80,0.62)", maxWidth: 500 }}>{step.description}</Typography>
                    <Box className="absolute bottom-5 right-5 z-20 flex flex-col gap-1.5">
                      {STEPS.map((_, di) => (
                        <Box key={di} className="rounded-full transition-all duration-400" sx={{ width: 6, height: di === i ? 18 : 6, background: di === i ? PRIMARY : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)" }} />
                      ))}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}