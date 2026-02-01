<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerModel extends Model
{
    //
    protected $table = 'customer';

    protected $fillable = [
        'name',
        'email',
        'address',
        'phone',
        'father_name',
        'mother_name',
        'father_phone',
        'mother_phone',
        'gender',
        'education',
        'course',
        'study_time',
        'desire_city',
        'referral_type',
        'referral_name',
        'referral_phone',
        'remarks',
        'status',
    ];

}
