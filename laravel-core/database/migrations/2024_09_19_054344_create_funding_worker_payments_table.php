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
        Schema::create('funding_worker_payments', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('paid_amount');
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
        Schema::dropIfExists('funding_worker_payments');
    }
};
