import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="sticky" color="primary" elevation={4}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                component={RouterLink}
                to="/"
                color="inherit"
                size="large"
              >
                <MenuBookIcon fontSize="large" />
              </IconButton>
              <Typography
                variant="h6"
                fontWeight={700}
                component={RouterLink}
                to="/"
                color="inherit"
                sx={{ textDecoration: "none" }}
              >
                NovaLMS
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button color="inherit" component={RouterLink} to="/">
                Home
              </Button>
              <Button color="inherit" component={RouterLink} to="/courses">
                Courses
              </Button>
              <Button color="inherit" component={RouterLink} to="/pricing">
                Pricing
              </Button>
              <Button color="inherit" component={RouterLink} to="/about">
                About
              </Button>
              <Button color="inherit" component={RouterLink} to="/faq">
                FAQ
              </Button>
              <Button color="inherit" component={RouterLink} to="/contact">
                Contact
              </Button>
              {user && (
                <Button color="inherit" component={RouterLink} to="/dashboard">
                  Dashboard
                </Button>
              )}
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              {user ? (
                <>
                  <Typography
                    variant="body2"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.12)",
                      px: 2,
                      py: 1,
                      borderRadius: 99,
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{ ml: 1, borderColor: "white", color: "white" }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={RouterLink} to="/login">
                    Login
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    component={RouterLink}
                    to="/register"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
