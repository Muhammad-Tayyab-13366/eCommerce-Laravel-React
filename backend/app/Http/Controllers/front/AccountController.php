<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Jobs\SendWelcomEmail;
use App\Mail\WelcomeEmail;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    //

    public function register(Request $request){
        $rules = [
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required" 
        ];

        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()){
            return response()->json([
                "ststus" => "400",
                'errors' => $validator->errors()
            ]);

        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        SendWelcomEmail::dispatch($user);

        return response()->json([
            "status" => 200,
            "message" => "You have register successfully"
        ]);
    }

    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validator->passes()){
            if(Auth::attempt(["email" => $request->email, 'password' => $request->password])){
                $user = User::find(Auth::user()->id);
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    "status" => 200, // HTTP success
                    "token" =>  $token,
                    "id" => $user->id,
                    "name" => $user->name
                ], 200);
            }
            else{
                return response()->json([
                    "status" => 401, // HTTP 401 Unauthorized
                    "errors" => "Email/password is incorrect"
                ]);
            }
        }else {
            return response()->json([
                "status" => 400, // bad request error
                "errors" => $validator->errors()
            ]);
        }

    }

    public function getOrderDetail($id, Request $request)
    {
        $order = Order::where(["user_id" => $request->user()->id, 'id' => $id])
                    ->with('orderItems')->first();

        if($order == null)
        {
            return response()->json([
                "status" => 404, // not found
                "message" => "Order not found",
                'data' => []
            ], 404);
        }
        else 
        {
            return response()->json([
                "status" => 200,
                'data' => $order
            ]);
        }
                    

    }
}
