import React, { useState } from "react";
import { Box, Container, Grid, Chip, Typography, Card, TextField, Button, Divider, Avatar, Snackbar, Alert } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { CONTACT_INFO, PRIMARY, BOOKING_URL } from "../constants";

function Contact() {
	const [form, setForm] = useState({ name:"", email:"", company:"", service:"", message:"" });
	const [errors, setErrors] = useState({});
	const [snack, setSnack] = useState(false);

	const validate = () => {
		const e = {};
		if (!form.name.trim()) e.name = "Name is required";
		if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = "Valid email required";
		if (!form.message.trim()) e.message = "Please describe your needs";
		return e;
	};

	const handleSubmit = () => {
		const e = validate();
		if (Object.keys(e).length) { setErrors(e); return; }
		setSnack(true);
		setForm({ name:"", email:"", company:"", service:"", message:"" });
		setErrors({});
	};

	const field = (label, key, multiline=false, rows=1) => (
		<TextField
			fullWidth label={label} value={form[key]}
			multiline={multiline} rows={rows}
			error={!!errors[key]} helperText={errors[key]}
			onChange={(e) => { setForm(p=>({...p,[key]:e.target.value})); setErrors(p=>({...p,[key]:""})); }}
			sx={{ "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{ borderColor:PRIMARY }, "& .MuiInputLabel-root.Mui-focused":{ color:PRIMARY } }}
		/>
	);

	return (
		<Box sx={{ pt:{ xs:10,md:10 } }}>
			{/* Hero */}
			<Box sx={{ py:{ xs:8,md:12 }, textAlign:"center", background:`radial-gradient(ellipse at 50% 30%,${PRIMARY}15 0%,transparent 55%)` }}>
				<Container maxWidth="md">
					<Chip label="Contact" sx={{ mb:3, background:`${PRIMARY}20`, color:PRIMARY, fontWeight:700 }} />
					<Typography variant="h1" sx={{ fontSize:{ xs:"2.2rem",md:"3rem" }, mb:2 }}>
						Let's talk about your business
					</Typography>
					<Typography sx={{ opacity:0.65, fontSize:"1.05rem", lineHeight:1.8 }}>
						A 30-minute discovery call is all it takes. No commitment. No pressure. Just an honest conversation about your needs.
					</Typography>
				</Container>
			</Box>

			{/* Form + Info */}
			<Box sx={{ py:{ xs:4,md:8 } }}>
				<Container maxWidth="lg">
					<Grid container spacing={6} alignItems="flex-start">
						{/* Info panel */}
						<Grid item xs={12} md={4}>
							<Box sx={{ display:"flex", flexDirection:"column", gap:3 }}>
								<Typography variant="h5" sx={{ fontWeight:700 }}>M. Peri Periasamy</Typography>
								<Typography sx={{ opacity:0.65, lineHeight:1.8 }}>Founder, CRKL Inc. — Chesterfield, Missouri<br/>U.S.-Managed Business Outsourcing</Typography>
								{[
									{ icon:<PhoneIcon />, label:"Phone", val:CONTACT_INFO.phone },
									{ icon:<EmailIcon />, label:"Email", val:CONTACT_INFO.email },
									{ icon:<LocationIcon />, label:"Location", val:CONTACT_INFO.location },
								].map((item) => (
									<Box key={item.label} sx={{ display:"flex", gap:2, alignItems:"flex-start" }}>
										<Box sx={{ width:46, height:46, borderRadius:2.5, flexShrink:0, background:`linear-gradient(135deg,${PRIMARY}20,${SECONDARY}20)`, display:"flex", alignItems:"center", justifyContent:"center", color:PRIMARY }}>{item.icon}</Box>
										<Box>
											<Typography variant="caption" sx={{ opacity:0.5, textTransform:"uppercase", letterSpacing:1, fontWeight:700 }}>{item.label}</Typography>
											<Typography sx={{ fontWeight:600 }}>{item.val}</Typography>
										</Box>
									</Box>
								))}

								<Divider />
								<Button variant="contained" href={BOOKING_URL} target="_blank" size="large" sx={{ background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`, boxShadow:`0 6px 24px ${PRIMARY}44` }}>
									Book a Discovery Call Directly
								</Button>
								<Typography variant="caption" sx={{ opacity:0.5, textAlign:"center" }}>No commitment. 30 minutes.</Typography>
							</Box>
						</Grid>

						{/* Form */}
						<Grid item xs={12} md={8}>
							<Card sx={{ p:{ xs:3,md:4.5 } }}>
								<Typography variant="h6" sx={{ fontWeight:700, mb:3 }}>Send a message</Typography>
								<Box sx={{ display:"flex", flexDirection:"column", gap:2.5 }}>
									<Grid container spacing={2.5}>
										<Grid item xs={12} sm={6}>{field("Full Name *","name")}</Grid>
										<Grid item xs={12} sm={6}>{field("Email Address *","email")}</Grid>
									</Grid>
									<Grid container spacing={2.5}>
										<Grid item xs={12} sm={6}>{field("Company / Business Name","company")}</Grid>
										<Grid item xs={12} sm={6}>
											<TextField fullWidth select label="Service of Interest" value={form.service} onChange={(e)=>setForm(p=>({...p,service:e.target.value}))} SelectProps={{ native:true }} sx={{ "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{ borderColor:PRIMARY } }}>
												<option value=""></option>
												<option value="accounting">Accounting & Finance</option>
												<option value="tax">Tax Services</option>
												<option value="it">IT Services</option>
												<option value="general">General Inquiry</option>
											</TextField>
										</Grid>
									</Grid>
									{field("Tell us about your business and what you need *","message",true,5)}
									<Button variant="contained" size="large" endIcon={<SendIcon />} onClick={handleSubmit} sx={{ alignSelf:"flex-end", background:`linear-gradient(135deg,${PRIMARY},${SECONDARY})`, px:4, py:1.4, boxShadow:`0 6px 24px ${PRIMARY}44`, "&:hover":{ boxShadow:`0 10px 36px ${PRIMARY}66` } }}>
										Send Message
									</Button>
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Snackbar open={snack} autoHideDuration={5000} onClose={()=>setSnack(false)} anchorOrigin={{ vertical:"bottom",horizontal:"center" }}>
				<Alert severity="success" variant="filled" sx={{ background:SECONDARY }}>
					Message received! We'll be in touch within 24 hours.
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default Contact;
