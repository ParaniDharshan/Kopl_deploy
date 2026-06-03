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
import { PRIMARY, SECONDARY, CONCERNS } from "../../Constants.js";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const TRUNCATE_LENGTH = 80;

const truncateAnswer = (answer) =>
  answer.length > TRUNCATE_LENGTH
    ? `${answer.slice(0, TRUNCATE_LENGTH).trimEnd()}...`
    : answer;

export default function Concerns() {

  const navigate = useNavigate();

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
            KOPL not only understands those concerns; they were the reason
            this company was built. Here is what we hear most often — and how
            KOPL has structured its entire model to address each one.
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
                  display: "flex",
                  flexDirection: "column",
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
                <Box sx={{ minHeight: 72 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.75,
                      lineHeight: 1.8,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    {truncateAnswer(c.a)}
                    <Button
                      size="small"
                      variant="text"
                      onClick={() =>
                        {navigate("/why-kopl"), window.scrollTo({ top: 0, behavior: "smooth" })}
                      }
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        px: 0,
                        minWidth: 0,
                        ml: 0.5,
                        verticalAlign: "baseline",
                        display: "inline",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Read more
                    </Button>
                  </Typography>
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
            KOPL has taken full ownership of the concerns and risks
            associated with outsourcing to India — so that you do not have to.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
