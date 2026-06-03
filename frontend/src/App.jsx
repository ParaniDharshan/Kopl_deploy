import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/common-components/Navbar";
import Footer from "./components/common-components/Footer";
import ScrollToTop from "./components/common-components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import OfficeGallery from "./components/gallery-components/OfficeGallery";
import TeamGallery from "./components/gallery-components/TeamGallery";
import EventsGallery from "./components/gallery-components/EventsGallery";
import WhyCRKL from "./pages/WhyCRKL";
import Contact from "./pages/Contact";

import { PRIMARY, SECONDARY } from "./Constants.js";

const buildTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: PRIMARY },
      secondary: { main: SECONDARY },
      background: {
        default: mode === "dark" ? "#0a1929" : "#f0f9ff",
        paper: mode === "dark" ? "#0d2137" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      h1: { fontFamily: "'Sora', 'sans-serif'", fontWeight: 800 },
      h2: { fontFamily: "'Sora', 'sans-serif'", fontWeight: 700 },
      h3: { fontFamily: "'Sora', 'sans-serif'", fontWeight: 700 },
      h4: { fontFamily: "'Sora', 'sans-serif'", fontWeight: 600 },
      h5: { fontFamily: "'Sora', 'sans-serif'", fontWeight: 600 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none", fontWeight: 600, borderRadius: 10 },
        },
      },
      MuiCard: { styleOverrides: { root: { borderRadius: 12 } } },
    },
  });

export default function App() {
  const [mode, setMode] = useState("light");
  const theme = buildTheme(mode);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar
          mode={mode}
          toggleMode={() =>
            setMode((m) => (m === "light" ? "dark" : "light"))
          }
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/office" element={<OfficeGallery />} />
            <Route path="/gallery/team" element={<TeamGallery />} />
            <Route path="/gallery/events" element={<EventsGallery />} />
            <Route path="/why-kopl" element={<WhyCRKL />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer mode={mode} />
        <ScrollToTop />
      </ThemeProvider>
    </>
  );
}