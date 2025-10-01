import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Slide
} from "@mui/material";
import Confetti from "react-confetti";

const Transition = (props) => <Slide direction="up" {...props} />;

export default function WelcomeDialog() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (step === 1) {
      setStep(2); 
    } else {
      setOpen(false); 
    }
  };

  return (
    <>
      {open && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 3,
            textAlign: "center",
            bgcolor: "#fafafa"
          }
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.8rem",
            color: "primary.main"
          }}
        >
          {step === 1 ? "🎉 Welcome!" : "🚀 Almost There!"}
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{ fontSize: "1.1rem", color: "text.secondary", mb: 2 }}
          >
            {step === 1
              ? "We’re happy to have you here. Let’s get started!"
              : "Get ready to explore your dashboard with amazing features."}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.2, borderRadius: 3 }}
            onClick={handleNext}
          >
            {step === 1 ? "Go Next" : "Go to Dashboard"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
