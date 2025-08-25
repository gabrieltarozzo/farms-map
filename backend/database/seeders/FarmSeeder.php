<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Farm;

class FarmSeeder extends Seeder
{
    public function run(): void
    {
        Farm::create([
            'name' => 'Fazenda Boa Vista',
            'owner' => 'José da Silva',
            'crop' => 'Soja',
            'area_ha' => 150,
            'lat' => -16.6869,
            'lng' => -49.2648,
            'city' => 'Goiânia',
            'state' => 'GO',
        ]);

        Farm::create([
            'name' => 'Fazenda Santa Maria',
            'owner' => 'Maria Oliveira',
            'crop' => 'Milho',
            'area_ha' => 200,
            'lat' => -15.7801,
            'lng' => -47.9292,
            'city' => 'Brasília',
            'state' => 'DF',
        ]);
    }
}
