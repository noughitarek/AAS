<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Commune;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\InvoiceOrders;
use App\Http\Controllers\Controller;
use App\Models\InvoiceOrderProducts;
use Maatwebsite\Excel\Facades\Excel;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoice::with('desk')
        ->orderBy('id', 'desc')
        ->paginate(9999);
        
        return Inertia::render('Admins/Invoices/Index', [
            'invoices' => $invoices
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function import(Request $request)
    {
        $request->validate([
            'invoice' => 'required|mimes:xls,xlsx'
        ]);

        $invoice = $request->file('invoice');
        $filename = time() . '_' . $invoice->getClientOriginalName();
        $invoice->move(public_path('storage/invoices'), $filename);
        $filePath = public_path('storage/invoices/' . $filename);
    
        $data = Excel::toArray([], $filePath)[0];
        
        $invoiceDB = new Invoice([]);
        $invoiceDB->save();
        
        $total_amount = 0;
        $total_orders = 0;

        foreach($data as $index=>$invoice)
        {
            if($index<=1)continue;

            $total_orders += 1;
            $total_amount += ((int)$invoice[11]-(int)$invoice[18]);

            $commune = Commune::where('name', $invoice[4])->first();
            if(!$commune){
                throw new \Exception('Commune name "'.$invoice[4].'" not found in database');
            }
            $orderId = Order::where('tracking', $invoice[0])->first() ?? null;
            if($orderId != null)
            {
                $orderId = $orderId->id;
            }
            $order = new InvoiceOrders([
                'name' => $invoice[2],
                'phone' => explode('/', $invoice[3])[0],
                'phone2' => explode('/', $invoice[3])[1]??null,
                'address' => 'n/a',
                'commune_id' => $commune->id,
                'total_price' => (int)$invoice[11],
                'delivery_price' => (int)$invoice[18],
                'clean_price' => ((int)$invoice[11]-(int)$invoice[18]),
                'recovered' => (int)$invoice[19],
                'tracking' => $invoice[0],
                'order_id' => $orderId,
                'stopdesk' => $invoice[21]=="Stop Desk",
                'facebook_conversation_id' => "n",
                'invoice_id' => $invoiceDB->id,
                'reference' => $invoice[1],
                'products' => $invoice[1]
            ]);
            $order->save();

            $charactersToRemove = array("-", "/", "\\");
            $shouldBreak = false;
            foreach(explode('+', $order->products) as $product)
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
                
                InvoiceOrderProducts::create([
                    'order_id' =>  $order->id,
                    'product_id' => $productRow->id,
                    'quantity' => $productQuantity,
                ]);
            }

        }
        
        $invoiceDB->total_orders = $total_orders;
        $invoiceDB->total_amount = $total_amount;
        $invoiceDB->save();

        return redirect()->route('admins.invoices.index')->with('success', 'Invoice created successfully.');
    }
}
