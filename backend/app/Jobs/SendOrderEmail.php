<?php

namespace App\Jobs;

use App\Mail\SendOrderEmail as MailSendOrderEmail;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendOrderEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $orderId;

    /**
     * Create a new job instance.
     */
    public function __construct($orderId)
    {
        $this->orderId = $orderId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info("Processing order ID: " . $this->orderId);

        $order = Order::with('orderItems')->find($this->orderId);
        Log::info("Order Data: " . $order);
        if ($order && $order->email) {
            Mail::to($order->email)->send(new MailSendOrderEmail($order));
            Log::info("Order email sent to " . $order->email);
        } else {
            Log::warning("Order not found or email missing for ID: " . $this->orderId);
        }
    }
}
