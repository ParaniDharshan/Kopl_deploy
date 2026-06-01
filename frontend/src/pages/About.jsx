import React from "react";
import { Box } from "@mui/material";
import Hero from "../components/about-components/1_Hero";
import FounderHero from "../components/about-components/1_FounderHero";
import EducationAndCareer from "../components/about-components/2_EducationAndCareer";
import FounderQuote from "../components/about-components/3_FounderQuote";
import CompanyOverview from "../components/about-components/4_CompanyOverview";
import Concerns from "../components/about-components/5_Concerns";
import StepRoadMap from "../components/about-components/6_StepRoadMap";
import KoplLeadership from "../components/about-components/7_KoplLeadership";
import MissionVision from "../components/about-components/8_MissionVision";
import AboutCTA from "../components/about-components/9_AboutCTA";
import GmailButton from "../components/common-components/Gmailbutton";
import KOPLIntroduction from "../components/about-components/KoplIntro";

function About() {
  return (
    <Box>
      <Hero />
      <MissionVision />
      <FounderHero />
      <Concerns />
      <CompanyOverview />
      <KOPLIntroduction />
      <StepRoadMap />
      <AboutCTA />
      <GmailButton />
    </Box>
  );
}

export default About;