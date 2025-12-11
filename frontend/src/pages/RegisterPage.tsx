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

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (e) {
      setError("Could not create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Create an account
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Start learning today
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
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
              {loading ? "Creating..." : "Create account"}
            </Button>
            <Typography color="text.secondary" align="center">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login">
                Sign in
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
