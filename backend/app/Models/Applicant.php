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
    'applied_college',
    'intake',
    'coe_charge',
    'documentation_charge',
    'remarks',
    'status',
    ];

    public function customer()
    {
        return $this->belongsTo(CustomerModel::class);
    }
    public function documents()
    {
        return $this->hasMany(ApplicantDocument::class);
    }
    public function coe()
    {
        return $this->hasOne(ApplicantCOE::class);
    }
}
