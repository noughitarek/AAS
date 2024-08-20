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
        Schema::create('advertising_fundings', function (Blueprint $table) {
            $table->id();
            
            $table->integer("amount");
            $table->foreignId('advertising_id')->constrained('advertisings');
            $table->foreignId('funding_id')->constrained('fundings');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advertising_fundings');
    }
};
