<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DeskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $desks = [
            [
                'name' => 'Packers Alger',
                'reference' => "desk1",
                'from_stock' => true,
                'ecotrack_idf' => Str::random(10),
                'ecotrack_token' => Str::random(50),
                'created_by' => 1,
                'updated_by' => 1,
                'deleted_by' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Rb Livraison Alger',
                'reference' => "desk2",
                'from_stock' => true,
                'ecotrack_idf' => Str::random(10),
                'ecotrack_token' => Str::random(50),
                'created_by' => 1,
                'updated_by' => 1,
                'deleted_by' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Pdex Alger',
                'reference' => null,
                'from_stock' => true,
                'ecotrack_idf' => Str::random(10),
                'ecotrack_token' => Str::random(50),
                'created_by' => 1,
                'updated_by' => 1,
                'deleted_by' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];
        DB::table('desks')->insert($desks);
    }
}
