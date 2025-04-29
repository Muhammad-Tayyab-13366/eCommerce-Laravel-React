<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>

        .container{
            width: 60%;
            margin: 0 auto;
        }
    

        .thank{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }
        .thank_h2{
            color: #198754;
        }

        .thank p {
            color: #595c5f;
            margin-top: 0px;
        }

        .order-detail{
            display: flex;
            justify-content: space-between;
        }

        .order-detail-inner div{
            margin-bottom: 14px;
        }

        .table{
            width: 100%;
            border-collapse: collapse;
            
        }

        .table ,tr ,th, td {
            padding: 10px;
            text-align: start;
            border: 1px solid;
        }

        .table tfoot td:first-child{
            text-align: end;
        }

        @media (max-width: 767px) {

            .container{
                width: 100%;
            }
            .order-detail{
                display: flex;
                flex-direction: column;
            }
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="thank">
            <h2 class="thank_h2">Thank You</h2>
            <p>Your order has been placed successfully</p>
        </div>

        <div class="row">
            <div>
                <h3>Order Summary</h3>
            </div>
            <hr/>
            <div class="order-detail">
                <div class="order-detail-inner">
                    <div>
                        <strong>Order ID:</strong> {{ $orderData->id }}
                    </div>
                    <div>
                        <strong>Date:</strong> {{ $orderData->created_at }}
                    </div>

                    <div>
                        <strong>Status:</strong> {{ $orderData->status }}
                    </div>
                    <div>
                        <strong>Payment Method:</strong> Cash on Delivery
                    </div>

                </div>
                <div class="order-detail-inner">
                    <div>
                        <strong>Customer:</strong> {{ $orderData->name }}
                    </div>
                    <div>
                        <strong>Address:</strong> {{ $orderData->address }}  {{ $orderData->city }}  {{ $orderData->state }}  {{ $orderData->zip }}
                    </div>
                    <div>
                        <strong>Contact:</strong> {{ $orderData->mobile }}
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div>
            <h3 style="margin-bottom: 0pc;">Items</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($orderData->orderItems as $item)
                        <tr>
                            <td>{{ $item->name }}</td>
                            <td>{{ $item->qty }}</td>
                            <td>${{ $item->unit_price }}</td>
                            <td>${{ $item->price }}</td>
                        </tr> 
                    @endforeach
                   
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" ><strong>Subtotal</strong></td>
                        <td>${{ $orderData->sub_total }}</td>
                    </tr>
                    <tr>
                        <td colspan="3"><strong>Shipping</strong></td>
                        <td>${{ $orderData->shipping }}</td>
                    </tr>
                    <tr>
                        <td colspan="3"><strong>Grand Total</strong></td>
                        <td>${{ $orderData->grand_total }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</body>
</html>