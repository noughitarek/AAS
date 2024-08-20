<?php

namespace App\Http\Controllers\Admins;

use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class AdminDashboardController extends Controller
{
    public function index()
    {

        return Inertia::render('Dashboard/Index');
    }
}
