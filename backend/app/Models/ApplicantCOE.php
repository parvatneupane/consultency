<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApplicantCOE extends Model
{
    //

    protected $table = 'applicantcoe';

    protected $fillable = [
        'applicant_id',
        'document',
        'remarks',
        'joined_school',
        'subject',
        'city',
        'status',
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }
}
