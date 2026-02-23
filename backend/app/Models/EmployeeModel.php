<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeModel extends Model
{
    use HasFactory;

    protected $table = 'employees';

    protected $fillable = [
        'user_id',
        'name',
        'address',
        'phone',
        'designation',
        'monthly_salary',
        'remarks',
        'pan_scan',
        'document_scan',
        
    ];

    protected $casts = [
        'monthly_salary' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function salary(){
        return $this->hasMany(Salary::class);
    }
  
}
