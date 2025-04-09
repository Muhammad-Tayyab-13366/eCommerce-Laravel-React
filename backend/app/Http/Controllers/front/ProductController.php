<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    //

    public function getProducts(Request $request){
       
        //print_r($request->all());
        $products = Product::orderBy('created_at', 'DESC')
                        ->where(['is_deleted' => 0, 'status' => 1]);
                        
        if(!empty($request->category)){
            $catArray = explode(',', $request->category);
            $products = $products->whereIn('category_id', $catArray);
        }
        if(!empty($request->brand)){
            $brandArray = array_map('intval', explode(',', $request->brand));
            $products = $products->whereIn('brand_id', $brandArray);
        }
       
        $products = $products->get();

        return response()->json([
            "status" => 200,
            "data" => $products
        ], 200);
    }

    public function getLatestProducts(){

        $products = Product::orderBy('created_at', 'DESC')
                        ->where(['is_deleted' => 0, 'status' => 1])
                        ->limit(8)
                        ->get();
        return response()->json([
            "status" => 200,
            "data" => $products
        ], 200);
    }

    public function getFeaturedProducts(){

        $products = Product::orderBy('created_at', 'DESC')
                        ->where(['is_deleted' => 0, 'status' => 1, 'is_feature' => 'yes'])
                        ->limit(8)
                        ->get();
        return response()->json([
            "status" => 200,
            "data" => $products
        ], 200);
    }

    public function getCategories(){
        $categories = Category::orderBy('id', 'DESC')->where('status', 1)->get();
        return response()->json([
            "status" => 200,
            "data" => $categories
        ], 200);

    }

    public function getBrands(){
        $categories = Brand::orderBy('id', 'DESC')->where('status', 1)->get();
        return response()->json([
            "status" => 200,
            "data" => $categories
        ], 200);

    }

    public function getProduct($id){


        $product = Product::with('product_images', 'product_sizes.sizes')->find($id);

        if($product == null){
            return response()->json([
                "status" => 404,
                "message" => "Product not found"
            ], 200);
        }

        return response()->json([
            "status" => 200,
            "data" => $product
        ], 200);

    }
}
