<?php

namespace App\Listeners;

use App\Events\OrderStatusChanged;
use App\Mail\SendOrderSatusChnagedEmail;
use App\Models\Order;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class OrderSatusChangedEmail implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    
    public function __construct()
    {
        
    }

    /**
     * Handle the event.
     */
    public function handle(OrderStatusChanged $event): void
    {
        $order = Order::with('orderItems')->find($event->order->id);
        Mail::to($order->email)->send(new SendOrderSatusChnagedEmail($order));
    }
}
