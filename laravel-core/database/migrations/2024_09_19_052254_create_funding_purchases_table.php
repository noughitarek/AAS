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
        Schema::create('funding_purchases', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('purchase_amount');
            $table->unsignedBigInteger('purchase_quantity');
            $table->foreignId('funding_id')->constrained('fundings');
            $table->timestamp('purchased_at');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('funding_purchases');
    }
};
