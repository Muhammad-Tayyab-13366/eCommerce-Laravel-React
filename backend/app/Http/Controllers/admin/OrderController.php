<?php

namespace App\Http\Controllers\admin;

use App\Events\OrderStatusChanged;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //

    public function index(){
        $order = Order::orderBy('created_at', 'DESC')->get();

        return response()->json([
            "status" => 200,
            "data" => $order
        ]);
    }

    public function orderDetail($id){
        $order = Order::where('id', $id)->with( 'orderItems.product')->first();
        
        if(empty($order)){
            return response()->json([
                "status" => 404, // not found
                "message" => "Order not found",
                "data" => []
            ]);
        }

        return response()->json([
            "status" => 200,
            "data" => $order
        ]);
    }

    public function updateOrder($id, Request $request){
        $order = Order::find($id);

        if($order == null){
            return response()->json([
                "status" => 404,
                "message" => "Order not found"
            ], 400);
        }
        $order->status = $request->status;
        $order->payment_status = $request->payment_status;
        $order->save();

        event(new OrderStatusChanged($order));
        return response()->json([
            "status" => 200,
            "data" => $order,
            "message" => "Order updated successfully."
        ]);
    }
}
