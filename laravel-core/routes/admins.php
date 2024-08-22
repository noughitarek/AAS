<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryMenController;
use App\Http\Controllers\TrackingMessagesController;
use App\Http\Controllers\AdminsAuth\PasswordController;
use App\Http\Controllers\AdminsAuth\AuthenticatedSessionController;


Route::prefix("admins")->name('admins.')->group(function () {
    Route::middleware(['auth'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('desks')->name('desks.')->group(function() {
            Route::get('/', [DeskController::class, 'index'])->name('index');
            Route::get('/create', [DeskController::class, 'create'])->name('create');
            Route::post('/create', [DeskController::class, 'store'])->name('store');
            Route::get('/{desk}', [DeskController::class, 'show'])->name('show');
            Route::get('/{desk}/edit', [DeskController::class, 'edit'])->name('edit');
            Route::put('/{desk}/edit', [DeskController::class, 'update'])->name('update');
            Route::delete('/{desk}/delete', [DeskController::class, 'destroy'])->name('destroy');
        });

        Route::prefix("delivery-team")->name('deliveryTeam.')->controller(DeliveryMenController::class)->group(function(){
            Route::get('', "index")->name('index');
            Route::get('{wilaya}', "edit")->name('edit');
            Route::post('{wilaya}', "update");
        });
        Route::prefix("tracking-messages")->name('trackingMessages.')->controller(TrackingMessagesController::class)->group(function(){
            Route::get('', "index")->name('index');
            Route::post('', "save")->name('save');
        });

        Route::prefix('users')->name('users.')->group(function() {
            Route::get('/', [UserController::class, 'index'])->name('index');
            Route::get('/create', [UserController::class, 'create'])->name('create');
            Route::post('/create', [UserController::class, 'store'])->name('store');
            Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
            Route::post('/{user}/update', [UserController::class, 'update'])->name('update');
            Route::delete('/{user}/delete', [UserController::class, 'destroy'])->name('destroy');
        });

        Route::get('/settings', [SettingController::class, 'index'])->name('settings');
        Route::post('/settings', [SettingController::class, 'store'])->name('settings.save');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::put('password', [PasswordController::class, 'update'])->name('password.update');
        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    });

    Route::middleware('guest')->group(function () {
        Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
        Route::post('login', [AuthenticatedSessionController::class, 'store']);
    });
});