<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    
   /* public function up(): void
    {
        Schema::create('farms', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    } */

        public function up(): void {
    Schema::create('farms', function (Blueprint $t) {
        $t->id();
        $t->string('name');
        $t->string('owner')->nullable();
        $t->string('crop')->nullable();
        $t->decimal('area_ha',10,2)->nullable();
        $t->decimal('lat',10,7);
        $t->decimal('lng',10,7);
        $t->string('city')->nullable();
        $t->string('state',2)->nullable();
        $t->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farms');
    }
};
