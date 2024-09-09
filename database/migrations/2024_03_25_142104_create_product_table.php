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
            $table->unsignedBigInteger('category');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('category')->references('id')->on('categories')->onDelete('cascade');
            $table->boolean('rentable')->default(true);
            $table->decimal('price', 8, 2)->default(0.00);
            $table->string('size')->nullable();
            $table->string('type')->nullable();
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
