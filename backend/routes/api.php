<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\LessonProgressController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\LessonController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/{course:slug}', [CourseController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::post('/courses', [CourseController::class, 'store']);
        Route::put('/courses/{course}', [CourseController::class, 'update']);

        // Curriculum management
        Route::post('/courses/{course}/sections', [SectionController::class, 'store']);
        Route::put('/sections/{section}', [SectionController::class, 'update']);
        Route::post('/sections/{section}/lessons', [LessonController::class, 'store']);
        Route::put('/lessons/{lesson}', [LessonController::class, 'update']);

        Route::get('/enrollments', [EnrollmentController::class, 'index']);
        Route::post('/courses/{course}/enroll', [EnrollmentController::class, 'store']);

        Route::post('/lessons/{lesson}/progress', [LessonProgressController::class, 'store']);
    });
});
