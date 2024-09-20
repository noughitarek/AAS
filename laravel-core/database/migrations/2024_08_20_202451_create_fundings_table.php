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
            $table->unsignedInteger('type');
            $table->unsignedInteger('investor_percentage')->default(50);            
            
            $table->unsignedInteger('products_percentage')->default(60);
            $table->unsignedBigInteger('products_part');

            $table->unsignedInteger('advertising_percentage')->default(30);
            $table->unsignedBigInteger('advertising_part');
            
            $table->unsignedInteger('workers_percentage')->default(10);
            $table->unsignedBigInteger('workers_part');
            
            $table->foreignId('product_id')->constrained('products');
            $table->foreignId('desk_id')->constrained('desks');
            $table->foreignId('investor_id')->constrained('investors');

            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->foreignId('deleted_by')->nullable()->constrained('users');
            $table->softDeletes();            

            $table->timestamp('confirmed_at')->nullabla();

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
