<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fundings', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('total_amount');
            
            $table->unsignedInteger('products_percentage')->default(60);
            $table->unsignedInteger('advertising_percentage')->default(30);
            $table->unsignedInteger('workers_percentage')->default(10);

            $table->foreignId('product_id')->constrained('products');
            $table->foreignId('investor_id')->constrained('investors');

            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->foreignId('deleted_by')->nullable()->constrained('users');
            $table->softDeletes();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fundings');
    }
};
