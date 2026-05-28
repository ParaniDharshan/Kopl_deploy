import React from "react";
import { Box, Container, Box as MuiBox, Grid, Typography, Chip, Card } from "@mui/material";
import { PRIMARY, SECONDARY } from "../../constants";

export default function TheSolutions() {
  const items = [
    { icon:"🤝", t:"U.S. Contract, U.S. Accountability", d:"Your signed agreement is with CRKL Inc. — a Missouri-registered U.S. corporation. Not with KOPL. Not with India. With us." },
    { icon:"🔒", t:"Secure, Dedicated Office", d:"All work is performed in KOPL's dedicated, secure office in Madurai — not in a remote or unsupervised environment." },
    { icon:"👥", t:"You Choose Who You Hire", d:"You conduct the virtual interview. You approve the candidate. No blind placements — ever." },
    { icon:"⚡", t:"We Manage Everything Else", d:"Hiring, onboarding, HR, performance management, and daily oversight — handled by CRKL Inc. and KOPL. You review the output." },
    { icon:"📋", t:"Written Scope. No Surprises.", d:"Every engagement begins with a formal scope agreement. Costs, timelines, and standards are in writing before work begins." },
    { icon:"🎯", t:"Same Team. Every Day.", d:"A dedicated team handles your account. Same professionals, same context — no shared queues, no handoffs." },
  ];

  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign:"center", mb:8 }}>
          <Chip label="Our Solution" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
          <Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>The ideal and viable model</Typography>
          <Typography sx={{ opacity:0.65, maxWidth:560, mx:"auto", lineHeight:1.8 }}>Instead of connecting U.S. small businesses to an unknown Indian firm, we started our own — KOPL — as the dedicated Indian arm of CRKL Inc. One roof. One management. One standard.</Typography>
        </Box>

        <Grid container spacing={4}>
          {items.map((item, i) => ( 
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ p:3, height:"100%", border:`1px solid ${i%2===0?PRIMARY:SECONDARY}20`, "&:hover":{ borderColor:i%2===0?PRIMARY:SECONDARY, transform:"translateY(-4px)", boxShadow:`0 12px 40px ${PRIMARY}18` }, transition:"all .25s" }}>
                <Typography sx={{ fontSize:"2rem", mb:2 }}>{item.icon}</Typography>
                <Typography sx={{ fontWeight:700, mb:1 }}>{item.t}</Typography>
                <Typography variant="body2" sx={{ opacity:0.7, lineHeight:1.75 }}>{item.d}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
