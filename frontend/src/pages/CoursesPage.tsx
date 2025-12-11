import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Loader, ErrorState, EmptyState } from "../components/State";
import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Button,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

type Course = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  level: string;
  price: string;
  thumbnail_url?: string;
  enrollments_count?: number;
  tags?: string[];
};

const CoursesPage = () => {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [tags, setTags] = useState("");

  const queryParams = useMemo(
    () => ({
      search: search || undefined,
      level: level || undefined,
      tags: tags || undefined,
    }),
    [search, level, tags]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["courses", queryParams],
    queryFn: async () => {
      const res = await api.get("/courses", { params: queryParams });
      return res.data;
    },
    retry: 1,
  });

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
            Curated library
          </Typography>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Explore courses
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Browse all published courses or filter by topic.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Search courses"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              variant="outlined"
            />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Level</InputLabel>
              <Select
                value={level}
                label="Level"
                onChange={(e) => setLevel(e.target.value)}
              >
                <MenuItem value="">All levels</MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              size="small"
              variant="outlined"
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
              Learn faster
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
              Pick a track
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Filter by level and tags to find the right fit.
            </Typography>
          </Paper>
        </Box>
      </Paper>
      {isLoading && <Loader label="Loading courses..." />}
      {!isLoading && !data?.data && (
        <ErrorState message="Failed to load courses." />
      )}
      {!isLoading && data?.data?.length === 0 && (
        <EmptyState
          title="No courses yet"
          description="Check back soon for new content."
        />
      )}
      {!isLoading && data?.data?.length > 0 && (
        <Grid container spacing={3}>
          {data.data.map((course: Course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px) scale(1.02)" },
                }}
                component={RouterLink}
                to={`/courses/${course.slug}`}
              >
                {course.thumbnail_url && (
                  <CardMedia
                    component="img"
                    height="160"
                    image={course.thumbnail_url}
                    alt={course.title}
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <SchoolIcon color="primary" />
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      fontWeight={700}
                      textTransform="capitalize"
                    >
                      {course.level}
                    </Typography>
                  </Stack>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography color="text.secondary" mb={1}>
                    {course.summary}
                  </Typography>
                  <Stack direction="row" spacing={2} mb={1}>
                    <Chip
                      label={`${course.enrollments_count ?? 0} learners`}
                      size="small"
                    />
                    <Chip
                      label={
                        Number(course.price) > 0 ? `$${course.price}` : "Free"
                      }
                      color={Number(course.price) > 0 ? "secondary" : "success"}
                      size="small"
                    />
                  </Stack>
                  {course.tags && course.tags.length > 0 && (
                    <Stack direction="row" spacing={1} mt={1}>
                      {course.tags.slice(0, 3).map((tag) => (
                        <Chip
                          key={tag}
                          icon={<LocalOfferIcon fontSize="small" />}
                          label={tag}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CoursesPage;
