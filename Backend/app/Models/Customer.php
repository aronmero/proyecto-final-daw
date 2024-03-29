<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customers';

    protected $primaryKey = 'user_id';

    protected $fillable = [
        "user_id",
        "gender",
        'birth_date',
    ];

    public function reviews(){

        return $this->hasMany(Review::class, 'user_id');

    }

    public function user(){

        return $this->belongsTo(User::class, 'user_id', 'id');

    }

}
