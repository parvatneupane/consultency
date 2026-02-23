<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantDocument extends Model
{
    use HasFactory;

    protected $table = 'applicantdocuments';

    protected $fillable = [
        'applicant_id',
        'document_title',
        'document',
        'status',
    ];

    protected $casts = [
        'status' => 'integer',
    ];

   
    public function applicant()
    {
        return $this->belongsTo(Applicant::class, 'applicant_id');
    }
}