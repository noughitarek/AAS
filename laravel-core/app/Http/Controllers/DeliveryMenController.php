<?php

namespace App\Http\Controllers;

use App\Models\Desk;
use Inertia\Inertia;
use App\Models\Wilaya;
use App\Models\Commune;
use App\Models\DeliveryMen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreDeliveryMenRequest;
use App\Http\Requests\UpdateDeliveryMenRequest;

class DeliveryMenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wilayas = Wilaya::all();
        
        return Inertia::render('Admins/DeliveryTeam/Index', [
            'wilayas' => $wilayas
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wilaya $wilaya)
    {
        $wilaya = Wilaya::with('communes')->find($wilaya->id);
        $desks = Desk::orderBy('id', 'desc')->get();

        $deliveryMens = DeliveryMen::with('updatedBy')->
            whereIn('commune_id',
                Commune::where('wilaya_id', $wilaya->id)
                ->pluck('id'))
            ->get();

        return Inertia::render('Admins/DeliveryTeam/Edit', [
            'deliveryMens' => $deliveryMens ,
            'wilaya' => $wilaya ,
            'desks' => $desks ,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Wilaya $wilaya)
    {
        DeliveryMen::whereIn('commune_id', $wilaya->communes->pluck('id'))->delete();

        $deliveryMenData = $request->input('deliveryMens', []);
        
        foreach ($deliveryMenData as $deliveryMen) {
            $communeId = $deliveryMen['commune_id'];
            $deskId = $deliveryMen['desk_id'];
            $phone = $deliveryMen['phone'];
            
            $dm = DeliveryMen::withTrashed()
            ->where('commune_id', $communeId)
            ->where('desk_id', $deskId)
            ->first();

            if($dm){
                $dm->restore();
                if ($dm->phone !== $phone) {
                    $dm->update([
                        'phone' => $phone,
                        'updated_by' => Auth::id(),
                    ]);
                }
            }else{
                DeliveryMen::create([
                    'phone' => $phone,
                    'commune_id' => $communeId,
                    'desk_id' => $deskId,
                    'created_by' => Auth::id(),
                    'updated_by' => Auth::id(),
                ]);
            }
        }
        return redirect()->route('admins.deliveryTeam.index')->with('success', 'Phones updated successfully.');
    }
}
