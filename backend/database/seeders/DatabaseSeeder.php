<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        $instructor = User::factory()->create([
            'name' => 'Instructor Jane',
            'email' => 'instructor@example.com',
            'role' => 'instructor',
            'password' => bcrypt('password'),
        ]);

        $student = User::factory()->create([
            'name' => 'Student John',
            'email' => 'student@example.com',
            'role' => 'student',
            'password' => bcrypt('password'),
        ]);

        $course = Course::create([
            'title' => 'Laravel + React LMS Starter',
            'slug' => 'laravel-react-lms-starter',
            'summary' => 'Build and ship courses with Laravel API & React frontend.',
            'description' => 'An end-to-end starter showcasing auth, courses, enrollments, and progress tracking.',
            'level' => 'intermediate',
            'duration_minutes' => 180,
            'price' => 0,
            'is_published' => true,
            'published_at' => now(),
            'tags' => ['laravel', 'react', 'lms'],
            'created_by' => $instructor->id,
            'thumbnail_url' => 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
        ]);

        $section = $course->sections()->create([
            'title' => 'Getting Started',
            'position' => 1,
        ]);

        $section->lessons()->createMany([
            [
                'title' => 'Welcome',
                'content' => 'Welcome to the LMS starter course!',
                'position' => 1,
                'is_preview' => true,
                'duration_minutes' => 5,
            ],
            [
                'title' => 'API Overview',
                'content' => 'Learn how the Laravel API is structured.',
                'position' => 2,
                'duration_minutes' => 15,
            ],
            [
                'title' => 'Frontend Overview',
                'content' => 'Walk through the React frontend and data fetching.',
                'position' => 3,
                'duration_minutes' => 20,
            ],
        ]);

        Enrollment::create([
            'user_id' => $student->id,
            'course_id' => $course->id,
            'status' => 'active',
            'progress' => 0,
        ]);

        // Additional demo courses
        $demoCourses = [
            [
                'title' => 'TypeScript for React Developers',
                'slug' => 'typescript-for-react',
                'summary' => 'Type-safe React patterns, hooks, and API integration.',
                'description' => 'Covers TS fundamentals, advanced types, React patterns, and API typing with Axios/React Query.',
                'level' => 'intermediate',
                'duration_minutes' => 240,
                'price' => 49,
                'tags' => ['typescript', 'react', 'frontend'],
                'thumbnail_url' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
            ],
            [
                'title' => 'Backend APIs with Laravel',
                'slug' => 'backend-apis-with-laravel',
                'summary' => 'RESTful APIs, Sanctum auth, testing, and queues.',
                'description' => 'From routing and validation to Sanctum, queues, notifications, and deployment tips.',
                'level' => 'advanced',
                'duration_minutes' => 300,
                'price' => 79,
                'tags' => ['laravel', 'api', 'backend'],
                'thumbnail_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
            ],
            [
                'title' => 'Product Design for Engineers',
                'slug' => 'product-design-for-engineers',
                'summary' => 'UX heuristics, design systems, and rapid prototyping.',
                'description' => 'Learn how to structure screens, write UX copy, and ship cohesive experiences.',
                'level' => 'beginner',
                'duration_minutes' => 120,
                'price' => 0,
                'tags' => ['design', 'ux', 'product'],
                'thumbnail_url' => 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=800&q=80',
            ],
        ];

        foreach ($demoCourses as $index => $payload) {
            $c = Course::create([
                ...$payload,
                'created_by' => $instructor->id,
                'is_published' => true,
                'published_at' => now(),
            ]);

            $section1 = $c->sections()->create([
                'title' => 'Introduction',
                'position' => 1,
            ]);

            $section2 = $c->sections()->create([
                'title' => 'Deep Dive',
                'position' => 2,
            ]);

            $section1->lessons()->createMany([
                [
                    'title' => 'Welcome & Objectives',
                    'content' => 'Course overview and what you will build.',
                    'position' => 1,
                    'is_preview' => true,
                    'duration_minutes' => 5,
                ],
                [
                    'title' => 'Setup & Tooling',
                    'content' => 'Install prerequisites and set up your environment.',
                    'position' => 2,
                    'duration_minutes' => 12,
                ],
            ]);

            $section2->lessons()->createMany([
                [
                    'title' => 'Core Concepts',
                    'content' => 'Key ideas and patterns for this track.',
                    'position' => 1,
                    'duration_minutes' => 20,
                ],
                [
                    'title' => 'Hands-on Lab',
                    'content' => 'Apply what you learned in a guided exercise.',
                    'position' => 2,
                    'duration_minutes' => 25,
                ],
            ]);

            // Enroll demo student to the first extra course
            if ($index === 0) {
                Enrollment::create([
                    'user_id' => $student->id,
                    'course_id' => $c->id,
                    'status' => 'active',
                    'progress' => 0,
                ]);
            }
        }
    }
}
