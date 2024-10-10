<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Commune;
use App\Models\Invoice;
use Illuminate\Http\Request;
use App\Models\InvoiceOrders;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoice::with('createdBy', 'updatedBy', 'desk')
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
        
        foreach($data as $index=>$invoice)
        {
            if($index<=1)continue;

            $commune = Commune::where('name', $invoice[4])->first();
            if(!$commune){
                throw new \Exception('Commune name "'.$invoice[4].'" not found in database');
            }

            $order = new InvoiceOrders([
                'name' => $invoice[2],
                'phone' => explode('/', $invoice[3])[0],
                'phone2' => explode('/', $invoice[3])[1]??null,
                'address' => 'n/a',
                'commune' => $commune->id,
                'total_price' => (int)$invoice[11],
                'delivery_price' => (int)$invoice[18],
                'clean_price' => ((int)$invoice[11]-(int)$invoice[18]),
                'recovered' => (int)$invoice[19],
                'tracking' => $invoice[0],
                'stopdesk' => $invoice[21]=="Stop Desk",
                'facebook_conversation_id' => "n",
                'invoice' => $invoiceDB->id,
                'reference' => $invoice[1],
                'products' => $invoice[6]
            ]);
        }
        exit;
    }

    public function imported()
    {
        //
    }

    public function save(Request $request)
    {

    }
}
