<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::query()
            ->with('creator')
            ->withCount('enrollments');

        $user = $request->user();

        if (! $this->canManageCourses($user)) {
            $query->where('is_published', true);
        }

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('summary', 'like', "%{$search}%");
            });
        }

        if ($level = $request->query('level')) {
            $query->where('level', $level);
        }

        if ($tags = $request->query('tags')) {
            $tagsArray = explode(',', $tags);
            $query->whereJsonContains('tags', $tagsArray);
        }

        $courses = $query
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->paginate($request->integer('per_page', 10));

        return response()->json($courses);
    }

    public function show(Request $request, Course $course)
    {
        $course->load([
            'creator',
            'sections.lessons',
        ])->loadCount('enrollments');

        $user = $request->user();
        $isOwnerOrAdmin = $this->canManageCourse($user, $course);

        if (! $course->is_published && ! $isOwnerOrAdmin) {
            abort(403, 'Course is not published yet.');
        }

        $enrolled = $user
            ? $course->enrollments()->where('user_id', $user->id)->exists()
            : false;

        return response()->json([
            'course' => $course,
            'enrolled' => $enrolled,
            'can_edit' => $isOwnerOrAdmin,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $this->authorizeInstructor($user);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'level' => ['required', 'string'],
            'thumbnail_url' => ['nullable', 'url'],
            'duration_minutes' => ['nullable', 'integer', 'min:0'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string'],
            'is_published' => ['boolean'],
        ]);

        $slug = Str::slug($data['title']);

        if (Course::where('slug', $slug)->exists()) {
            $slug = "{$slug}-".Str::random(6);
        }

        $course = Course::create([
            ...$data,
            'slug' => $slug,
            'created_by' => $user->id,
            'is_published' => $data['is_published'] ?? false,
            'published_at' => ($data['is_published'] ?? false) ? now() : null,
        ]);

        return response()->json($course, 201);
    }

    public function update(Request $request, Course $course)
    {
        $user = $request->user();
        $this->authorizeInstructor($user, $course);

        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'level' => ['sometimes', 'string'],
            'thumbnail_url' => ['nullable', 'url'],
            'duration_minutes' => ['nullable', 'integer', 'min:0'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string'],
            'is_published' => ['sometimes', 'boolean'],
        ]);

        if (isset($data['title'])) {
            $newSlug = Str::slug($data['title']);
            if ($newSlug !== $course->slug && Course::where('slug', $newSlug)->exists()) {
                $newSlug .= '-'.Str::random(6);
            }
            $course->slug = $newSlug;
        }

        if (array_key_exists('is_published', $data)) {
            $course->published_at = $data['is_published'] ? now() : null;
        }

        $course->fill($data);
        $course->save();

        return response()->json($course->fresh(['creator', 'sections.lessons']));
    }

    private function authorizeInstructor(?\App\Models\User $user, ?Course $course = null): void
    {
        if (! $user || (! $user->isAdmin() && ! $user->isInstructor())) {
            abort(403, 'Only instructors or admins can manage courses.');
        }

        if ($course && $course->created_by !== $user->id && ! $user->isAdmin()) {
            abort(403, 'You do not own this course.');
        }
    }

    private function canManageCourse(?\App\Models\User $user, Course $course): bool
    {
        return $user && ($user->isAdmin() || $course->created_by === $user->id);
    }

    private function canManageCourses(?\App\Models\User $user): bool
    {
        return $user && ($user->isAdmin() || $user->isInstructor());
    }
}
