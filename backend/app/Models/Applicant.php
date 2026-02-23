<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    //
    protected $table = 'applicant';
    protected $fillable = [
    'cus_id',
    'applied_city',
    'applied_colllege',
    'coe_charge',
    'documentation_charge',
    'coe_status',
    'status',
    ];

    public function customer()
    {
        return $this->belongsTo(CustomerModel::class);
    }
}
