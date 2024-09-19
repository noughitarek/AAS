<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'صابون المسك الأسود',
                'reference' => 'souk0054',
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'باكي مقلات زوج ثقال',
                'reference' => 'suk-16',
                'created_by' => 1,
                'updated_by' => 1,
            ],
        ];
        DB::table('products')->insert($products);
    }
}
