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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->string('description');
            $table->string('product_image');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->boolean('rentable');
            $table->dateTime('return_date')->nullable();
            $table->dateTime('rental_started')->nullable();
            $table->unsignedBigInteger('rented_by')->nullable();
            $table->foreign('rented_by')->references('id')->on('users')->onDelete('cascade');
            $table->boolean('checked')->nullable();
            $table->string('category');
            $table->boolean('returned')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
