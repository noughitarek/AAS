<?php

namespace App\Http\Controllers;

use App\Models\Desk;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Commune;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\OrderProducts;
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
        $orders = Order::whereNotNull('confirmed_at')->with('createdBy', 'updatedBy', 'desk', 'commune.wilaya', 'orderProducts.product')->orderBy('id', 'desc')->paginate(9999);

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
                $phones = explode('/', $order[3]);
                $phone1 = $phones[0] ?? null;
                $phone2 = $phones[1] ?? null;
            
                $commune = Commune::with('wilaya')->where('name', $order[5])->first();
                if(!$commune){
                    throw new \Exception('Unkown commune "'.$order[5].'"');
                }
                $communeId = $commune ? $commune->id : null;
                
                
                $orderData = [
                    'name' => $order[0] ?? "NaN",
                    'phone' => $phone1,
                    'phone2' => $phone2,
                    'address' => $order[1] ?? "NaN",
                    'commune_id' => $communeId,
                    'total_price' => $order[7],
                    'delivery_fee' => $commune->wilaya->delivery_price,
                    'clean_price' => $order[7],
                    'intern_tracking' => $order[2],
                    'fragile' => true,
                    'stopdesk' => $order[12],
                    'desk_id' => $desk->id,
                    'created_by' => Auth::id(),
                    'updated_by' => Auth::id(),
                ];
                
                $orderDB = Order::create($orderData);

                $charactersToRemove = array("-", "/", "\\");
                $shouldBreak = false;
                foreach(explode('+', $order[6]) as $product)
                {
                    $product = trim(str_replace($charactersToRemove, "", $product));
                    $productQuantity = 1;
                    $productRow = null;
                    foreach(config('settings.quantities') as $quantity=>$label)
                    {
                        if($label != null)
                        {
                            if(strpos($product, $label) === 0)
                            {
                                $productQuantity = $quantity;
                                $productsName = trim(explode($label, $product)[1]);
                                $productRow = Product::where('name', 'like', '%'.$productsName.'%')->first();
                            }
                        }
    
                    }
                    if(!$productRow)
                    {
                        $productsName = $product;
                        $productRow = Product::where('name', 'like', '%'.$productsName.'%')->first();
                    }
                    if(!$productRow) throw new \Exception('Unkown product "'.$product.'"');
                    
                    OrderProducts::create([
                        'order_id' =>  $orderDB->id,
                        'product_id' => $productRow->id,
                        'quantity' => $productQuantity,
                    ]);
                }

            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }
        return redirect()->route('admins.orders.imported')->with('success', 'Investor deleted successfully.');
    }
    
    /**
     * Display a listing of the resource.
     */
    public function imported()
    {
        $orders = Order::whereNull('confirmed_at')
        ->with('createdBy', 'updatedBy', 'desk', 'commune.wilaya', 'orderProducts.product')->orderBy('id', 'desc')->paginate(9999);

        return Inertia::render('Admins/Orders/Imported', [
            'orders' => $orders
        ]);

    }

    /**
     * Display a listing of the resource.
     */
    public function save(Request $request)
    {
        foreach($request->all() as $orderID){
            $order = Order::find($orderID);
            if(!$order){
                throw new \Exception('Order "'.$orderID.'" not found');
            }
            $order->confirmed_at = now();
            $order->save();
        }
        
        return redirect()->route('admins.orders.index')->with('success', 'Orders uploaded successfully.');
    }
}
