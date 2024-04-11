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
        Schema::create('lendings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('borrower_id')->constrained('users');
            $table->foreignId('product_id')->constrained('products');
            $table->boolean('returned')->default(false);
            $table->dateTime('returned_at')->nullable();
            $table->dateTime('return_date');
            $table->dateTime('lending_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lendings');
    }
};
