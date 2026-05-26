import React from "react";
import { Box } from "@mui/material";
import Hero from "../Components/home-components/1_Hero";
import ThreePillars from "../Components/home-components/2_ThreePillars";
import HowItWorks from "../Components/home-components/3_HowItWorks";
import Testimonal from "../Components/home-components/4_Testimonal";

function Home() {
  return (
    <Box>
      <Hero />
      <ThreePillars />
      <HowItWorks />
      <Testimonal />
    </Box>
  );
}

export default Home;