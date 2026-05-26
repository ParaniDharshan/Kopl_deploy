import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Navbar from "./Common-components/Navbar";
import Footer from "./Common-components/Footer";
import ScrollToTop from "./Common-components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import WhyCRKL from "./pages/WhyCRKL";
import Contact from "./pages/Contact";
import { PRIMARY, SECONDARY } from "./constants";

const buildTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: PRIMARY },
      secondary: { main: SECONDARY },
      background: {
        default: mode === "dark" ? "#0a1929" : "#f0f9ff",
        paper:   mode === "dark" ? "#0d2137" : "#ffffff",
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
    shape: { borderRadius: 14 },
    components: {
      MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 600, borderRadius: 10 } } },
      MuiCard:   { styleOverrides: { root: { borderRadius: 18 } } },
    },
  });

export default function App() {
  const [mode, setMode] = useState("light");
  const [activeTab, setActiveTab] = useState("Home");
  const theme = buildTheme(mode);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "Home":        return <Home />;
      case "About":       return <About />;
      case "Services":    return <Services />;
      case "Why CRKL":    return <WhyCRKL />;
      case "Contact":     return <Contact />;
      default:            return <Home />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} toggleMode={()=>setMode(m=>m==="light"?"dark":"light")} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>{renderTab()}</main>
      <Footer mode={mode} />
      <ScrollToTop />
    </ThemeProvider>
  );
}