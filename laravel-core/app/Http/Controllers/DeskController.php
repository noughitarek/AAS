<?php

namespace App\Http\Controllers;

use App\Models\Desk;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDeskRequest;
use App\Http\Requests\UpdateDeskRequest;

class DeskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $desks = Desk::with('createdBy', 'updatedBy')->paginate(10);


        return Inertia::render('Admins/Desks/Index', [
            'desks' => $desks
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admins/Desks/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        $desk = Desk::create($data);
        return redirect()->route('admins.desks.index')->with('success', 'Desk created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Desk $desk)
    {
        return Inertia::render('Admins/Desks/Show', [
            'desk' => $desk
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Desk $desk)
    {
        return Inertia::render('Admins/Desks/Edit', [
            'desk' => $desk
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeskRequest $request, Desk $desk)
    {
        $data = $request->validated();
        $data['updated_by'] = auth()->id();
        $desk->update($data);
        return redirect()->route('admins.desks.index')->with('success', 'Desk updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Desk $desk)
    {
        $desk->deleted_by = auth()->id();
        $desk->save();
        $desk->delete();
        return redirect()->route('admins.desks.index')->with('success', 'Desk deleted successfully.');
    }
}
