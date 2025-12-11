import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import { Loader, ErrorState } from "../components/State";
import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Alert,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

type Lesson = {
  id: number;
  title: string;
  is_preview: boolean;
  position: number;
};

type Section = {
  id: number;
  title: string;
  position: number;
  lessons: Lesson[];
};

type Course = {
  id: number;
  title: string;
  summary: string;
  description: string;
  level: string;
  price: string;
  sections: Section[];
  tags?: string[];
  enrollments_count?: number;
};

const CourseDetailPage = () => {
  const { slug } = useParams();
  const { user, token } = useAuth();
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      const res = await api.get(`/courses/${slug}`);
      return res.data as {
        course: Course;
        enrolled: boolean;
        can_edit: boolean;
      };
    },
    retry: 1,
  });

  const enrollMutation = useMutation({
    mutationFn: async () =>
      api.post(
        `/courses/${data?.course.id}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", slug] });
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      setErrorMsg(null);
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        "Failed to enroll. Please try again.";
      setErrorMsg(message);
    },
  });

  if (isLoading)
    return (
      <Box>
        <Loader />
      </Box>
    );
  if (error)
    return (
      <Box>
        <ErrorState message="Course not found." />
      </Box>
    );
  if (!data) return null;

  const { course, enrolled } = data;

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
            {course.level}
          </Typography>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            {course.summary}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Chip
              label={`${course.sections.length} sections`}
              color="primary"
            />
            <Chip
              label={`${course.sections.reduce(
                (acc, s) => acc + s.lessons.length,
                0
              )} lessons`}
              color="secondary"
            />
            <Chip
              label={`${course.enrollments_count ?? 0} learners`}
              color="info"
            />
            {course.tags?.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                icon={<LocalOfferIcon fontSize="small" />}
                label={tag}
                variant="outlined"
              />
            ))}
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
            <Typography
              variant="h5"
              fontWeight={700}
              color={Number(course.price) > 0 ? "secondary" : "success"}
            >
              {Number(course.price) > 0 ? `$${course.price}` : "Free"}
            </Typography>
            {!user ? (
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Login to enroll
              </Typography>
            ) : enrolled ? (
              <Chip label="Enrolled" color="success" sx={{ mt: 2 }} />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => enrollMutation.mutate()}
                disabled={enrollMutation.isPending}
                sx={{ mt: 2 }}
              >
                {enrollMutation.isPending ? "Enrolling..." : "Enroll now"}
              </Button>
            )}
            {errorMsg && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMsg}
              </Alert>
            )}
            {data.can_edit && (
              <Chip
                label="You own this course"
                color="warning"
                sx={{ mt: 2 }}
              />
            )}
          </Paper>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Curriculum
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {course.sections.map((section) => (
            <Grid item xs={12} md={6} key={section.id}>
              <Card elevation={1} sx={{ borderRadius: 2, mb: 2 }}>
                <CardHeader
                  title={
                    <Typography variant="h6">
                      {section.position}. {section.title}
                    </Typography>
                  }
                />
                <CardContent>
                  <Stack spacing={2}>
                    {section.lessons.map((lesson) => (
                      <Box
                        key={lesson.id}
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <SchoolIcon color="primary" />
                        <Typography>
                          {section.position}.{lesson.position} {lesson.title}
                        </Typography>
                        {lesson.is_preview && (
                          <Chip label="Preview" color="info" size="small" />
                        )}
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default CourseDetailPage;
