<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    //

    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            "image" => "required|image|mimes:jpeg,png,jpg,gif"
        ]);

        if($validator->fails()){
            return response()->json([
                "status" => 400,
                "errors" => $validator->errors()
            ], 400);
        }

        $tempImage = new TempImage();

        $image = $request->file('image');
        $imageName = time().'.'.$image->getClientOriginalExtension();
        $image->move(public_path('uploads/temp'), $imageName);

        $tempImage->name = $imageName;
        $tempImage->save();

        $manager = new ImageManager(Driver::class);
        $image_manager = $manager->read(public_path('uploads/temp').'/'.$imageName);
        $image_manager->coverDown(400, 450); // 800 x 480 (5:3)
        $image_manager->save(public_path('uploads/temp/thumb').'/'.$imageName);
        

        return response()->json([
            "status" => 200,
            "message" => "Image has been uploaded successfully",
            "data" => $tempImage
        ], 200);


    }
}
