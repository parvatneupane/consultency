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
        Schema::create('applicant', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cus_id')->constrained('customer')->onDelete('cascade');
            $table->string('applied_city')->nullable();
            $table->string('applied_college')->nullable();
            $table->string('intake')->nullable();
            $table->integer('coe_charge')->nullable();

            $table->integer('documentation_charge')->nullable();
            $table->integer('coe_status')->default(0);
            $table->integer('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant');
    }
};
