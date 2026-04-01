<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Faq;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard', [
        'stats' => [
            'products'   => \App\Models\Product::count(),
            'categories' => \App\Models\Category::count(),
            'users'      => \App\Models\User::count(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('admin/dashboard/categories', CategoryController::class);
Route::resource('admin/dashboard/products', AdminProductController::class);
Route::resource('admin/dashboard/users', UserController::class);
Route::resource('admin/dashboard/faqs', FaqController::class)->only(['index', 'store', 'update', 'destroy']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/about', function () {
    return Inertia::render('About', [
        'faqs' => Faq::orderBy('order')->orderBy('id')->get(),
    ]);
});

// Route::get('/contact', function () {
//     return Inertia::render('Contact');
// });

Route::get('/products', [ProductController::class, 'index']);

Route::get('/products/category/{category}', [ProductController::class, 'showByCategory']);

Route::resource('/contact', ContactController::class);


// Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
// Route::post('/contact', [ContactController::class, 'create'])->name('contact.send');


require __DIR__ . '/auth.php';