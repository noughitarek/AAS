<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::with('createdBy', 'updatedBy')->orderBy('id', 'desc')->get();

        return Inertia::render('Admins/Dashboard/Index');
    }
    public function investor_index()
    {
        return Inertia::render('Investors/Dashboard/Index');
    }
}
