import React, { useState } from "react";
import { Box, Container, Grid, Typography, Chip, Card, Divider, Avatar, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuoteIcon from "@mui/icons-material/FormatQuote";
import CTAButton from "../Common-components/CTAButton";
import { PRIMARY, SECONDARY, CONCERNS, ROADMAP } from "../constants";

function About() {
  const [expanded, setExpanded] = useState(false);
  const toggle = (p) => (_, isExp) => setExpanded(isExp ? p : false);

  return (
    <Box sx={{ pt:{ xs:10,md:10 } }}>

      {/* ── FOUNDER HERO ── */}
      <Box sx={{
        py:{ xs:8,md:12 },
        background:`radial-gradient(ellipse at 60% 30%,${PRIMARY}18 0%,transparent 55%)`,
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip label="About the Founder" sx={{ mb:3, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
              <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.8rem" }, mb:1 }}>
                M. Peri Periasamy
              </Typography>
              <Typography sx={{ color:SECONDARY, fontWeight:700, mb:3, fontSize:"1.05rem" }}>
                Founder — CRKL Inc. & KOPL
              </Typography>
              <Typography sx={{ fontSize:"1.2rem", fontStyle:"italic", opacity:0.8, mb:3, borderLeft:`4px solid ${PRIMARY}`, pl:2 }}>
                "I've always loved business."
              </Typography>
              <Typography sx={{ opacity:0.75, lineHeight:1.85, mb:2 }}>
                Before you consider entrusting your business work to anyone, you deserve to know exactly who is accountable. Not a company name. Not a tagline. A person — with a verifiable background, a proven track record, and a genuine stake in this community.
              </Typography>
              <Typography sx={{ opacity:0.75, lineHeight:1.85 }}>
                Peri was born and raised in Madurai, Tamil Nadu, India. His father owned a small hardware products distribution company, and from his earliest years, Peri worked there during summers and college breaks. He learned what it truly means to operate a small business: the long hours, the discipline of cash flow management, the weight of customer trust, and the quiet satisfaction of building something with your own hands.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display:"flex", justifyContent:"center" }}>
              {/* ← Replace this with <img src="peri-portrait.jpg" style={{width:"100%",maxWidth:420,borderRadius:24}} /> */}
              <Box sx={{
                width:{ xs:260,md:380 }, height:{ xs:320,md:460 },
                borderRadius:"24px",
                background:`linear-gradient(160deg,${PRIMARY}25,${SECONDARY}35)`,
                border:`2px solid ${PRIMARY}35`,
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:`0 24px 80px ${PRIMARY}28`,
              }}>
                <Box sx={{ textAlign:"center", opacity:0.6 }}>
                  <Typography sx={{ fontSize:"5rem" }}>👤</Typography>
                  <Typography variant="caption">Founder portrait placeholder</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── EDUCATION & CAREER ── */}
      <Box sx={{ py:{ xs:6,md:10 }, background:`linear-gradient(160deg,${SECONDARY}08 0%,transparent 60%)` }}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p:3, height:"100%", border:`1px solid ${PRIMARY}20` }}>
                <Typography sx={{ fontSize:"2rem", mb:2 }}>🎓</Typography>
                <Typography variant="h6" sx={{ fontWeight:700, mb:1.5, color:PRIMARY }}>Education</Typography>
                {[
                  { d:"Doctorate in Chemistry", i:"Florida State University" },
                  { d:"MBA — International Business", i:"Saint Louis University" },
                  { d:"Law Degree", i:"Saint Louis University" },
                ].map((e) => (
                  <Box key={e.d} sx={{ mb:1.5 }}>
                    <Typography sx={{ fontWeight:600, fontSize:"0.95rem" }}>{e.d}</Typography>
                    <Typography variant="caption" sx={{ opacity:0.6 }}>{e.i}</Typography>
                  </Box>
                ))}
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p:3, height:"100%", border:`1px solid ${SECONDARY}20` }}>
                <Typography sx={{ fontSize:"2rem", mb:2 }}>🏢</Typography>
                <Typography variant="h6" sx={{ fontWeight:700, mb:1.5, color:SECONDARY }}>Career</Typography>
                <Typography variant="body2" sx={{ opacity:0.75, lineHeight:1.8 }}>
                  His career at Mallinckrodt — a multinational corporation headquartered in St. Louis — gave him deep exposure to American business culture: results-based decision-making, goals and target-date-driven operations, commitment to quality, cost discipline, and the essential role of trust and reliability in professional relationships.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p:3, height:"100%", border:`1px solid ${PRIMARY}20` }}>
                <Typography sx={{ fontSize:"2rem", mb:2 }}>🏛️</Typography>
                <Typography variant="h6" sx={{ fontWeight:700, mb:1.5, color:PRIMARY }}>Civic Leadership</Typography>
                {[
                  { y:"2012", t:"Joined Chesterfield Regional Chamber of Commerce" },
                  { y:"~3 yrs", t:"Led Business Education Committee" },
                  { y:"2014–2019", t:"Board of Directors — Chamber" },
                  { y:"2019", t:"Chairman of the Board" },
                  { y:"2017–Now", t:"Finance & Admin Citizens Advisory Committee, City of Chesterfield" },
                ].map((c) => (
                  <Box key={c.y} sx={{ display:"flex", gap:1.5, mb:1.2 }}>
                    <Chip label={c.y} size="small" sx={{ background:`${PRIMARY}15`, color:PRIMARY, fontWeight:700, fontSize:"0.65rem", minWidth:70 }} />
                    <Typography variant="caption" sx={{ lineHeight:1.6 }}>{c.t}</Typography>
                  </Box>
                ))}
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── FOUNDER QUOTE ── */}
      <Container maxWidth="md" sx={{ py:6, textAlign:"center" }}>
        <QuoteIcon sx={{ fontSize:"3rem", color:PRIMARY, opacity:0.3 }} />
        <Typography variant="h5" sx={{ fontStyle:"italic", fontWeight:400, lineHeight:1.7, my:2, opacity:0.85 }}>
          "Both experiences allowed me to better understand the business needs of small companies in the Chesterfield region."
        </Typography>
        <Typography sx={{ color:PRIMARY, fontWeight:700 }}>— M. Peri Periasamy, Founder, CRKL Inc.</Typography>
      </Container>

      {/* ── COMPANY OVERVIEW ── */}
      <Box sx={{ py:{ xs:8,md:12 }, background:`linear-gradient(160deg,${PRIMARY}0d 0%,${SECONDARY}0d 100%)` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="Company Overview" sx={{ mb:2, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              Two companies. One founder. One standard.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title:"CRKL Inc. — Chesterfield, MO",
                sub:"U.S.-Facing Corporation",
                desc:"A U.S.-registered corporation in Chesterfield, Missouri. Your contract, your contact, your accountability — all here in the U.S. CRKL Inc. is your single point of contact for every business, contractual, and quality-related matter.",
                color:PRIMARY, icon:"🇺🇸",
              },
              {
                title:"KOPL — Madurai, Tamil Nadu",
                sub:"Kamala Outsourcing Private Limited",
                desc:"KOPL is the dedicated Indian delivery arm — professionally staffed, securely operated, and directly overseen by Peri. All client work is performed in KOPL's dedicated, secure office in Madurai. Young, driven professionals who bring energy, precision, and a genuine commitment to exceeding the brief.",
                color:SECONDARY, icon:"🇮🇳",
              },
            ].map((co) => (
              <Grid item xs={12} md={5} key={co.title}>
                <Card sx={{
                  p:4, height:"100%", textAlign:"center",
                  border:`2px solid ${co.color}30`,
                  "&:hover":{ borderColor:co.color, boxShadow:`0 16px 50px ${co.color}22`, transform:"translateY(-4px)" },
                  transition:"all .28s",
                }}>
                  <Typography sx={{ fontSize:"3rem", mb:2 }}>{co.icon}</Typography>
                  <Chip label={co.sub} size="small" sx={{ mb:2, background:`${co.color}18`, color:co.color, fontWeight:700 }} />
                  <Typography variant="h6" sx={{ fontWeight:700, mb:2 }}>{co.title}</Typography>
                  <Typography variant="body2" sx={{ opacity:0.72, lineHeight:1.8 }}>{co.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign:"center", mt:4, py:3, borderRadius:3, background:`linear-gradient(135deg,${PRIMARY}15,${SECONDARY}15)`, border:`1px solid ${PRIMARY}30` }}>
            <Typography sx={{ fontStyle:"italic", fontWeight:600, opacity:0.85 }}>
              "One roof and one management — the same person who speaks with you is the person responsible for the outcome."
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── CONCERNS Q&A ── */}
      <Box sx={{ py:{ xs:8,md:12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="We Understand Your Concerns" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              You have questions. They are the right questions.
            </Typography>
            <Typography sx={{ opacity:0.65, maxWidth:540, mx:"auto", lineHeight:1.8 }}>
              If someone has suggested outsourcing your work to a firm with operations in India — you should have concerns. Every serious business owner does. CRKL Inc. not only understands those concerns; they were the reason this company was built.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {CONCERNS.map((c, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Card sx={{
                  p:3, height:"100%",
                  border:`1px solid ${i%2===0?PRIMARY:SECONDARY}22`,
                  "&:hover":{ borderColor:i%2===0?PRIMARY:SECONDARY, boxShadow:`0 8px 30px ${PRIMARY}15`, transform:"translateY(-3px)" },
                  transition:"all .25s",
                }}>
                  <Typography sx={{ fontWeight:700, mb:1.5, fontSize:"0.95rem", color:i%2===0?PRIMARY:SECONDARY }}>
                    "{c.q}"
                  </Typography>
                  <Divider sx={{ mb:1.5 }} />
                  <Typography variant="body2" sx={{ opacity:0.75, lineHeight:1.8 }}>{c.a}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt:6, p:4, borderRadius:3, background:`linear-gradient(135deg,${PRIMARY}15,${SECONDARY}15)`, border:`1px solid ${PRIMARY}30`, textAlign:"center" }}>
            <Typography sx={{ fontWeight:700, fontSize:"1.05rem", mb:0.5 }}>
              CRKL Inc. has taken full ownership of the concerns and risks associated with outsourcing to India — so that you do not have to.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── 7-STEP ROADMAP ── */}
      <Box sx={{ py:{ xs:8,md:12 }, background:`linear-gradient(160deg,${SECONDARY}0d 0%,${PRIMARY}0d 100%)` }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="Your Journey with CRKL Inc." sx={{ mb:2, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
              From first call to measurable results
            </Typography>
            <Typography sx={{ opacity:0.65 }}>
              Your contract is with CRKL Inc. Your concerns are ours to carry.
            </Typography>
          </Box>

          <Box sx={{ display:"flex", flexDirection:"column", gap:2 }}>
            {ROADMAP.map((r, i) => (
              <Accordion
                key={i} expanded={expanded===`r${i}`} onChange={toggle(`r${i}`)}
                disableGutters elevation={0}
                sx={{
                  border:`1px solid ${expanded===`r${i}`?PRIMARY:"transparent"}40`,
                  borderRadius:"14px !important", overflow:"hidden", "&:before":{ display:"none" },
                  transition:"border-color .2s",
                  "&.Mui-expanded":{ boxShadow:`0 8px 32px ${PRIMARY}18` },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color:expanded===`r${i}`?PRIMARY:"inherit" }} />} sx={{ px:3, py:1 }}>
                  <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
                    <Typography sx={{
                      fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:"1.6rem",
                      background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
                      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", minWidth:48,
                    }}>
                      {r.step}
                    </Typography>
                    <Box>
                      <Typography sx={{ fontWeight:700, fontSize:"1rem" }}>{r.title}</Typography>
                      <Typography variant="caption" sx={{ opacity:0.6 }}>{r.sub}</Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ px:3, pb:3, pt:0, pl:9 }}>
                  <Typography sx={{ opacity:0.75, lineHeight:1.8 }}>{r.body}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Box sx={{ mt:5, p:4, borderRadius:3, textAlign:"center", background:`linear-gradient(135deg,${PRIMARY}12,${SECONDARY}12)`, border:`1px solid ${PRIMARY}25` }}>
            <Typography sx={{ fontStyle:"italic", fontWeight:600, mb:0.5, opacity:0.85 }}>
              "Our motto is to promise what we can deliver, and then deliver what we promised. Our strategy, however, is to deliver more than we promised."
            </Typography>
            <Typography variant="caption" sx={{ opacity:0.5 }}>— M. Peri Periasamy</Typography>
          </Box>
        </Container>
      </Box>

      {/* ── KOPL LEADERSHIP ── */}
      <Box sx={{ py:{ xs:8,md:10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center", mb:8 }}>
            <Chip label="KOPL Leadership" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
            <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" } }}>
              The team behind your work
            </Typography>
          </Box>

          <Card sx={{ maxWidth:700, mx:"auto", p:{ xs:3,md:5 }, border:`1px solid ${SECONDARY}30`, boxShadow:`0 16px 60px ${SECONDARY}18` }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm="auto" sx={{ textAlign:{ xs:"center",sm:"left" } }}>
                <Avatar sx={{
                  width:100, height:100, mx:{ xs:"auto",sm:0 },
                  fontSize:"2rem", fontWeight:800,
                  background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`,
                }}>BR</Avatar>
              </Grid>
              <Grid item xs={12} sm>
                <Typography variant="h5" sx={{ fontWeight:700 }}>Beulah Radhakrishnan</Typography>
                <Typography sx={{ color:SECONDARY, fontWeight:600, mb:0.5 }}>General Manager, KOPL</Typography>
                <Typography variant="caption" sx={{ opacity:0.6 }}>B.Tech — Information Technology</Typography>

                <Typography sx={{ mt:2, opacity:0.75, lineHeight:1.8, fontSize:"0.95rem" }}>
                  Beulah leads core operations and organizational development at KOPL. With over five years of consulting experience at CRKL Inc. and nearly three years as a Software Developer at Tata Consultancy Services, she brings a rare combination of technical depth and business management capability.
                </Typography>

                <Box sx={{ display:"flex", flexWrap:"wrap", gap:1, mt:2.5 }}>
                  {["Project Management","Technology Execution","TCS Alumni","Avgira Technologies","Multi-lingual"].map((tag) => (
                    <Chip key={tag} label={tag} size="small"
                      sx={{ background:`${PRIMARY}15`, color:PRIMARY, fontWeight:600, fontSize:"0.7rem" }} />
                  ))}
                </Box>

                <Box sx={{ display:"flex", gap:1, mt:2, flexWrap:"wrap" }}>
                  {["English","Hindi","Tamil","Telugu"].map((lang) => (
                    <Chip key={lang} label={lang} size="small" variant="outlined"
                      sx={{ borderColor:`${SECONDARY}50`, color:SECONDARY, fontSize:"0.7rem" }} />
                  ))}
                </Box>

                <Typography sx={{ mt:2.5, fontStyle:"italic", opacity:0.7, fontSize:"0.9rem", borderLeft:`3px solid ${SECONDARY}`, pl:2 }}>
                  "Leadership is about coordination, clarity, and care."
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* ── MISSION & VISION ── */}
      <Box sx={{ py:{ xs:8,md:10 }, overflow:"hidden" }}>
        <Container maxWidth="lg">
          <Grid container sx={{ borderRadius:3, overflow:"hidden", boxShadow:`0 16px 60px ${PRIMARY}20` }}>
            <Grid item xs={12} md={6}
              sx={{ background:`linear-gradient(135deg,${PRIMARY},#145e8e)`, p:{ xs:5,md:7 }, color:"#fff" }}>
              <Typography sx={{ fontWeight:800, fontSize:"0.75rem", letterSpacing:2, mb:3, opacity:0.7, textTransform:"uppercase" }}>
                Our Mission
              </Typography>
              <Typography variant="h5" sx={{ lineHeight:1.7, fontStyle:"italic" }}>
                To provide cost-effective, high-quality, and reliable business outsourcing — delivered in a timely and secure manner, consistently meeting the needs and expectations of our clients.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}
              sx={{ background:(t) => t.palette.mode==="dark"?"#0d2137":"#f8fcff", p:{ xs:5,md:7 } }}>
              <Typography sx={{ fontWeight:800, fontSize:"0.75rem", letterSpacing:2, mb:3, opacity:0.6, textTransform:"uppercase", color:PRIMARY }}>
                Our Vision
              </Typography>
              <Typography variant="h5" sx={{ lineHeight:1.7, fontStyle:"italic", color:PRIMARY }}>
                To build an outsourcing ecosystem where capability, security, and dependability converge — creating lasting value for businesses, teams, and the regions we serve.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── ABOUT CTA ── */}
      <Box sx={{ py:{ xs:8,md:10 }, textAlign:"center", background:`linear-gradient(160deg,${PRIMARY}0d 0%,${SECONDARY}0d 100%)` }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ mb:2, fontWeight:700 }}>Want to know if we're the right fit?</Typography>
          <Typography sx={{ opacity:0.65, mb:4 }}>
            Book a discovery call with CRKL Inc. — we'll be straightforward about what we can and cannot do for your business.
          </Typography>
          <CTAButton text="Book a Discovery Call" />
        </Container>
      </Box>
    </Box>
  );
}

export default About;