<?php

namespace App\Http\Controllers;

use App\Models\Funding;
use App\Http\Requests\StoreFundingRequest;
use App\Http\Requests\UpdateFundingRequest;

class FundingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFundingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Funding $funding)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Funding $funding)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFundingRequest $request, Funding $funding)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Funding $funding)
    {
        //
    }
}
