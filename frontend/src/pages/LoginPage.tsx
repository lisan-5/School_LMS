import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Stack,
  Link,
} from "@mui/material";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (e) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome back
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Access your courses
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              size="large"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <Typography color="text.secondary" align="center">
              No account?{" "}
              <Link component={RouterLink} to="/register">
                Create one
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
