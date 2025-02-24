<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    //
    public function index(){

        $products = Product::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => 200,
            "data" => $products
        ]);
    }
    
    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'status' => 'required',
            'is_feature' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        
        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_feature = $request->is_feature;
        $product->barcode = $request->barcode;
        $product->save();

        if(!empty($request->gallery)){
            foreach ($request->gallery as $key => $temImageId) {
                $tempImage = TempImage::find($temImageId);
                $imageName = $tempImage->name;

                // Large thumbnail
                $manager = new ImageManager(Driver::class);
                $image_manager = $manager->read(public_path('uploads/temp').'/'.$imageName);
                $image_manager->scaleDown(1200); // 800 x 480 (5:3)
                $image_manager->save(public_path('uploads/products/large').'/'.$product->id.'-'.$imageName);

                // Small thumbnail

                $manager = new ImageManager(Driver::class);
                $image_manager = $manager->read(public_path('uploads/temp').'/'.$imageName);
                $image_manager->coverDown(400, 450); // 800 x 480 (5:3)
                $image_manager->save(public_path('uploads/products/small').'/'.$product->id.'-'.$imageName);
                
                $productImage = new ProductImage();
                $productImage->product_id = $product->id;
                $productImage->image = $product->id.'-'.$imageName;
                $productImage->save();
                if($key == 0){
                    $product->image = $product->id.'-'.$imageName;
                    $product->save();
                }

            }


        }

        return response()->json([
            'status' => 200,
            'data' => $product,
            'message' => "Product has been created successfully"
        ]);

    }

    public function show($id, Request $request){
        $product = Product::with('product_images')->find($id);

        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => "Product not found"
            ],404);
        }

        return response()->json([
            'status' => 200,
            'data' => $product
        ],200);

    }

    public function update($id, Request $request){

        $product = Product::find($id);

        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => "Product not found"
            ],404);
        }

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku,'.$id.',id',
            'status' => 'required',
            'is_feature' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand_id;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_feature = $request->is_feature;
        $product->barcode = $request->barcode;
        $product->save();

       

        if(!empty($request->sizes)){
            ProductSize::where('product_id', $id)->delete();
            foreach ($request->sizes as $key => $sizeId) {
                $productSize = new ProductSize();
                $productSize->size_id = $sizeId;
                $productSize->product_id = $id;
                $productSize->save();
            }
        }


        return response()->json([
            'status' => 200,
            'message' => "Product has been updated successfully"
        ]);
    }

    public function destroy($id){
        $product = Product::find($id);

        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => "Product not found"
            ],404);
        }
        $product->delete();
        return response()->json([
            'status' => 200,
            'message' => "Product deleted successfully"
        ],200);
        
    }

    public function saveProductImage(Request $request){
        $validator = Validator::make($request->all(),[
            "image" => "required|image|mimes:jpeg,png,jpg,gif"
        ]);

        if($validator->fails()){
            return response()->json([
                "status" => 400,
                "errors" => $validator->errors()
            ], 400);
        }

       

        $image = $request->file('image');
        $imageName = $request->product_id."-".time().'.'.$image->getClientOriginalExtension();
        $image->move(public_path('uploads/temp'), $imageName);

        $productImage = new ProductImage();
        $productImage->product_id = $request->product_id;
        $productImage->image = $imageName;
        $productImage->save();
        //dd($image);
        // Large thumbnail
        $manager = new ImageManager(Driver::class);
        $image_manager = $manager->read(public_path('uploads/temp').'/'.$imageName);
        $image_manager->scaleDown(1200); // 800 x 480 (5:3)
        $image_manager->save(public_path('uploads/products/large').'/'.$imageName);
      
        // Small thumbnail

        $manager = new ImageManager(Driver::class);
        $image_manager = $manager->read(public_path('uploads/temp').'/'.$imageName);
        $image_manager->coverDown(400, 450); // 800 x 480 (5:3)
        $image_manager->save(public_path('uploads/products/small').'/'.$imageName);
        
        return response()->json([
            "status" => 200,
            "message" => "Image has been uploaded successfully",
            "data" => $productImage
        ], 200);

    }

    public function updateDefaultImage(Request $request){
       // dd($request->all());
        $product = Product::find($request->product_id);
        $product->image = $request->image;
        $product->save();

        return response()->json([
            "status" => 200,
            "message" => "Product default image changed successfully"
        ], 200);
    }
}
