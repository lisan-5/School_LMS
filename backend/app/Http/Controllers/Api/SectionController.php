<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function store(Request $request, Course $course)
    {
        $user = $request->user();
        $this->authorizeInstructor($user, $course);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'integer', 'min:1'],
        ]);

        $section = $course->sections()->create([
            'title' => $data['title'],
            'position' => $data['position'] ?? ($course->sections()->max('position') + 1),
        ]);

        return response()->json($section, 201);
    }

    public function update(Request $request, Section $section)
    {
        $user = $request->user();
        $this->authorizeInstructor($user, $section->course);

        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'position' => ['sometimes', 'integer', 'min:1'],
        ]);

        $section->update($data);

        return response()->json($section);
    }

    private function authorizeInstructor(?\App\Models\User $user, Course $course): void
    {
        if (! $user || (! $user->isAdmin() && $course->created_by !== $user->id && ! $user->isInstructor())) {
            abort(403, 'Only the owner or admins can manage sections.');
        }
    }
}
