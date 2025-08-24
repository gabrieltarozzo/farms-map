<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Farm extends Model {
  protected $fillable=['name','owner','crop','area_ha','lat','lng','city','state'];
  protected $casts=['lat'=>'float','lng'=>'float','area_ha'=>'float'];
}