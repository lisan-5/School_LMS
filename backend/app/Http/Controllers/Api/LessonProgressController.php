<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Http\Request;

class LessonProgressController extends Controller
{
    public function store(Request $request, Lesson $lesson)
    {
        $user = $request->user();

        $data = $request->validate([
            'watched_seconds' => ['nullable', 'integer', 'min:0'],
            'completed' => ['sometimes', 'boolean'],
        ]);

        $course = $lesson->section->course;

        // Ensure enrollment exists
        Enrollment::firstOrCreate(
            ['user_id' => $user->id, 'course_id' => $course->id],
            ['status' => 'active']
        );

        $progress = LessonProgress::updateOrCreate(
            [
                'user_id' => $user->id,
                'lesson_id' => $lesson->id,
            ],
            [
                'watched_seconds' => $data['watched_seconds'] ?? 0,
                'completed_at' => ($data['completed'] ?? false) ? now() : null,
            ]
        );

        $this->updateCourseProgress($user->id, $course);

        return response()->json($progress);
    }

    private function updateCourseProgress(int $userId, Course $course): void
    {
        $lessonIds = $course->lessons()->pluck('lessons.id');
        $totalLessons = $lessonIds->count();

        if ($totalLessons === 0) {
            return;
        }

        $completedCount = LessonProgress::where('user_id', $userId)
            ->whereIn('lesson_id', $lessonIds)
            ->whereNotNull('completed_at')
            ->count();

        $progress = round(($completedCount / $totalLessons) * 100, 2);

        Enrollment::updateOrCreate(
            ['user_id' => $userId, 'course_id' => $course->id],
            [
                'progress' => $progress,
                'status' => $progress >= 100 ? 'completed' : 'active',
                'last_accessed_at' => now(),
            ]
        );
    }
}
