import React from "react";
import { Box, Container, Grid, Typography, Chip, Card } from "@mui/material";
import CTAButton from "../Common-components/CTAButton";
import { SERVICES, PRIMARY, SECONDARY } from "../constants";

function Services() {
	return (
		<Box sx={{ pt:{ xs:10,md:10 } }}>
			{/* Hero */}
			<Box sx={{ py:{ xs:8,md:12 }, textAlign:"center", background:`radial-gradient(ellipse at 50% 30%,${PRIMARY}18 0%,transparent 60%)` }}>
				<Container maxWidth="md">
					<Chip label="Services" sx={{ mb:3, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
					<Typography variant="h1" sx={{ fontSize:{ xs:"2.2rem",md:"3rem" }, mb:2 }}>
						Professional services. Measurable outcomes.
					</Typography>
					<Typography sx={{ opacity:0.65, fontSize:"1.08rem", lineHeight:1.8 }}>
						Every service is delivered by qualified professionals at KOPL's secure Madurai office — managed from Chesterfield by M. Peri Periasamy.
					</Typography>
				</Container>
			</Box>

			{/* Service Pillars */}
			{SERVICES.map((s, i) => (
				<Box key={i} sx={{ py:{ xs:8,md:10 }, background:i%2!==0?`linear-gradient(160deg,${s.color}08 0%,transparent 60%)`:"transparent" }}>
					<Container maxWidth="lg">
						<Grid container spacing={6} alignItems="center" direction={i%2!==0?"row-reverse":"row"}>
							<Grid item xs={12} md={5}>
								<Box sx={{ p:4, borderRadius:"24px", background:`linear-gradient(135deg,${s.color}15,${s.color}08)`, border:`2px solid ${s.color}25`, textAlign:"center" }}>
									<Typography sx={{ fontSize:"5rem", mb:2 }}>{s.icon}</Typography>
									<Typography variant="h4" sx={{ fontWeight:800, color:s.color, mb:1 }}>Pillar {i+1} of 3</Typography>
									<Typography variant="h5" sx={{ fontWeight:700 }}>{s.title}</Typography>
									<Chip label={s.tag} sx={{ mt:2, background:`${s.color}20`, color:s.color, fontWeight:700 }} />
								</Box>
							</Grid>
							<Grid item xs={12} md={7}>
								<Typography variant="h4" sx={{ fontWeight:700, mb:2 }}>{s.title}</Typography>
								<Typography sx={{ opacity:0.72, lineHeight:1.85, mb:3 }}>{s.summary}</Typography>
								<Box sx={{ display:"flex", flexDirection:"column", gap:1.5 }}>
									{s.items.map((item) => (
										<Box key={item} sx={{ display:"flex", alignItems:"flex-start", gap:1.5 }}>
											<Typography sx={{ fontSize:20, color:s.color, mt:0.2, flexShrink:0 }}>✓</Typography>
											<Typography variant="body2" sx={{ opacity:0.8, lineHeight:1.7 }}>{item}</Typography>
										</Box>
									))}
								</Box>
							</Grid>
						</Grid>
					</Container>
				</Box>
			))}

			{/* Services CTA */}
			<Box sx={{ py:{ xs:8,md:10 }, textAlign:"center", background:`linear-gradient(160deg,${PRIMARY}0d 0%,${SECONDARY}0d 100%)` }}>
				<Container maxWidth="sm">
					<Typography variant="h4" sx={{ mb:2, fontWeight:700 }}>Not sure which services you need?</Typography>
					<Typography sx={{ opacity:0.65, mb:4 }}>
						Book a discovery call. We'll listen first, then recommend only what makes sense for your business size and stage.
					</Typography>
					<CTAButton text="Book a Discovery Call" />
				</Container>
			</Box>
		</Box>
	);
}

export default Services;
