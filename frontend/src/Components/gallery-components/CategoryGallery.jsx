import React, { useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CTAButton from "../common-components/CTAButton";
import Masonry from "./Masonry";

function CategoryGallery({
  title,
  subtitle,
  chipLabel,
  items,
  accent,
  backTab = "Gallery",
  setActiveTab,
  actions,
  centered = false,
  backButtonPosition = "top",
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const pageStyles = useMemo(
    () => ({
      pt: { xs: 11, md: 14 },
      pb: 10,
      minHeight: "100vh",
      background: isDark
        ? "linear-gradient(180deg, #07131f 0%, #0a1929 45%, #07131f 100%)"
        : "linear-gradient(180deg, #f8fcff 0%, #eef8ff 45%, #f8fcff 100%)",
    }),
    [isDark]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <Box sx={pageStyles}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 3, ...(centered ? { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' } : {}) }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            {title}
          </Typography>
          <Typography
            sx={{ maxWidth: 760, color: "text.secondary", lineHeight: 1.7, ...(centered ? { margin: '0 auto' } : {}) }}
          >
            {subtitle}
          </Typography>
        </Box>

        {backButtonPosition === "top" && (
          <Box sx={{ mb: 2.5, ...(centered ? { display: 'flex', justifyContent: 'center' } : {}) }}>
            <CTAButton
              text="Back to Gallery"
              size="large"
              isBack
              onClick={() => {
                if (typeof setActiveTab === 'function') {
                  setActiveTab(backTab);
                  window.scrollTo({ top: 0, left: 0 });
                } else {
                  try {
                    window.history.back();
                  } catch (e) {}
                }
              }}
            />
          </Box>
        )}

        <Box sx={{ mb: 3 }}>{actions}</Box>

        <Box
          sx={{
            p: { xs: 1, md: 2 },
          borderRadius: 2,
            background: isDark
              ? "linear-gradient(180deg, rgba(20,42,66,0.95), rgba(10,25,41,0.92))"
              : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(240,249,255,0.84))",
            border: `1px solid ${
              isDark
                ? "rgba(93,147,194,0.2)"
                : "rgba(29,137,200,0.12)"
            }`,
            boxShadow: isDark
              ? "0 18px 60px rgba(0, 0, 0, 0.45)"
              : "0 18px 60px rgba(15, 40, 70, 0.08)",
          }}
        >
          <Masonry items={items} colorShiftOnHover  />
        </Box>

        {backButtonPosition === "bottom" && (
          <Box sx={{ mt: 2.5, display: 'flex', justifyContent: 'center' }}>
            <CTAButton
              text="Back to Gallery"
              size="large"
              isBack
              onClick={() => {
                if (typeof setActiveTab === 'function') {
                  setActiveTab(backTab);
                  window.scrollTo({ top: 0, left: 0 });
                } else {
                  try {
                    window.history.back();
                  } catch (e) {}
                }
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default CategoryGallery;