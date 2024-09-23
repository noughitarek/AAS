<?php

namespace App\Http\Controllers;

use App\Models\Desk;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Commune;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use PhpOffice\PhpSpreadsheet\IOFactory;
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
        $filePath = 'storage/orders/'.$filename;

        $spreadsheet = IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();
        $data = $sheet->toArray();
        print_r($data);
        exit;
        foreach($data as $index=>$order)
        {
            $desk = Desk::where('reference', $order[9])->whereNull('deleted_by')->first();
            $products = $ord[6];

            $orderData = [
                'name' => $order[0]??"NaN",
                'phone' => explode('/', $order[3])[0],
                'phone2' => explode('/', $order[3])[1]??null,
                'address' => $order[1]??"NaN",
                'commune_id' => Commune::where('name',$order[5])->first()->id,
                'total_price' =>  $order[7],
                'delivery_fee' => Commune::where('name',$order[5])->first()->Wilaya()->delivery_price,
                'clean_price' => $order[7]-Commune::where('name',$order[5])->first()->Wilaya()->delivery_price,
                'intern_tracking' => $order[2],
                'fragile' => true,
                'stopdesk' => $order[12],
                'desk_id' => $desk->id,
            ];
            
            Order::create($orderData);
            
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
