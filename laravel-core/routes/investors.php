<?php 

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvestorsProfileController;
use App\Http\Controllers\InvestorsAuth\PasswordController;
use App\Http\Controllers\InvestorsAuth\AuthenticatedSessionController;


Route::prefix("investors")->name('investors.')->group(function () {
    Route::middleware(['auth:investor'])->group(function () {

        Route::get('/', [DashboardController::class, 'investor_index'])->name('dashboard');
        
        Route::get('/profile', [InvestorsProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [InvestorsProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [InvestorsProfileController::class, 'destroy'])->name('profile.destroy');

        Route::put('password', [PasswordController::class, 'update'])->name('password.update');
        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    });
    Route::middleware('guest:investor')->group(function () {
        Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
        Route::post('login', [AuthenticatedSessionController::class, 'store']);
    });
});