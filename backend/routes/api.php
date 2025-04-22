<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\front\AccountController;
use App\Http\Controllers\front\OrderController;
use App\Http\Controllers\front\ProductController as FrontProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/admin/login', [AuthController::class, 'authenticate']);
Route::get('/get-latest-products', [FrontProductController::class, 'getLatestProducts']);
Route::get('/get-featured-products', [FrontProductController::class, 'getFeaturedProducts']);
Route::get('/get-categories', [FrontProductController::class, 'getCategories']); 
Route::get('/get-brands', [FrontProductController::class, 'getBrands']); 
Route::get('/get-products', [FrontProductController::class, 'getProducts']);  
Route::get('/get-product/{id}', [FrontProductController::class, 'getProduct']);
Route::post('/register', [AccountController::class, 'register']);
Route::post('/login', [AccountController::class, 'authenticate']);

Route::group(['middleware' => ['auth:sanctum', 'checkUserRole']], function (){

    Route::post("/save-order", [OrderController::class, 'saveOrder']);
    Route::get('/get-order-detail/{id}', [AccountController::class, 'getOrderDetail']);
});


Route::group(['middleware' => ['auth:sanctum', 'checkAdminRole']], function (){

    /*
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::post('/categories/{id}', [CategoryController::class, 'show']);
        Route::put('/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    */
    Route::resource('categories', CategoryController::class);

    Route::resource('brands', BrandController::class);

    Route::resource('products', ProductController::class);

    Route::post('/temp-images', [TempImageController::class, 'store']);
    Route::post('/save-product-image', [ProductController::class, 'saveProductImage']);
    Route::post('/chnage-product-default-image', [ProductController::class, 'updateDefaultImage']);
    Route::delete('/delete-product-image/{id}', [ProductController::class, 'deleteProductImage']);
    Route::post('/mark-product-delete/{id}', [ProductController::class, 'markProductDeleted']); 
    Route::get('/sizes', [SizeController::class, 'index']);

});
