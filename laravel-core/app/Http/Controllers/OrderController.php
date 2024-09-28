<?php

namespace App\Http\Controllers;

use App\Models\Desk;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Commune;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
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
    public function import(Request $request)
    {
        $request->validate([
            'orders' => 'required|mimes:xls,xlsx'
        ]);
        
        Order::whereNull('confirmed_at')->delete();
        $orders = $request->file('orders');
        $filename = time() . '_' . $orders->getClientOriginalName();
        $orders->move(public_path('storage/orders'), $filename);
        $filePath = public_path('storage/orders/' . $filename);
    
        $data = Excel::toArray([], $filePath)[0];
        
        foreach($data as $index=>$order)
        {
            if($index==0)continue;
            

            $desk = Desk::where('reference', $order[9])->whereNull('deleted_by')->first();
            if(!$desk){
                throw new \Exception('Unkown desk "'.$order[9].'"');
            }
            $products = $order[6];
            
            try {
                // Extract phone numbers safely
                $phones = explode('/', $order[3]);
                $phone1 = $phones[0] ?? null;
                $phone2 = $phones[1] ?? null;
            
                $commune = Commune::where('name', $order[5])->first();
                $communeId = $commune ? $commune->id : null;
                
                
                $orderData = [
                    'name' => $order[0] ?? "NaN",
                    'phone' => $phone1,
                    'phone2' => $phone2,
                    'address' => $order[1] ?? "NaN",
                    'commune_id' => $communeId,
                    'total_price' => $order[7],
                    'delivery_fee' => 0,
                    'clean_price' => $order[7],
                    'intern_tracking' => $order[2],
                    'fragile' => true,
                    'stopdesk' => $order[12],
                    'desk_id' => $desk->id,
                    'created_by' => Auth::id(),
                    'updated_by' => Auth::id(),
                ];
                
                Order::create($orderData);
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }
        return redirect()->route('admins.investors.index')->with('success', 'Investor deleted successfully.');
    }
    
    /**
     * Display a listing of the resource.
     */
    public function imported()
    {
        return Inertia::render('Admins/Dashboard/Index', []);

    }

    /**
     * Display a listing of the resource.
     */
    public function save()
    {
        //
    }
}
