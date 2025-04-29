<?php

namespace App\Jobs;

use App\Mail\WelcomeEmail;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendWelcomEmail implements ShouldQueue
{
    use Queueable;

    protected $userData;
    /**
     * Create a new job instance.
     */
    public function __construct($user)
    {
        $this->userData = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->userData->email)->send(new WelcomeEmail($this->userData));
    }
}
