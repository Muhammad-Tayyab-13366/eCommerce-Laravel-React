<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    public function orderItems(){
        return $this->hasMany(OrderItem::class);
    }

    protected function casts()
    {
        return [
            'created_at' => 'datetime:d M, Y'
        ];
    }
}
