<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class InvestorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $investors = [
            [
                'name' => 'Ahmed',
                'email' => 'investor@gmail.com',
                'password' => Hash::make('password'),
                'permissions' => '',
                'created_by' => 1,
                'updated_by' => 1,
            ],
        ];
        DB::table('investors')->insert($investors);
    }
}
