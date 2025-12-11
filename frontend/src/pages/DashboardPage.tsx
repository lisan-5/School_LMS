import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import ProgressBar from "../components/ProgressBar";
import { Loader, EmptyState, ErrorState } from "../components/State";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Paper,
  Tooltip,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SchoolIcon from "@mui/icons-material/School";

const DashboardPage = () => {
  const { token } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const res = await api.get("/enrollments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    retry: 1,
  });

  const stats = useMemo(() => {
    if (!data) return { active: 0, completed: 0 };
    const completed = data.filter((e: any) => e.status === "completed").length;
    return { active: data.length - completed, completed };
  }, [data]);

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Box>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ letterSpacing: 2 }}
          >
            Your learning
          </Typography>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Track progress and jump back in.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Chip
              icon={<TrendingUpIcon />}
              label={`Active: ${stats.active}`}
              color="primary"
            />
            <Chip
              icon={<EmojiEventsIcon />}
              label={`Completed: ${stats.completed}`}
              color="success"
            />
          </Stack>
        </Box>
        <Box>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 3,
              minWidth: 220,
              textAlign: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Tip
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
              Keep the streak
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Complete at least one lesson per day.
            </Typography>
          </Paper>
        </Box>
      </Paper>

      {isLoading && <Loader label="Loading your courses..." />}
      {!isLoading && data === undefined && (
        <ErrorState message="Could not load enrollments." />
      )}
      {!isLoading && data?.length === 0 && (
        <EmptyState
          title="No enrollments yet"
          description="Enroll in a course to get started."
        />
      )}
      {!isLoading && data?.length > 0 && (
        <Grid container spacing={3}>
          {data.map((enrollment: any) => (
            <Grid item xs={12} sm={6} md={4} key={enrollment.id}>
              <Card elevation={4} sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <SchoolIcon color="primary" />
                    <Typography variant="h6" fontWeight={700}>
                      {enrollment.course.title}
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary" mb={1}>
                    {enrollment.course.summary}
                  </Typography>
                  <Stack direction="row" spacing={2} mb={1}>
                    <Tooltip title="Status">
                      <Chip
                        label={enrollment.status}
                        color={
                          enrollment.status === "completed"
                            ? "success"
                            : "primary"
                        }
                        size="small"
                      />
                    </Tooltip>
                    <Tooltip title="Progress">
                      <Chip
                        label={`${enrollment.progress}%`}
                        color="info"
                        size="small"
                      />
                    </Tooltip>
                  </Stack>
                  <ProgressBar value={enrollment.progress} />
                  <Stack direction="row" spacing={1} mt={2}>
                    <Chip
                      label={`Sections: ${
                        enrollment.course.sections?.length ?? 0
                      }`}
                      variant="outlined"
                      size="small"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DashboardPage;
