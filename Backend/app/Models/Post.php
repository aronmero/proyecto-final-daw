<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $fillable = [
        'image',
        'title',
        'description',
        'post_type_id',
        'start_date',
        'end_date',
        'schedule',
        'active',
    ];

    public function post_type(){

        return $this->belongsTo(Post_type::class, 'post_type_id');

    }

    public function hashtags(){

        return $this->belongsToMany(Hashtag::class, 'posts-hashtags', 'post_id', 'hashtag_id');

    }

    public function users(){

        return $this->belongsToMany(User::class, 'users-posts', 'post_id', 'user_id');

    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'element');
    }

}
