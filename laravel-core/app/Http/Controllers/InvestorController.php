<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Investor;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvestorRequest;
use App\Http\Requests\UpdateInvestorRequest;

class InvestorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $investors = Investor::with('createdBy', 'updatedBy')->orderBy('id', 'desc')->paginate(10);

        return Inertia::render('Admins/Investors/Index', [
            'investors' => $investors
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admins/Investors/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvestorRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        $investor = Investor::create($data);
        return redirect()->route('admins.investors.index')->with('success', 'Investor created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Investor $investor)
    {
        return Inertia::render('Admins/Investors/Show', [
            'investor' => $investor
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Investor $investor)
    {
        return Inertia::render('Admins/Investors/Edit', [
            'investor' => $investor
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvestorRequest $request, Investor $investor)
    {
        $data = $request->validated();
        $data['updated_by'] = auth()->id();
        $investor->update($data);
        return redirect()->route('admins.investors.index')->with('success', 'Investor updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Investor $investor)
    {
        $investor->deleted_by = auth()->id();
        $investor->save();
        $investor->delete();
        return redirect()->route('admins.investors.index')->with('success', 'Investor deleted successfully.');
    }
}
