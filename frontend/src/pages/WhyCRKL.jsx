import React, { useState } from "react";
import { Box, Container, Typography, Chip, Grid, Card, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CTAButton from "../Common-components/CTAButton";
import { PRIMARY, SECONDARY, CONCERNS } from "../constants";

function WhyCRKL() {
	const [expanded, setExpanded] = useState(false);
	const toggle = (p) => (_, isExp) => setExpanded(isExp ? p : false);

	const FAQ_GROUPS = [
		{
			label:"Trust & Accountability",
			items: CONCERNS.slice(0,4),
		},
		{
			label:"Data Security & Confidentiality",
			items:[
				{ q:"Who has access to my QuickBooks or financial systems?", a:"Only the specific team members assigned to your engagement. Access is role-limited, monitored, and can be revoked at any time. We use cloud-based systems with access logs, so there is always a verifiable record." },
				{ q:"What happens to my data if we end the engagement?", a:"Your data belongs to you. Upon engagement closure, all access is revoked, and data handling procedures are followed per the terms of your agreement. We can walk you through exactly what this looks like before you sign anything." },
			],
		},
		{
			label:"Cost, Pricing & Value",
			items:[
				{ q:"Are there hidden costs I should know about?", a:"No. Every engagement is scoped in writing before it begins. Costs, scope, and any potential additions are discussed transparently upfront. You will not receive surprise invoices." },
				{ q:"Can I start with just one service and expand later?", a:"Yes. Most clients begin with one focused area — typically bookkeeping or tax support — and expand as they see results. We grow with your business at your pace." },
			],
		},
		{
			label:"Process & Onboarding",
			items:[
				{ q:"What information do I need to provide to get started?", a:"Typically: access to your accounting software (QuickBooks), a summary of your current processes, any existing reports or chart of accounts, and your preferred reporting formats. We guide you through a checklist — you don't need to figure it out alone." },
				{ q:"Can I stop or pause the engagement if my needs change?", a:"Yes. Engagement terms are discussed clearly upfront, including exit and pause conditions. We believe in long-term relationships built on results — not lock-in contracts that trap clients." },
			],
		},
		{
			label:"IT Services",
			items:[
				{ q:"Do I need a technical background to work with your IT team?", a:"No. Our IT team translates technical requirements into plain business language. You describe the problem or the outcome you want — we handle the implementation and report back in terms you can act on." },
				{ q:"What kind of businesses is the IT service suited for?", a:"SMEs that need reliable web development, automation, or IT system support — but do not have the volume to justify a full-time in-house developer or IT manager." },
			],
		},
	];

	return (
		<Box sx={{ pt:{ xs:10,md:10 } }}>
			{/* Hero */}
			<Box sx={{ py:{ xs:8,md:12 }, background:`radial-gradient(ellipse at 60% 30%,${SECONDARY}18 0%,transparent 55%)` }}>
				<Container maxWidth="md" sx={{ textAlign:"center" }}>
					<Chip label="Why CRKL Inc." sx={{ mb:3, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
					<Typography variant="h1" sx={{ fontSize:{ xs:"2.2rem",md:"3rem" }, mb:3 }}>
						The solution built around your concerns
					</Typography>
					<Typography sx={{ opacity:0.7, fontSize:"1.05rem", lineHeight:1.85, mb:5 }}>
						As outsourcing expanded, a clear pattern emerged: large companies reap its cost savings, while small businesses remain reluctant. Their hesitation centers on real, valid concerns. CRKL Inc. was built to address every single one.
					</Typography>
				</Container>
			</Box>

			{/* The Solution */}
			<Box sx={{ py:{ xs:8,md:12 } }}>
				<Container maxWidth="lg">
					<Box sx={{ textAlign:"center", mb:8 }}>
						<Chip label="Our Solution" sx={{ mb:2, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
						<Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
							The ideal and viable model
						</Typography>
						<Typography sx={{ opacity:0.65, maxWidth:560, mx:"auto", lineHeight:1.8 }}>
							Instead of connecting U.S. small businesses to an unknown Indian firm, we started our own — KOPL — as the dedicated Indian arm of CRKL Inc. One roof. One management. One standard.
						</Typography>
					</Box>

					<Grid container spacing={4}>
						{[
							{ icon:"🤝", t:"U.S. Contract, U.S. Accountability", d:"Your signed agreement is with CRKL Inc. — a Missouri-registered U.S. corporation. Not with KOPL. Not with India. With us." },
							{ icon:"🔒", t:"Secure, Dedicated Office", d:"All work is performed in KOPL's dedicated, secure office in Madurai — not in a remote or unsupervised environment." },
							{ icon:"👥", t:"You Choose Who You Hire", d:"You conduct the virtual interview. You approve the candidate. No blind placements — ever." },
							{ icon:"⚡", t:"We Manage Everything Else", d:"Hiring, onboarding, HR, performance management, and daily oversight — handled by CRKL Inc. and KOPL. You review the output." },
							{ icon:"📋", t:"Written Scope. No Surprises.", d:"Every engagement begins with a formal scope agreement. Costs, timelines, and standards are in writing before work begins." },
							{ icon:"🎯", t:"Same Team. Every Day.", d:"A dedicated team handles your account. Same professionals, same context — no shared queues, no handoffs." },
						].map((item, i) => (
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

			{/* FAQ Accordion grouped */}
			<Box sx={{ py:{ xs:8,md:12 }, background:`linear-gradient(160deg,${PRIMARY}0d 0%,${SECONDARY}0d 100%)` }}>
				<Container maxWidth="md">
					<Box sx={{ textAlign:"center", mb:8 }}>
						<Chip label="FAQ" sx={{ mb:2, background:`${SECONDARY}20`, color:SECONDARY, fontWeight:700 }} />
						<Typography variant="h2" sx={{ fontSize:{ xs:"2rem",md:"2.6rem" }, mb:2 }}>
							Every question answered
						</Typography>
					</Box>

					{FAQ_GROUPS.map((group, gi) => (
						<Box key={gi} sx={{ mb:5 }}>
							<Typography sx={{ fontWeight:800, mb:2, color:gi%2===0?PRIMARY:SECONDARY, fontSize:"0.8rem", textTransform:"uppercase", letterSpacing:1.5 }}>{group.label}</Typography>
							<Box sx={{ display:"flex", flexDirection:"column", gap:1.5 }}>
								{group.items.map((item, i) => {
									const key = `g${gi}-i${i}`;
									return (
										<Accordion key={key} expanded={expanded===key} onChange={toggle(key)} disableGutters elevation={0} sx={{ border:`1px solid ${expanded===key?(gi%2===0?PRIMARY:SECONDARY):"transparent"}40`, borderRadius:"14px !important", overflow:"hidden", "&:before":{ display:"none" }, "&.Mui-expanded":{ boxShadow:`0 6px 24px ${PRIMARY}15` } }}>
											<AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color:expanded===key?(gi%2===0?PRIMARY:SECONDARY):"inherit" }} />} sx={{ px:3, py:0.5 }}>
												<Typography sx={{ fontWeight:600, fontSize:"0.95rem" }}>{item.q}</Typography>
											</AccordionSummary>
											<AccordionDetails sx={{ px:3, pb:3, pt:0 }}>
												<Typography sx={{ opacity:0.72, lineHeight:1.8 }}>{item.a}</Typography>
											</AccordionDetails>
										</Accordion>
									);
								})}
							</Box>
						</Box>
					))}
				</Container>
			</Box>

			{/* Why CTA */}
			<Box sx={{ py:{ xs:8,md:10 }, textAlign:"center" }}>
				<Container maxWidth="sm">
					<Typography variant="h4" sx={{ mb:2, fontWeight:700 }}>Still have a question we haven't answered?</Typography>
					<Typography sx={{ opacity:0.65, mb:4 }}>Book a 30-minute call with Peri. Ask anything. No pitch, no pressure.</Typography>
					<CTAButton text="Book a Discovery Call" />
				</Container>
			</Box>
		</Box>
	);
}

export default WhyCRKL;
