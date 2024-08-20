<?php

namespace App\Http\Controllers\Admins;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admins/Dashboard/Index', []);
    }
}
