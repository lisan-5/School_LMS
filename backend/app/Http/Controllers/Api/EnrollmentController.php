<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $enrollments = Enrollment::with('course.creator')
            ->where('user_id', $user->id)
            ->orderByDesc('updated_at')
            ->get();

        return response()->json($enrollments);
    }

    public function store(Request $request, Course $course)
    {
        $user = $request->user();

        if (! $course->is_published && ! $user->isAdmin() && $course->created_by !== $user->id) {
            abort(403, 'Course is not open for enrollment yet.');
        }

        $enrollment = Enrollment::firstOrCreate(
            [
                'user_id' => $user->id,
                'course_id' => $course->id,
            ],
            [
                'status' => 'active',
            ]
        );

        return response()->json($enrollment, 201);
    }
}
