<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    //
    public function sizes()
    {
        return $this->belongsTo(Size::class, 'size_id'); // Assuming 'size_id' is the foreign key
    }
}
