import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Container, Typography, Chip, Avatar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { TESTIMONIALS, PRIMARY, SECONDARY } from "../../Constants";
import CTAButton from "../common-components/CTAButton";

// ─── Layout constants — tune these to change card sizing globally ───────────
const CARD_WIDTH_DESKTOP = 320; // px — card width on md+ screens
const CARD_WIDTH_MOBILE  = 260; // px — card width on xs/sm screens
const CARD_GAP           = 20;  // px — gap between cards
const DEFAULT_RATING     = 5;   // fallback stars if t.rating is absent

// Build an infinite clone list: [...list, ...list, ...list]
// The carousel always starts in the middle copy and wraps silently.
function buildInfinite(list) {
  if (!list || list.length === 0) return [];
  return [...list, ...list, ...list];
}

export default function Testimonal() {
  const theme   = useTheme();
  const isDark  = theme.palette.mode === "dark";
  const isMob   = useMediaQuery(theme.breakpoints.down("sm"));
  const viewportRef = useRef(null);

  // ── Responsive card width ──────────────────────────────────────────────────
  const CARD_WIDTH = isMob ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;
  const CARD_STEP  = CARD_WIDTH + CARD_GAP;

  // ── Derive items from TESTIMONIALS (fully dynamic) ─────────────────────────
  const total = TESTIMONIALS.length;
  const items = buildInfinite(TESTIMONIALS);
  const trackSpan = total * CARD_STEP;

  // Start at the middle copy so we can scroll left OR right without hitting a wall
  const startOffset = -(total * CARD_STEP);
  const [offsetX, setOffsetX] = useState(startOffset);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Re-initialise offset when card width changes (viewport resize crossing sm/md)
  const prevCardWidth = useRef(CARD_WIDTH);
  useEffect(() => {
    if (prevCardWidth.current !== CARD_WIDTH) {
      prevCardWidth.current = CARD_WIDTH;
      setOffsetX(-(total * (CARD_WIDTH + CARD_GAP)));
    }
  }, [CARD_WIDTH, total]);

  useEffect(() => {
    const measureViewport = () => {
      setViewportWidth(viewportRef.current?.clientWidth || 0);
    };

    measureViewport();
    window.addEventListener("resize", measureViewport);
    return () => window.removeEventListener("resize", measureViewport);
  }, []);

  // ── manual slide interactions ─────────────────────────────────────────────
  const dragState   = useRef({ active: false, startX: 0, startOffset: 0 });
  const trackRef    = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const normalizeOffset = useCallback((value) => {
    if (trackSpan <= 0) return value;
    let next = value;
    while (next > 0) next -= trackSpan;
    while (next < -trackSpan * 2) next += trackSpan;
    return next;
  }, [trackSpan]);

  const getCenteredOffset = useCallback((index) => {
    if (!total) return 0;
    if (!viewportWidth) return -(total * CARD_STEP);

    const centered = (viewportWidth / 2) - CARD_GAP - (index * CARD_STEP) - (CARD_WIDTH / 2);
    return normalizeOffset(centered);
  }, [viewportWidth, total, CARD_STEP, CARD_WIDTH, normalizeOffset]);

  const handlePointerDown = useCallback((event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragState.current = { active: true, startX: event.clientX, startOffset: offsetX };
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, [offsetX]);

  const handlePointerMove = useCallback((event) => {
    if (!dragState.current.active) return;
    const delta = event.clientX - dragState.current.startX;
    setOffsetX(normalizeOffset(dragState.current.startOffset + delta));
  }, [normalizeOffset]);

  const handlePointerUp = useCallback((event) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }, []);

  const handlePointerCancel = useCallback((event) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }, []);

  const jumpToIndex = useCallback((index) => {
    if (!total) return;
    dragState.current.active = false;
    setIsDragging(false);
    setOffsetX(getCenteredOffset(index));
  }, [total, getCenteredOffset]);

  // ── Active dot index (which card is nearest centre) ───────────────────────
  const centeredRaw = viewportWidth
    ? ((viewportWidth / 2) - offsetX - CARD_GAP - (CARD_WIDTH / 2)) / CARD_STEP
    : Math.abs(offsetX) / CARD_STEP;
  const centeredIdx = ((Math.round(centeredRaw) % total) + total) % total;

  // ── Theme tokens ───────────────────────────────────────────────────────────
  const bg      = isDark
    ? "linear-gradient(160deg, rgba(4,12,24,1) 0%, rgba(7,21,36,1) 100%)"
    : `linear-gradient(160deg,${PRIMARY}08 0%,${SECONDARY}08 100%)`;
  const cardBg  = isDark ? "#061525" : "#ffffff";
  const textPri = isDark ? "#e8f4ff" : "#061b2e";
  const textMut = isDark ? "#7a9bb5" : "#5b7488";
  const chipBg  = isDark ? `${PRIMARY}28` : `${PRIMARY}14`;
  const maskL   = isDark ? "linear-gradient(90deg,rgba(3,12,24,1),transparent)"  : "linear-gradient(90deg,rgba(240,248,255,1),transparent)";
  const maskR   = isDark ? "linear-gradient(270deg,rgba(3,12,24,1),transparent)" : "linear-gradient(270deg,rgba(240,248,255,1),transparent)";

  // ── Guard: nothing to render if constants are empty ────────────────────────
  if (!TESTIMONIALS || TESTIMONIALS.length === 0) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, background: bg, overflow: "hidden" }}>

      {/* ── Section header ─────────────────────────────────────────────────── */}
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Chip
            label="Client Voice"
            sx={{ mb: 2, height: 28, px: 0.5, background: `${PRIMARY}20`, color: PRIMARY, fontWeight: 700, fontSize: "0.72rem" }}
          />
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.4rem" }, color: textPri, fontFamily: "'Sora',sans-serif", fontWeight: 800, letterSpacing: "-0.04em" }}
          >
            What our clients say
          </Typography>
          {/* Dynamic count badge — updates automatically when TESTIMONIALS grows */}
        </Box>
      </Container>

      {/* ── Carousel ───────────────────────────────────────────────────────── */}
      <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {/* Edge fade masks */}
        <Box sx={{ pointerEvents: "none", position: "absolute", left: 0, top: 0, bottom: 0, width: { xs: 48, md: 100 }, background: maskL, zIndex: 10 }} />
        <Box sx={{ pointerEvents: "none", position: "absolute", right: 0, top: 0, bottom: 0, width: { xs: 48, md: 100 }, background: maskR, zIndex: 10 }} />

        {/* Scrolling track */}
        <Box
          ref={viewportRef}
          sx={{ position: "relative", overflow: "hidden" }}
        >
          <Box
            ref={trackRef}
          sx={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            transform: `translateX(${offsetX}px)`,
            transition: isDragging ? "none" : "transform 520ms cubic-bezier(.22,1,.36,1)",
            py: 2,
            pl: `${CARD_GAP}px`,
            touchAction: "pan-y",
            cursor: isDragging ? "grabbing" : "grab",
            width: "max-content",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          {items.map((t, idx) => {
            // ── Per-card derived values ──────────────────────────────────────
            const rating     = typeof t.rating === "number" ? t.rating : DEFAULT_RATING;
            const initials   = t.avatar || (t.name ? t.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?");
            const hasAvatar  = Boolean(t.avatarSrc);

            return (
              <Box
                component="button"
                type="button"
                key={`${t.name}-${idx}`}
                aria-label={`Center testimonial ${t.name}`}
                onClick={() => jumpToIndex(idx)}
                sx={{
                  flexShrink: 0,
                  width: CARD_WIDTH,
                  background: cardBg,
                  border: `1px solid ${PRIMARY}22`,
                  borderRadius: "18px",
                  boxShadow: isDark
                    ? `0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.03)`
                    : `0 8px 32px ${PRIMARY}12, 0 1px 0 rgba(255,255,255,0.9)`,
                  p: { xs: "16px 14px 14px", md: "20px 18px 18px" },
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  transition: "box-shadow 0.25s ease, transform 0.25s ease",
                  cursor: "pointer",
                  border: 0,
                  textAlign: "left",
                  padding: 0,
                  "&:hover": {
                    boxShadow: isDark
                      ? `0 18px 52px rgba(0,0,0,0.65), 0 0 0 1px ${PRIMARY}44`
                      : `0 18px 52px ${PRIMARY}22, 0 0 0 1px ${PRIMARY}30`,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {/* Decorative radial blob — purely visual */}
                <Box sx={{ pointerEvents: "none", position: "absolute", top: -40, right: -40, width: 130, height: 130, borderRadius: "50%", background: `radial-gradient(circle, ${PRIMARY}12 0%, transparent 70%)` }} />

                {/* ── Stat chip — renders only if t.stat exists in constants ── */}
                {t.stat && (
                  <Typography
                    component="span"
                    sx={{
                      alignSelf: "flex-start",
                      mb: 1.5,
                      fontSize: "0.67rem",
                      fontWeight: 700,
                      color: PRIMARY,
                      background: chipBg,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "6px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {t.stat}
                  </Typography>
                )}

                {/* ── 1. Avatar + 2. Name + 3. Role ──────────────────────── */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <Avatar
                    src={hasAvatar ? t.avatarSrc : undefined}
                    sx={{
                      width: 42,
                      height: 42,
                      background: `linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
                      fontWeight: 800,
                      fontSize: "0.82rem",
                      flexShrink: 0,
                      border: `2px solid ${PRIMARY}30`,
                    }}
                  >
                    {!hasAvatar && initials}
                  </Avatar>

                  <Box sx={{ minWidth: 0 }}>
                    {/* 2. Name */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.84rem",
                        color: textPri,
                        lineHeight: 1.25,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {t.name}
                    </Typography>

                    {/* 3. Company / Role */}
                    <Typography
                      sx={{
                        fontSize: "0.69rem",
                        color: textMut,
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {t.role}
                    </Typography>
                  </Box>
                </Box>

                {/* Thin divider */}
                <Box sx={{ height: "1px", background: isDark ? "rgba(255,255,255,0.06)" : `${PRIMARY}14`, mb: 1.5 }} />

                {/* Quote icon */}
                <FormatQuoteIcon
                  sx={{ fontSize: "1.5rem", color: PRIMARY, opacity: 0.18, mb: 0.5, display: "block" }}
                />

                {/* ── 4. Description ─────────────────────────────────────── */}
                <Typography
                  sx={{
                    fontSize: "0.77rem",
                    color: isDark ? "rgba(180,210,240,0.72)" : "rgba(15,50,80,0.66)",
                    lineHeight: 1.68,
                    fontStyle: "italic",
                    mb: 1.75,
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  "{t.quote}"
                </Typography>

                {/* ── 5. Star rating — uses t.rating or DEFAULT_RATING ───── */}
                <Box sx={{ display: "flex", gap: 0.3, alignItems: "center", mt: "auto" }}>
                  {Array.from({ length: 5 }).map((_, si) =>
                    si < rating
                      ? <StarIcon     key={si} sx={{ fontSize: 13, color: PRIMARY }} />
                      : <StarBorderIcon key={si} sx={{ fontSize: 13, color: PRIMARY, opacity: 0.28 }} />
                  )}
                  <Typography sx={{ ml: 0.75, fontSize: "0.65rem", color: textMut, lineHeight: 1 }}>
                    {rating}.0
                  </Typography>
                </Box>
              </Box>
            );
          })}
          </Box>
        </Box>
      </Box>

      {/* ── Dot navigation — count auto-matches TESTIMONIALS.length ─────────── */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75, mt: { xs: 3, md: 4 } }}>
        {TESTIMONIALS.map((_, i) => (
          <Box
            key={i}
            component="button"
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => jumpToIndex(total + i)}
            sx={{
              border: 0,
              padding: 0,
              width: i === centeredIdx ? 22 : 7,
              height: 7,
              borderRadius: "9999px",
              background: i === centeredIdx
                ? PRIMARY
                : isDark ? "rgba(255,255,255,0.14)" : "rgba(8,45,74,0.14)",
              transition: "width 0.35s cubic-bezier(.22,1,.36,1), background 0.35s ease, transform 0.2s ease",
              cursor: "pointer",
              appearance: "none",
              outline: "none",
              display: "block",
              "&:hover": {
                transform: "scale(1.08)",
              },
            }}
          />
        ))}
      </Box>

      <Box sx={{ py: { xs: 10, md: 12.5 }, textAlign: "center" }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: textPri }}>
            Not sure which services you need?
          </Typography>
          <Typography sx={{ opacity: 0.65, mb: 3, color: textMut }}>
            Book a discovery call. We'll listen first, then recommend only what makes sense for your business size and stage.
          </Typography>
          <CTAButton text="Book a Discovery Call" />
        </Container>
      </Box>

    </Box>
  );
}