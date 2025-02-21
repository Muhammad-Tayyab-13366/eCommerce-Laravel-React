<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    //
    public function index(){
        $categories = Category::orderBy('created_at', 'DESC')->get();
        return response()->json([
            "status" => 200,
            'data' => $categories
        ]);
    }

    public function store(Request $request){
        try {

            $validator = Validator::make($request->all(), [
                'name' => "required|unique:categories"
            ]);

            if($validator->fails()){
                return response()->json([
                    "status" => 400,
                    "errors" => $validator->errors()
                ]);
            }
            else 
            {
                $category = new Category();
                $category->name = $request->name;
                $category->status = $request->status;
                $category->save(); 

                return response()->json([
                    "status" => 200,
                    "message" => "Category added successfully.",
                    'data' => $category
                ],200);
            }
        
        } catch (\Exception $e) {
            
            return response()->json([
                "status" => 500,
                "errors" => $e->getMessage(),
            ]);
            
        }
        
    }

    public function show($id){
        try {
            $category  = Category::find($id);
            if($category == null){
                return response()->json([
                    "status" => 404,
                    "errors" => "Category not found",
                ],404);
            }
            else 
            {
                return response()->json([
                    "status" => 200,
                    "data" => $category,
                ],200);
            }


        } catch (\Exception $e) {
            
            return response()->json([
                "status" => 500,
                "errors" => $e->getMessage(),
            ]);
            
        }
    }

    public function update($id, Request $request)
    {
        try {
            $category  = Category::find($id);
            if($category == null){
                return response()->json([
                    "status" => 404,
                    "errors" => "Category not found",
                ],404);
            }
            else 
            {
                $category->name = $request->name;
                $category->status = $request->status;
                $category->save();
                return response()->json([
                    "status" => 200,
                    "message" => "Category updated successfully",
                    "data" => $category,
                ],200);
            }


        } catch (\Exception $e) {
            
            return response()->json([
                "status" => 500,
                "errors" => $e->getMessage(),
            ]);
            
        }
    }

    public function destroy($id, Request $request){

        try {
            $category  = Category::find($id);
            if($category == null){
                return response()->json([
                    "status" => 404,
                    "errors" => "Category not found",
                ],404);
            }
            else 
            {
                
                $category->delete();
                return response()->json([
                    "status" => 200,
                    "message" => "Category deleted successfully",
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
