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
            [
                'name' => 'Ultrasonic cleaner الغسالة الصغيرة',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'فريتوز صوليد ايطالية المشبك',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'بخاخ 1 لتر',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'بخاخ 250 ملل',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'باكي كسرونات ثقال موشتي',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'مسك أسود سعودي',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'زيت الإنشراح',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'بخاخ نصف لتر',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'زيت الحبة السوداء',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'زيت التيسير s',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'd proj',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'فريتوز b',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'كسرونات w',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'كولي المسمنة',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'بخاخ السدر',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'بخاخ المسك الأبيض',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'بخاخ ربع لتر',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'كريمة ل ذ',
                'reference' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        ];
        DB::table('products')->insert($products);
    }
}
