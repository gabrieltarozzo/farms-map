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
            'city' => 'Brasilia',
            'state' => 'DF',
        ]);

        Farm::create([
            'name' => 'Fazenda Lago Sul',
            'owner' => 'Carlos Pereira',
            'crop' => 'Soja',
            'area_ha' => 120,
            'lat' => -15.7825,
            'lng' => -47.9350,
            'city' => 'Brasilia',
            'state' => 'DF',
        ]);

        Farm::create([
            'name' => 'Fazenda Ipê Amarelo',
            'owner' => 'Ana Santos',
            'crop' => 'Milho',
            'area_ha' => 180,
            'lat' => -15.7778,
            'lng' => -47.9210,
            'city' => 'Brasilia',
            'state' => 'DF',
        ]);

        Farm::create([
            'name' => 'Fazenda Buriti',
            'owner' => 'Rafael Costa',
            'crop' => 'Algodão',
            'area_ha' => 90,
            'lat' => -15.7852,
            'lng' => -47.9270,
            'city' => 'Brasília',
            'state' => 'DF',
        ]);

        Farm::create([
            'name' => 'Fazenda Veredas',
            'owner' => 'Beatriz Lima',
            'crop' => 'Feijão',
            'area_ha' => 140,
            'lat' => -15.7745,
            'lng' => -47.9348,
            'city' => 'Brasília',
            'state' => 'DF',
        ]);
    
    }
}
