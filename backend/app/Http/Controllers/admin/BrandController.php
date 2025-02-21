<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    //

    public function index(){
        $brands = Brand::orderBy('created_at', 'DESC')->get();

        return response()->json([
            "status" => 200,
            "data" => $brands
        ], 200);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => "required|unique:brands"
        ]);

        if($validator->fails()){
            return response()->json([
                "status" => 400, // bad req
                "errors" => $validator->errors()
            ], 400);
        }
        else 
        {
            $brand = new Brand();
            $brand->name = $request->name;
            $brand->status = $request->status;
            $brand->save();

            return response()->json([
                "status" => 200, // bad req
                "data" => $brand
            ], 200);
        }
    }

    public function show($id){
        $brand = Brand::find($id);
        if($brand == null){
            return response()->json([
                "status" => 404, // not found req
                "errors" => "Brand not found"
            ], 404);
        }
        else 
        {
            return response()->json([
                "status" => 200,
                "data" => $brand,
            ],200);
        }

    }

    public function update($id, Request $request){
        $brand = Brand::find($id);
        if($brand == null){
            return response()->json([
                "status" => 404, // not found req
                "errors" => "Brand not found"
            ], 404);
        }
        else 
        {
            $brand->name = $request->name;
            $brand->status = $request->status;
            $brand->save();

            return response()->json([
                "status" => 200,
                "data" => $brand,
            ],200);
        }
    }

    public function destroy($id, Request $request){
        try {
            $brand  = Brand::find($id);
            if($brand == null){
                return response()->json([
                    "status" => 404,
                    "errors" => "Brand not found",
                ],404);
            }
            else 
            {
                
                $brand->delete();
                return response()->json([
                    "status" => 200,
                    "message" => "Brand deleted successfully",
                ],200);
            }

        } catch (\Exception $e) {
            
            return response()->json([
                "status" => 500,
                "errors" => $e->getMessage(),
            ]);
            
        }
    }

}
