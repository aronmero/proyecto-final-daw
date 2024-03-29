<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commerce extends Model
{
    use HasFactory;

    protected $table = 'commerces';

    protected $primaryKey = 'user_id';

    protected $fillable = [
        "user_id",
        "address",
        'description',
        'category_id',
        'verification_token_id',
        'verificated',
        'opening_hour',
        'closing_hour',
        'active',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function hashtags(){

        return $this->belongsToMany(Hashtag::class, 'commerces-hashtags', 'commerce_id', 'hashtag_id');

    }

    public function token(){

        return $this->belongsTo(Verification_token::class, 'verification_token_id');

    }

    public function user(){

        return $this->belongsTo(User::class, 'user_id', 'id');

    }

}
