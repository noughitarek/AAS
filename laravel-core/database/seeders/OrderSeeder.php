<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = [
            [
                'name' => 'Ahmed',
                'phone' => '0699894417',
                'phone2' => '0605586438',
                'address' => '9d bd jourdan, 75014 Paris',
                'commune_id' => 545,
                'total_price' => 1700,
                'delivery_fee' => 700,
                'clean_price' => 1000,
                'tracking' => 'EC518F240922427286',
                'intern_tracking' => 'Or13231',
                'fragile' => 0,
                'stopdesk' => 0,
                'desk_id' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        ];
        $order_products = [
            [
                'quantity' => 3,
                'product_id' => 1,
                'order_id'=> 1,
            ],
            [
                'quantity' => 3,
                'product_id' => 2,
                'order_id'=> 1,
            ],
        ];
        DB::table('orders')->insert($orders);
        DB::table('order_products')->insert($order_products);
    }
}
