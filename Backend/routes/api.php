<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommercesController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\FollowersController;
use App\Http\Controllers\HashtagsController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\MunicipalitiesController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\UsersController;
use App\Models\Follower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('post', PostsController::class)->except(['index']);

    Route::apiResource('comment', CommentsController::class)->except(['index', 'replies']);
    Route::get('comment/{id}/replies', [CommentsController::class , 'replies']);
    Route::apiResource('review', ReviewsController::class)->except(['index']);
    Route::apiResource('hashtag', HashtagsController::class)->except(['show', 'update', 'destroy']);
    Route::post('hashtag/trending', [HashtagsController::class, 'populares']);
    Route::apiResource('user', UsersController::class)->except(['index', 'store', 'posts']);
    Route::get('profile', [UsersController::class,'profile']);
    Route::get('user/{username}/posts', [UsersController::class , 'posts']);
    Route::get('user/{username}/events', [UsersController::class, 'events']);
    //Route::apiResource('post_type', Post_typesController::class)->except(['show', 'update', 'destroy', 'store']);
// Route::apiResource('notification', NotificationsController::class)->except(['index', 'destroy']);
    Route::get('follower', [FollowersController::class , 'showFollowers']);
    Route::post('follow/{id}', [FollowersController::class , 'follow']);
    Route::post('favorite/{id}', [FollowersController::class , 'favorite']);
    Route::get('follows', [FollowersController::class , 'showFollows']);
    Route::get('home', [PostsController::class , 'home']);
    Route::get('search', [SearchController::class, 'search']);
    Route::apiResource('notifications', NotificationsController::class)->only('index');
    Route::delete('notifications/{id}', [NotificationsController::class , 'destroy']);
    Route::post('notifications/{id}', [NotificationsController::class , 'check']);

    Route::post('logout', [AuthController::class, 'logout']);

    /** Añadido por David */
    Route::get('home_todos', [PostsController::class, 'home_todos']);
    Route::get('home_calendario', [PostsController::class, 'home_calendario']);
});

Route::apiResource('municipality', MunicipalitiesController::class)->only('index');
Route::apiResource('category', CategoryController::class)->only('index');
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);


//gogle login 
Route::get('/login-google', function () {
    return Socialite::driver('google')->redirect();
});
 
Route::get('/google-callback', function () {
    $user = Socialite::driver('google')->user();
    dd($user);
});
