<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FundingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fudings = [
            [
                'total_amount' => 80000,
                'type' => 1,
                'investor_percentage' => 50,
                'products_percentage' => 50,
                'products_part' => 40000,
                'advertising_percentage' => 40,
                'advertising_part' => 32000,
                'workers_percentage' => 10,
                'workers_part' => 8000,
                'product_id' => 1,
                'desk_id' => 1,
                'investor_id' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'confirmed_at' => now(),
            ],
            [
                'total_amount' => 100000,
                'type' => 1,
                'investor_percentage' => 50,
                'products_percentage' => 50,
                'products_part' => 50000,
                'advertising_percentage' => 40,
                'advertising_part' => 40000,
                'workers_percentage' => 10,
                'workers_part' => 10000,
                'product_id' => 1,
                'desk_id' => 1,
                'investor_id' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'confirmed_at' => now(),
            ]
        ];
        DB::table('fundings')->insert($fudings);
    }
}
