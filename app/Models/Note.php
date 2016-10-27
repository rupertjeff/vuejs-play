<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Note
 *
 * @package App\Models
 *
 * @property string $title
 * @property string $content
 *
 * @method static \Illuminate\Pagination\LengthAwarePaginator paginate($perPage = 15)
 */
class Note extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'title',
        'content',
    ];
}
