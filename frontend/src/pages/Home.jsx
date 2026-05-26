import React from "react";
import { Box, Container, Grid, Typography, Chip, Card, CardContent, Paper, Divider, Avatar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import QuoteIcon from "@mui/icons-material/FormatQuote";
import CTAButton from "../Common-components/CTAButton";
import { PRIMARY, SECONDARY, SERVICES, TESTIMONIALS } from "../constants";

function Home() {
  return (
    <Box>
      {/* ── HERO ── */}
      <Box sx={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        pt: { xs: 10, md: 8 },
        background: `radial-gradient(ellipse at 70% 40%,${SECONDARY}22 0%,transparent 55%),\n                     radial-gradient(ellipse at 20% 80%,${PRIMARY}18 0%,transparent 50%)`,
        position: "relative", overflow: "hidden",
      }}>
        {/* blobs */}
        <Box sx={{ position:"absolute",top:-80,right:-80,width:400,height:400,borderRadius:"50%",background:`${PRIMARY}12`,filter:"blur(60px)",pointerEvents:"none" }} />
        <Box sx={{ position:"absolute",bottom:-60,left:-60,width:320,height:320,borderRadius:"50%",background:`${SECONDARY}18`,filter:"blur(50px)",pointerEvents:"none" }} />

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left */}
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <Chip label="Chesterfield, Missouri — U.S.-Managed" size="small"
                sx={{ mb: 3, background:`${PRIMARY}18`, color:PRIMARY, fontWeight:700, border:`1px solid ${PRIMARY}40` }} />

              <Typography variant="h1" sx={{
                fontSize:{ xs:"2.2rem",sm:"2.9rem",md:"3.4rem" }, lineHeight:1.15, mb:2.5,
                "& span":{ background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
              }}>
                Your books.<br/><span>Our discipline.</span><br/>Your growth.
              </Typography>

              <Typography variant="body1" sx={{ fontSize:"1.08rem", opacity:0.75, mb:4, maxWidth:500, lineHeight:1.8 }}>
                CRKL Inc. helps U.S. small and mid-sized businesses manage accounting, finance, and IT operations through a structured, secure, and professionally managed outsourcing model. You work with a trusted U.S.-based partner. We handle the rest.
              </Typography>

              <CTAButton
                text="Book a Free Discovery Call"
                sub="No commitment. 30 minutes. Let's understand your business needs first."
              />

              {/* Trust badges */}
              <Box sx={{ display:"flex", gap:3, mt:5, flexWrap:"wrap" }}>
                {["Missouri-Registered U.S. Corp","30+ Years in Chesterfield","One Roof. One Management."].map((t) => (
                  <Box key={t} sx={{ display:"flex", alignItems:"center", gap:0.6, opacity:0.75 }}>
                    <CheckIcon sx={{ fontSize:16, color:SECONDARY }} />
                    <Typography variant="caption" sx={{ fontWeight:600 }}>{t}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right — visual */}
            <Grid item xs={12} md={6} sx={{ order:{ xs:1, md:2 }, display:"flex", justifyContent:"center" }}>
              <Box sx={{
                width:{ xs:280,sm:360,md:440 }, height:{ xs:280,sm:360,md:440 },
                borderRadius:"32px",
                background:`linear-gradient(135deg,${PRIMARY}22,${SECONDARY}33)`,
                border:`2px solid ${PRIMARY}30`,
                display:"flex", alignItems:"center", justifyContent:"center",
                position:"relative", boxShadow:`0 24px 80px ${PRIMARY}28`,
              }}>
                {/* ← replace this with <img src="founder-photo.jpg" style={{...}} /> */}
                <Typography sx={{ fontSize:"7rem", userSelect:"none" }}>🤝</Typography>

                <Paper elevation={8} sx={{
                  position:"absolute", bottom:-20, left:-20, px:2.5, py:1.5, borderRadius:3,
                  background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`, color:"#fff",
                }}>
                  <Typography sx={{ fontWeight:800, fontSize:"1.4rem", lineHeight:1 }}>50+</Typography>
                  <Typography sx={{ fontSize:"0.7rem", opacity:0.9 }}>Years of experience</Typography>
                </Paper>

                <Paper elevation={6} sx={{
                  position:"absolute", top:-16, right:-16, px:2, py:1.2, borderRadius:3,
                }}>
                  <Typography sx={{ fontWeight:700, fontSize:"0.95rem", color:PRIMARY }}>Missouri</Typography>
                  <Typography sx={{ fontSize:"0.68rem", opacity:0.65 }}>U.S. Corporation</Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── THREE PILLARS ── */}
      <Box sx={{ py:{ xs:8,md:12 }, background:`linear-gradient(160deg,${PRIMARY}08 0%,${SECONDARY}08 100%)` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="What We Do" sx={{ mb:2, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              Three pillars. One trusted partner.
            </Typography>
            <Typography sx={{ opacity:0.65, maxWidth:520, mx:"auto", lineHeight:1.8 }}>
              Every service is delivered through KOPL's dedicated professionals in Madurai — managed from Chesterfield, Missouri.
            </Typography>
          </Box>

          <Box sx={{ display:"flex", flexWrap:"wrap", gap:3, justifyContent:{ xs:"center",md:"flex-start" } }}>
            {SERVICES.map((s, i) => (
              <Card key={i} sx={{
                flex:{ xs:"1 1 100%", sm:"1 1 calc(50% - 12px)", md:"1 1 calc(33.33% - 16px)" },
                maxWidth:{ sm:"calc(50% - 12px)", md:"calc(33.33% - 16px)" },
                border:`1px solid transparent`,
                transition:"all .28s ease",
                "&:hover":{ border:`1px solid ${s.color}50`, transform:"translateY(-6px)", boxShadow:`0 20px 60px ${s.color}20` },
              }}>
                <CardContent sx={{ p:3 }}>
                  <Typography sx={{ fontSize:"2.2rem", mb:2 }}>{s.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight:700, mb:1 }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ opacity:0.68, lineHeight:1.75, mb:2 }}>{s.summary}</Typography>
                  <Chip label={s.tag} size="small" sx={{ background:`${s.color}18`, color:s.color, fontWeight:700, fontSize:"0.7rem" }} />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── HOW IT WORKS ── */}
      <Box sx={{ py:{ xs:8,md:12 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="How It Works" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              Simple. Structured. Accountable.
            </Typography>
          </Box>
          <Box sx={{ display:"flex", flexDirection:"column", gap:3 }}>
            {[
              { n:"1", t:"Tell us what you need", d:"A 30-minute discovery call with CRKL Inc. is all it takes to scope your accounting or IT requirements, timelines, and reporting preferences." },
              { n:"2", t:"We match and set up", d:"CRKL assigns qualified professionals through KOPL, sets up secure communication channels, and establishes document workflows — all before day one." },
              { n:"3", t:"We deliver, you review", d:"Work runs on agreed schedules. You receive regular updates, review meetings, and accurate deliverables — without managing the team directly." },
            ].map((step) => (
              <Card key={step.n} sx={{ display:"flex", alignItems:"flex-start", gap:3, p:3, border:`1px solid ${PRIMARY}20`, "&:hover":{ borderColor:PRIMARY, boxShadow:`0 8px 30px ${PRIMARY}18` }, transition:"all .25s" }}>
                <Box sx={{
                  minWidth:52, height:52, borderRadius:"14px", flexShrink:0,
                  background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
                  display:"flex", alignItems:"center", justifyContent:"center", color:"#fff",
                }}>
                  <Typography sx={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:"1.4rem" }}>{step.n}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight:700, mb:0.5 }}>{step.t}</Typography>
                  <Typography variant="body2" sx={{ opacity:0.7, lineHeight:1.75 }}>{step.d}</Typography>
                </Box>
              </Card>
            ))}
          </Box>
          <Box sx={{ textAlign:"center", mt:6 }}>
            <CTAButton text="Book a Discovery Call" sub="Ready to reduce overhead and gain operational clarity?" />
          </Box>
        </Container>
      </Box>

      {/* ── TESTIMONIAL ── */}
      <Box sx={{ py:{ xs:8,md:10 }, background:`linear-gradient(160deg,${SECONDARY}0d 0%,${PRIMARY}0d 100%)` }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign:"center", mb:6 }}>
            <Chip label="Client Voice" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.4rem" } }}>
              What our clients say
            </Typography>
          </Box>
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} sx={{ p:{ xs:3,md:5 }, border:`1px solid ${PRIMARY}30`, boxShadow:`0 16px 60px ${PRIMARY}18` }}>
              <QuoteIcon sx={{ fontSize:"3rem", color:PRIMARY, opacity:0.25, mb:1 }} />
              <Typography variant="h6" sx={{ fontStyle:"italic", lineHeight:1.8, mb:3, fontWeight:400, opacity:0.85 }}>
                "{t.quote}"
              </Typography>
              <Divider sx={{ mb:2.5 }} />
              <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
                <Avatar sx={{ background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`, fontWeight:800 }}>{t.avatar}</Avatar>
                <Box>
                  <Typography sx={{ fontWeight:700 }}>{t.name}</Typography>
                  <Typography variant="caption" sx={{ opacity:0.6 }}>{t.role}</Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Container>
      </Box>
    </Box>
  );
}

export default Home;