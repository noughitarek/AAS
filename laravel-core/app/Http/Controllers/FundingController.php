<?php

namespace App\Http\Controllers;

use App\Models\Desk;
use Inertia\Inertia;
use App\Models\Funding;
use App\Models\Product;
use App\Models\Investor;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreFundingRequest;
use App\Http\Requests\UpdateFundingRequest;

class FundingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fundings = Funding::with('createdBy', 'updatedBy', 'investor', 'desk', 'product')->orderBy('id', 'desc')->paginate(10);
        return Inertia::render('Admins/Fundings/Index', [
            'fundings' => $fundings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $investors = Investor::orderBy('id', 'desc')->get();
        $desks = Desk::orderBy('id', 'desc')->get();
        $products = Product::orderBy('id', 'desc')->get();
        
        return Inertia::render('Admins/Fundings/Create', [
            'investors' => $investors,
            'desks' => $desks,
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFundingRequest $request)
    {
        $data = $request->validated();

        $data['products_part'] = ($data['products_percentage'] ?? 0) * ($data['total_amount'] ?? 0) / 100;
        $data['advertising_part'] = ($data['advertising_percentage'] ?? 0) * ($data['total_amount'] ?? 0) / 100;
        $data['workers_part'] = ($data['workers_percentage'] ?? 0) * ($data['total_amount'] ?? 0) / 100;
    

        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        $data['confirmed_at'] = now();
        
        $funding = Funding::create($data);
        return redirect()->route('admins.fundings.index')->with('success', 'Funding created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Funding $funding)
    {
        return Inertia::render('Admins/Fundings/Show', [
            'funding' => $funding,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Funding $funding)
    {
        $investors = Investor::orderBy('id', 'desc')->get();
        $desks = Desk::orderBy('id', 'desc')->get();
        $products = Product::orderBy('id', 'desc')->get();

        return Inertia::render('Admins/Fundings/Edit', [
            'funding' => $funding,
            'investors' => $investors,
            'desks' => $desks,
            'products' => $products,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFundingRequest $request, Funding $funding)
    {
        $data = $request->validated();
        
        $data['products_part'] = ($data['products_percentage'] ?? 0) * ($data['total_amount'] ?? 0) / 100;
        $data['advertising_part'] = ($data['advertising_percentage'] ?? 0) * ($data['total_amount'] ?? 0) / 100;
        $data['workers_part'] = ($data['workers_percentage'] ?? 0) * ($data['total_amount'] ?? 0) / 100;

        $data['updated_by'] = auth()->id();
        
        $funding->update($data);

        return redirect()->route('admins.fundings.index')->with('success', 'Funding updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Funding $funding)
    {
        $funding->deleted_by = auth()->id();
        $funding->save();
        $funding->delete();
        return redirect()->route('admins.fundings.index')->with('success', 'Funding deleted successfully.');
    }
}
