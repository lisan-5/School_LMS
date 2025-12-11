import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SecurityIcon from "@mui/icons-material/Security";
import GroupIcon from "@mui/icons-material/Group";

const features = [
  {
    icon: <SchoolIcon color="primary" sx={{ fontSize: 40 }} />,
    title: "Structured learning",
    desc: "Track progress with sections and lessons.",
  },
  {
    icon: <GroupIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: "Instructor controls",
    desc: "Create courses, sections, lessons, and manage enrollments.",
  },
  {
    icon: <StarIcon color="warning" sx={{ fontSize: 40 }} />,
    title: "Progress tracking",
    desc: "Lesson-level completion rolls up to course progress.",
  },
  {
    icon: <SecurityIcon color="success" sx={{ fontSize: 40 }} />,
    title: "Auth & security",
    desc: "Sanctum-protected API with roles and ownership checks.",
  },
];

const HomePage = () => (
  <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 6 }}>
    <Container maxWidth="lg">
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ letterSpacing: 2 }}
          >
            Modern learning
          </Typography>
          <Typography variant="h2" fontWeight={800} gutterBottom>
            Build skills faster with guided tracks
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Curated courses, progress tracking, and instructor-led content to
            help you ship.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/courses"
            >
              Explore courses
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/pricing"
            >
              See pricing
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
            <Chip label="Laravel" color="primary" />
            <Chip label="React" color="secondary" />
            <Chip label="TypeScript" color="success" />
            <Chip label="Design" variant="outlined" />
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Featured track
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
              Full-stack Launchpad
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              API design, SPA auth, and production-ready patterns to go from
              idea to launch.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              component={RouterLink}
              to="/courses"
            >
              Start learning
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 10 }}>
        <Grid container spacing={4}>
          {features.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.title}>
              <Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent sx={{ textAlign: "center", py: 5 }}>
                  <Box sx={{ mb: 2 }}>{card.icon}</Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography color="text.secondary">{card.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  </Box>
);

export default HomePage;
