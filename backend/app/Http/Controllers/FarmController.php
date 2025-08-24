<?php
namespace App\Http\Controllers;
use App\Models\Farm;
use Illuminate\Http\Request;

class FarmController extends Controller {
  public function index(Request $r) {
    $q = Farm::query();
    if ($bbox = $r->query('bbox')) {
      [$minLat,$minLng,$maxLat,$maxLng] = array_map('floatval', explode(',', $bbox));
      $q->whereBetween('lat',[$minLat,$maxLat])->whereBetween('lng',[$minLng,$maxLng]);
    }
    return $q->limit(500)->get();
  }
  public function store(Request $r) {
    $data = $r->validate([
      'name'=>'required','owner'=>'nullable','crop'=>'nullable',
      'area_ha'=>'nullable|numeric','lat'=>'required|numeric','lng'=>'required|numeric',
      'city'=>'nullable','state'=>'nullable|size:2'
    ]);
    return Farm::create($data);
  }
}