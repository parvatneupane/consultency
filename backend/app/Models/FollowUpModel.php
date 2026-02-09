<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FollowUpModel extends Model
{
    //
    protected $table = 'followup';
    protected $fillable = ['cus_id',  'message'];


 function customer(){
    return $this->belongsTo(CustomerModel::class);
}
}