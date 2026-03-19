<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            //branches
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->nullable();
            $table->string('name');
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('designation')->nullable();
            $table->decimal('monthly_salary', 10, 2)->nullable();
            $table->string('remarks')->nullable();
            $table->string('pan_scan')->nullable();
            $table->string('document_scan')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
