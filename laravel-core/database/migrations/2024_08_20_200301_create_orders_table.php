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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('phone');
            $table->string('phone2')->nullable();
            $table->string('address');

            $table->foreignId('commune_id')->constrained('communes');

            $table->integer('total_price');
            $table->integer('delivery_fee');
            $table->integer('clean_price');

            $table->string('tracking')->nullable();
            $table->string('intern_tracking')->nullable();
            
            $table->boolean('fragile')->default(false);
            $table->boolean('stopdesk')->default(false);

            $table->foreignId('desk_id')->constrained('desks');

            $table->timestamp('validated_at')->nullable();
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('wilaya_at')->nullable();
            $table->timestamp('delivery_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('ready_at')->nullable();
            $table->timestamp('recovered_at')->nullable();
            $table->timestamp('returned_at')->nullable();
            $table->timestamp('returned_ready_at')->nullable();

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
        Schema::dropIfExists('orders');
    }
};
