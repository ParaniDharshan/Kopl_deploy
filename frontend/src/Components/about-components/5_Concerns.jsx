import React from "react";
import {
  Box,
  Container,
  Card,
  Typography,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { PRIMARY, SECONDARY, CONCERNS } from "../../constants";
import Grid from "@mui/material/Grid";

export default function Concerns() {
  return (
    <Box sx={{ py: 5, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "start", mb: 4 }}>
          <Chip
            label="We Understand Your Concerns"
            sx={{
              mb: 2,
              background: `${PRIMARY}20`,
              color: PRIMARY,
              fontWeight: 700,
            }}
          />
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, mb: 2 }}
          >
            You have questions. They are the right questions.
          </Typography>
          <Typography
            sx={{ opacity: 0.65, lineHeight: 1.8, textAlign: "start" }}
          >
            If you are a small business owner in Chesterfield, and someone has
            suggested you consider outsourcing work to a firm with operations in
            India — you should have concerns. Every serious business owner does.
            CRKL Inc. not only understands those concerns; they were the reason
            this company was built. Here is what we hear most often — and how
            CRKL Inc. has structured its entire model to address each one.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap", // allow wrapping like Grid
            gap: 3, // spacing between cards
            justifyContent: { xs: "center", md: "space-between" },
          }}
        >
          {CONCERNS.map((c, i) => (
            <Box
              key={i}
              sx={{
                flex: { xs: "1 1 100%", md: "1 1 calc(50% - 24px)" },
                display: "flex",
                
              }}
            >
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  border: `1px solid ${i % 2 === 0 ? PRIMARY : SECONDARY}22`,
                  "&:hover": {
                    borderColor: i % 2 === 0 ? PRIMARY : SECONDARY,
                    boxShadow: `0 8px 30px ${PRIMARY}15`,
                    transform: "translateY(-3px)",
                  },
                  transition: "all .25s",
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    fontSize: "0.95rem",
                    color: i % 2 === 0 ? PRIMARY : SECONDARY,
                  }}
                >
                  "{c.q}"
                </Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.75, lineHeight: 1.8 }}
                >
                  {c.a}
                </Typography>

                {/* See full answer button */}
                <Box
                  sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    size="small"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent("navigateTab", { detail: "Why CRKL" }),
                      )
                    }
                    sx={{ textTransform: "none" }}
                  >
                    See full answer
                  </Button>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: 6,
            p: 4,
            borderRadius: 3,
            background: `linear-gradient(135deg,${PRIMARY}15,${SECONDARY}15)`,
            border: `1px solid ${PRIMARY}30`,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", mb: 0.5 }}>
            CRKL Inc. has taken full ownership of the concerns and risks
            associated with outsourcing to India — so that you do not have to.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
