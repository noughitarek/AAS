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
        Schema::create('invoice_orders', function (Blueprint $table) {
            $table->id();
            
            $table->string('name');
            $table->string('phone');
            $table->string('phone2')->nullable();
            $table->string('address');

            $table->foreignId('commune_id')->constrained('communes');
            $table->foreignId('order_id')->nullable()->constrained('orders');

            $table->integer('total_price');
            $table->integer('delivery_price');
            $table->integer('clean_price');
            $table->integer('recovered');
            $table->string('tracking')->nullable();
            $table->boolean('stopdesk')->default(0);
            
            $table->foreignId('invoice_id')->constrained('invoices');

            $table->string('facebook_conversation_id')->nullable();
            $table->text('products')->nullable();
            $table->text('reference')->nullable();
            $table->integer('delivery_extra')->default(0);
            $table->integer('desk_extra')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_orders');
    }
};
