<?php

use App\Http\Controllers\DeskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FundingController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\InvestorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdvertisingController;
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
        Route::prefix('products')->name('products.')->group(function() {
            Route::get('/', [ProductController::class, 'index'])->name('index');
            Route::get('/create', [ProductController::class, 'create'])->name('create');
            Route::post('/create', [ProductController::class, 'store'])->name('store');
            Route::get('/{product}', [ProductController::class, 'show'])->name('show');
            Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('edit');
            Route::put('/{product}/edit', [ProductController::class, 'update'])->name('update');
            Route::delete('/{product}/delete', [ProductController::class, 'destroy'])->name('destroy');
        });
        Route::prefix('investors')->name('investors.')->group(function() {
            Route::get('/', [InvestorController::class, 'index'])->name('index');
            Route::get('/create', [InvestorController::class, 'create'])->name('create');
            Route::post('/create', [InvestorController::class, 'store'])->name('store');
            Route::get('/{investor}', [InvestorController::class, 'show'])->name('show');
            Route::get('/{investor}/edit', [InvestorController::class, 'edit'])->name('edit');
            Route::put('/{investor}/edit', [InvestorController::class, 'update'])->name('update');
            Route::delete('/{investor}/delete', [InvestorController::class, 'destroy'])->name('destroy');
        });
        Route::prefix('fundings')->name('fundings.')->group(function() {
            Route::get('/', [FundingController::class, 'index'])->name('index');
            Route::get('/create', [FundingController::class, 'create'])->name('create');
            Route::post('/create', [FundingController::class, 'store'])->name('store');
            Route::get('/{funding}', [FundingController::class, 'show'])->name('show');
            
            Route::post('/{funding}/purchase', [FundingController::class, 'purchase'])->name('purchase');

            Route::get('/{funding}/edit', [FundingController::class, 'edit'])->name('edit');
            Route::put('/{funding}/edit', [FundingController::class, 'update'])->name('update');
            Route::delete('/{funding}/delete', [FundingController::class, 'destroy'])->name('destroy');
        });
        Route::prefix('advertisings')->name('advertisings.')->group(function() {
            Route::get('/', [AdvertisingController::class, 'index'])->name('index');
            Route::post('/save', [AdvertisingController::class, 'save'])->name('save');
        });
        Route::prefix('orders')->name('orders.')->group(function() {
            Route::get('/', [OrderController::class, 'index'])->name('index');
            Route::post('/import', [OrderController::class, 'import'])->name('import');
        });
        Route::prefix('invoices')->name('invoices.')->group(function() {
            Route::get('/', [InvoiceController::class, 'index'])->name('index');
            Route::post('/import', [InvoiceController::class, 'import'])->name('import');
            Route::get('/imported', [InvoiceController::class, 'imported'])->name('imported');
            Route::post('/imported', [InvoiceController::class, 'save']);
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