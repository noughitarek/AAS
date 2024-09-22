<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('createdBy', 'updatedBy', 'desk', 'commune.wilaya', 'orderProducts.product')->orderBy('id', 'desc')->paginate(10);

        return Inertia::render('Admins/Orders/Index', [
            'orders' => $orders
        ]);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function import()
    {
        //
    }
    
    /**
     * Display a listing of the resource.
     */
    public function save()
    {
        //
    }
}
