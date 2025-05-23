<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Jobs\SendOrderEmail;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    //
    public function saveOrder(Request $request){
        if(!empty($request->cart)){
            $order = new Order();
            $order->name = $request->name;
            $order->email = $request->email;
            $order->address = $request->address;
            $order->mobile = $request->mobile;
            $order->state = $request->state;
            $order->zip = $request->zip;
            $order->city = $request->city;
            $order->grand_total = $request->grand_total;
            $order->sub_total = $request->sub_total;
            $order->discount = $request->discount;
            $order->shipping = $request->shipping;
            $order->payment_status = $request->payment_status;
            $order->status = $request->status;
            $order->user_id = $request->user()->id;
            $order->save();

            // save order item
            foreach ($request->cart as $key => $item) {
                $orderItem = new OrderItem();
                $orderItem->price = $item['qty'] * $item['price'];
                $orderItem->unit_price = $item['price'];
                $orderItem->qty = $item['qty'];
                $orderItem->product_id = $item['product_id'];
                $orderItem->size = $item['size'];
                $orderItem->name = $item['title'];
                $orderItem->order_id = $order->id;
                $orderItem->save();
            }
            SendOrderEmail::dispatch($order->id);
            return response()->json([
                "status" => 200,
                "message" => "Order placed successfully",
                "order_id" => $orderItem->order_id
            ]);

           
        }
        else{

            return response()->json([
                "status" => 400,
                "message" => "Your cart is empty"
            ]);
        }
        
    }

    public function getOrders()
    {
        $orders = Order::where("user_id", Auth::user()->id)->orderBy("created_at", "DESC")->get();
        return response()->json([
            "status" => 200,
            "data" => $orders
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
}
