<?php

namespace Database\Seeders;

use App\Models\Wilaya;
use App\Models\Commune;
use Illuminate\Database\Seeder;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = 'laravel-core/database/seeds/algeria_cities.csv';
        
        if (($handle = fopen($csvFile, 'r')) !== FALSE) {
            fgetcsv($handle, 1000, ',');
            while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
                Wilaya::updateOrCreate(
                    ['id' => $data[5]],
                    [
                        'name' => $data[7],
                        'name_ar' => $data[6]
                    ]
                );
                /*Commune::updateOrCreate(
                    ['id' => $data[0]],
                    [
                        'name' => $data[2],
                        'name_ar' => $data[1],
                        'wilaya_id' => $data[5]
                    ]
                );*/
            }
            fclose($handle);
        } else {
            echo 'Error opening the file.';
        }
        
        $csvFile2 = 'laravel-core/database/seeds/communes.csv';
        
        if (($handle = fopen($csvFile2, 'r')) !== FALSE) {
            fgetcsv($handle, 2000, ',');
            while (($data = fgetcsv($handle, 2000, ',')) !== FALSE) {
                Commune::updateOrCreate(
                    ['name' => $data[0]],
                    [
                        'wilaya_id' => $data[1],
                        'name_ar' => $data[0]
                    ]
                );
            }
            fclose($handle);
        } else {
            echo 'Error opening the file.';
        }
    }
}
