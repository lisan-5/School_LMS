<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Section;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function store(Request $request, Section $section)
    {
        $user = $request->user();
        $this->authorizeInstructor($user, $section);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
            'video_url' => ['nullable', 'url'],
            'resource_url' => ['nullable', 'url'],
            'duration_minutes' => ['nullable', 'integer', 'min:0'],
            'position' => ['nullable', 'integer', 'min:1'],
            'is_preview' => ['nullable', 'boolean'],
        ]);

        $lesson = $section->lessons()->create([
            ...$data,
            'position' => $data['position'] ?? ($section->lessons()->max('position') + 1),
        ]);

        return response()->json($lesson, 201);
    }

    public function update(Request $request, Lesson $lesson)
    {
        $user = $request->user();
        $this->authorizeInstructor($user, $lesson->section);

        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
            'video_url' => ['nullable', 'url'],
            'resource_url' => ['nullable', 'url'],
            'duration_minutes' => ['nullable', 'integer', 'min:0'],
            'position' => ['sometimes', 'integer', 'min:1'],
            'is_preview' => ['sometimes', 'boolean'],
        ]);

        $lesson->update($data);

        return response()->json($lesson);
    }

    private function authorizeInstructor(?\App\Models\User $user, Section $section): void
    {
        $course = $section->course;

        if (! $user || (! $user->isAdmin() && $course->created_by !== $user->id && ! $user->isInstructor())) {
            abort(403, 'Only the owner or admins can manage lessons.');
        }
    }
}
