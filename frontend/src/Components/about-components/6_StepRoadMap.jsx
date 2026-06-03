import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { ROADMAP } from "../../Constants.js";

const PRIMARY = "#1d89c8";
const SECONDARY = "#3eb8af";

export default function StepRoadMap() {
  const [active, setActive] = useState(0);

  const nodePositions = [
    { x: 160, y: 60 },
    { x: 280, y: 130 },
    { x: 140, y: 200 },
    { x: 270, y: 270 },
    { x: 130, y: 340 },
    { x: 260, y: 410 },
    { x: 150, y: 480 },
  ];

  const NODE_R = 26;

  const buildCurvePath = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / dist;
    const uy = dy / dist;
    const sx = a.x + ux * NODE_R;
    const sy = a.y + uy * NODE_R;
    const ex = b.x - ux * NODE_R;
    const ey = b.y - uy * NODE_R;
    const cx1 = b.x;
    const cy1 = a.y;
    return `M ${sx} ${sy} C ${cx1} ${cy1}, ${(sx + ex) / 2} ${(sy + ey) / 2}, ${ex} ${ey}`;
  };

  const isCompleted = (i) => i < active;
  const isCurrent = (i) => i === active;

  const svgWidth = 400;
  const svgHeight = nodePositions[ROADMAP.length - 1]?.y + 80 || 560;

  return (
    <Box sx={{ py: 8, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Box
            sx={{
              display: "inline-block",
              px: 2,
              py: 0.5,
              borderRadius: "20px",
              bgcolor: `${PRIMARY}12`,
              color: PRIMARY,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Our Process
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              fontWeight: 700,
              mb: 1.5,
              lineHeight: 1.2,
            }}
          >
            From first call to measurable results
          </Typography>
          <Typography
            sx={{ opacity: 0.55, fontSize: "1rem", maxWidth: 480, mx: "auto" }}
          >
            Your contract is with KOPL Your concerns are ours to carry.
          </Typography>
        </Box>

        {/* Waypoint bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
            maxWidth: { xs: "100%", md: svgWidth }, // ✅ fixed
          }}
        >
          <Typography
            sx={{
              fontSize: "0.78rem",
              fontWeight: 600,
              opacity: 0.4,
              letterSpacing: 0.5,
            }}
          >
            Project journey
          </Typography>
          <Box
            sx={{
              fontSize: "0.72rem",
              fontWeight: 600,
              px: 1.5,
              py: 0.4,
              borderRadius: "20px",
              border: "1.5px solid",
              borderColor: `${PRIMARY}30`,
              color: PRIMARY,
              bgcolor: `${PRIMARY}08`,
            }}
          >
            Step {active + 1} / {ROADMAP.length}
          </Box>
        </Box>

        {/* Map + Card row */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, md: 6 },
            alignItems: "center",
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          {/* SVG Map — hidden on small screens */}
          <Box sx={{ flexShrink: 0, display: { xs: "none", md: "block" } }}>
            <svg
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              style={{ display: "block", maxWidth: "100%" }}
            >
              {nodePositions.slice(0, ROADMAP.length - 1).map((pos, i) => {
                const next = nodePositions[i + 1];
                const done = isCompleted(i + 1);
                const active_ = isCurrent(i);
                const colored = done || active_;
                return (
                  <path
                    key={`line-${i}`}
                    d={buildCurvePath(pos, next)}
                    fill="none"
                    stroke={done ? SECONDARY : active_ ? PRIMARY : "#e0e0e0"}
                    strokeWidth={colored ? 2.5 : 1.5}
                    strokeDasharray={colored ? "none" : "4 7"}
                    strokeLinecap="round"
                    style={{
                      transition: "stroke 0.4s ease, stroke-width 0.3s ease",
                    }}
                  />
                );
              })}

              {ROADMAP.map((r, i) => {
                const pos = nodePositions[i];
                if (!pos) return null;
                const { x, y } = pos;
                const current = isCurrent(i);
                const completed = isCompleted(i);

                const fill = current
                  ? PRIMARY
                  : completed
                    ? SECONDARY
                    : "white";
                const stroke = current
                  ? PRIMARY
                  : completed
                    ? SECONDARY
                    : "#d0d0d0";
                const textColor = current || completed ? "#fff" : "#bbb";
                const labelColor = current
                  ? "#111"
                  : completed
                    ? SECONDARY
                    : "#bbb";
                const labelWeight = current ? "700" : completed ? "600" : "400";

                return (
                  <g
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActive(i)}
                  >
                    {current && (
                      <>
                        <circle
                          cx={x}
                          cy={y}
                          r={NODE_R + 14}
                          fill={`${PRIMARY}10`}
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r={NODE_R + 7}
                          fill="none"
                          stroke={PRIMARY}
                          strokeWidth={1.5}
                          strokeOpacity={0.25}
                        />
                      </>
                    )}
                    {(current || completed) && (
                      <circle
                        cx={x + 1}
                        cy={y + 2}
                        r={NODE_R}
                        fill="rgba(0,0,0,0.08)"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={NODE_R}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={current || completed ? 0 : 1.5}
                      style={{
                        transition: "fill 0.35s ease, stroke 0.35s ease",
                      }}
                    />
                    {completed ? (
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={15}
                        fill="#fff"
                        style={{ pointerEvents: "none" }}
                      >
                        ✓
                      </text>
                    ) : (
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={current ? 14 : 12}
                        fontWeight={current ? "700" : "500"}
                        fill={textColor}
                        style={{
                          transition: "fill 0.35s ease",
                          pointerEvents: "none",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </text>
                    )}
                    <text
                      x={x}
                      y={y + NODE_R + 15}
                      textAnchor="middle"
                      fontSize={10.5}
                      fontWeight={labelWeight}
                      fill={labelColor}
                      style={{
                        transition: "fill 0.35s ease",
                        pointerEvents: "none",
                      }}
                    >
                      {r.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </Box>

          {/* Detail Card */}
          <Box
            sx={{
              flex: 1,
              alignSelf: "center",
              position: { md: "sticky" },
              top: { md: 32 },
              minWidth: 0,
              width: { xs: "100%", md: "auto" }, // ✅ full width on mobile
            }}
          >
            <Box
              sx={{
                borderRadius: "20px",
                border: `1.5px solid ${PRIMARY}20`,
                overflow: "hidden",
              }}
            >
              {/* Top accent bar */}
              <Box
                sx={{
                  height: 4,
                  background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                }}
              />

              <Box sx={{ p: { xs: 3, md: 4 } }}>
                {/* Step badge + sub label */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      bgcolor: PRIMARY,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    {String(active + 1).padStart(2, "0")}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      letterSpacing: 1.4,
                      textTransform: "uppercase",
                      color: PRIMARY,
                      fontWeight: 700,
                      opacity: 0.75,
                    }}
                  >
                    {ROADMAP[active].sub}
                  </Typography>
                </Box>

                {/* Title */}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.3rem", md: "1.55rem" },
                    lineHeight: 1.25,
                    mb: 2,
                  }}
                >
                  {ROADMAP[active].title}
                </Typography>

                {/* Divider */}
                <Box
                  sx={{ height: "1.5px", bgcolor: `${PRIMARY}12`, mb: 2.5 }}
                />

                {/* Body */}
                <Typography
                  sx={{
                    opacity: 0.68,
                    lineHeight: 1.9,
                    fontSize: "0.95rem",
                  }}
                >
                  {ROADMAP[active].body}
                </Typography>

                {/* Progress dots */}
                <Box sx={{ display: "flex", gap: 0.7, mt: 3.5, mb: 3 }}>
                  {ROADMAP.map((_, i) => (
                    <Box
                      key={i}
                      onClick={() => setActive(i)}
                      sx={{
                        height: 6,
                        width: i === active ? 24 : i < active ? 10 : 6,
                        borderRadius: "3px",
                        bgcolor:
                          i === active
                            ? PRIMARY
                            : i < active
                              ? SECONDARY
                              : "#e0e0e0",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </Box>

                {/* Nav buttons */}
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Box
                    component="button"
                    disabled={active === 0}
                    onClick={() => setActive((a) => a - 1)}
                    sx={{
                      flex: 1,
                      py: 1.3,
                      borderRadius: "12px",
                      border: `1.5px solid ${PRIMARY}35`,
                      bgcolor: "transparent",
                      color: active === 0 ? "#ccc" : PRIMARY,
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      cursor: active === 0 ? "not-allowed" : "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    ← Previous
                  </Box>
                  <Box
                    component="button"
                    disabled={active === ROADMAP.length - 1}
                    onClick={() => setActive((a) => a + 1)}
                    sx={{
                      flex: 1,
                      py: 1.3,
                      borderRadius: "12px",
                      border: "none",
                      background:
                        active === ROADMAP.length - 1
                          ? "#ddd"
                          : `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                      color: active === ROADMAP.length - 1 ? "#aaa" : "#fff",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      cursor:
                        active === ROADMAP.length - 1
                          ? "not-allowed"
                          : "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    Next →
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Quote */}
        <Box
          sx={{
            mt: 8,
            p: { xs: 3, md: 4.5 },
            borderRadius: "20px",
            textAlign: "center",
            border: `1px solid ${PRIMARY}18`,
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5rem",
              color: PRIMARY,
              opacity: 0.15,
              lineHeight: 1,
              mb: -1,
            }}
          >
            "
          </Typography>
          <Typography
            sx={{
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.75,
              opacity: 0.8,
              maxWidth: 640,
              mx: "auto",
            }}
          >
            Our motto is to promise what we can deliver, and then deliver what
            we promised. Our strategy, however, is to deliver more than we
            promised.
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 1.5, opacity: 0.45, fontWeight: 600 }}
          >
            — M. Peri Periasamy
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

