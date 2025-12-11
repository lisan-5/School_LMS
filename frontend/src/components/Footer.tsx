import { Box, Typography, Stack, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 3,
      textAlign: "center",
      bgcolor: "background.paper",
      borderTop: 1,
      borderColor: "divider",
      mt: 6,
    }}
  >
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
      <IconButton color="inherit" href="https://github.com/" target="_blank">
        <GitHubIcon />
      </IconButton>
      <IconButton color="inherit" href="https://twitter.com/" target="_blank">
        <TwitterIcon />
      </IconButton>
      <IconButton color="inherit" href="https://linkedin.com/" target="_blank">
        <LinkedInIcon />
      </IconButton>
    </Stack>
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} NovaLMS. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
