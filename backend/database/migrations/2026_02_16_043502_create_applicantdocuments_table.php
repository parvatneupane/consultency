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
        Schema::create('applicantdocuments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')->constrained('applicant')->onDelete('cascade');
            $table->string('document_title');
            $table->string('document');          
            $table->integer('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicantdocuments');
    }
};
