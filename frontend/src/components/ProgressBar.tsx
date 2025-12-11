import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const ProgressBar = ({ value }: { value: number }) => (
  <Box sx={{ width: "100%", mt: 1 }}>
    <LinearProgress
      variant="determinate"
      value={Math.min(100, value)}
      color={value === 100 ? "success" : "primary"}
      sx={{ height: 8, borderRadius: 5, transition: "all 0.5s" }}
    />
  </Box>
);

export default ProgressBar;
