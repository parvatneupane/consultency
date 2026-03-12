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
        Schema::create('applicantcoe', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')->constrained('applicant')->onDelete('cascade');
            $table->string('document')->nullable();
            $table->string('joined_school')->nullable();
            $table->string('subject')->nullable();
            $table->string('city')->nullable();
            $table->string('contact')->nullable();
            $table->string('remarks')->nullable();
            $table->string('status')->default('Pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicantcoe');
    }
};
