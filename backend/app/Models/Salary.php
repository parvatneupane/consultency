<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    //
   protected $table = 'salary';
   protected $fillable = [
       'id',
       'emp_id',
       'amount',
       'date',
       'remarks',
       'slip',
       'status'
   ];

   public function employee()
   {
       return $this->belongsTo(EmployeeModel::class);
   }
}
