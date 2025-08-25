<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Usuário fake
        // \App\Models\User::factory(10)->create();

        // Chamando o FarmSeeder
        $this->call(FarmSeeder::class);
    }
}