<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{





    public function index()
    {

        $products = Product::all();
        return response()->json([
            'products' => $products
        ], 200);
    }

    public function home()
    {
        $user =  Auth::user();
        $products = $user->products;
        $rentedProducts = Product::where('rented_by', $user->id)->get();
        $availible = ProductController::availible();
        return view('home', [
            "available" => $availible,
            "products" => $products,
            "user" => $user,
            "rentedProducts" => $rentedProducts
        ]);
    }

    public function yours()
    {

        $user =  Auth::user();
        $products = $user->products;
        return response()->json([
            'products' => $products
        ], 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $product = new Product;
        $product->user_id = Auth::user()->id;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->category = $request->category;
        $photo = $request->file('photo');
        $path = $photo->store('public/products');
        $product->product_image = Storage::url($path);
        $product->rentable = true;
        $product->rented_by = null;
        $product->save();
        return response()->json([
            'product' => $product
        ], 200);
    }
    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $productId = $request->route('id');
        $product = Product::find($productId);

        $owner = User::find($product->user_id);
        $rentee = User::find($product->rented_by);
        $currentUser = Auth::user();
        return response()->json([
            'product' => $product,
            'owner' => $owner,
            'rentee' => $rentee,
            'currentUser' => $currentUser
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {



        $productId = $request->route('id');
        $product = Product::find($productId);
        if ($request->file('photo')) {
            $photo = $request->file('photo');
            $path = $photo->store('public/products');
            $product->product_image = Storage::url($path) ?? $product->product_image;
        } else {
            $product->product_image = $product->product_image;
        }
        $product->rentable = $request->rentable ?? $product->rentable;
        $product->rented_by = $request->rented_by ?? $product->rented_by;
        $product->rental_started = $request->rental_started ?? $product->rental_started;
        $product->return_date = $request->return_date ?? $product->return_date;
        $product->returned = $request->returned ?? $product->returned;
        $product->price = $request->price ?? $product->price;
        $product->category = $request->category ?? $product->category;
        $product->type = $request->type ?? $product->type;
        $product->size = $request->size ?? $product->size;
        $product->name = $request->name ?? $product->name;
        $product->description = $request->description ?? $product->description;
        $product->save();

        if ($request->expectsJson()) {
            return response()->json([
                'updatedProduct' => $product
            ], 200);
        } else {
            return response()->json([
                'updatedProduct' => $product
            ], 200);
        }
    }

    public function edit(Request $request)
    {
        $productId = $request->route('id');
        $product = Product::find($productId);

        $owner = User::find($product->user_id);
        $rentee = User::find($product->rented_by);
        $currentUser = Auth::user();
        return view('pages.products.edit', [
            'product' => $product,
            'owner' => $owner,
            'rentee' => $rentee,
            'currentUser' => $currentUser
        ]);
    }
    public function categoryItems(Request $request)
    {

        $category = $request->route('category');
        $category = Product::where('category', $category)->get();
        return response()->json([
            'category' => $category
        ]);
    }
    public function borrowed()
    {
        $user =  Auth::user();
        $products = $user->products;


        return response()->json([
            'products' => $products
        ], 200);
    }
    public function borrowing()
    {
        $user =  Auth::user();
        $rentedProducts = Product::where('rented_by', $user->id)->get();


        return response()->json([
            'rentedProducts' => $rentedProducts
        ], 200);
    }
    public function availible()
    {
        return Product::where('rentable', 1)->get();
    }

    public function return(Request $request)
    {
        $productId = $request->route('id');
        $product = Product::find($productId);
        $product->rented_by = null;
        $product->rental_started = null;
        $product->return_date = null;
        $product->rentable = 0;
        $product->save();
        return response()->json([
            'product' => $product
        ], 200);
    }



    public function borrow(Request $request)
    {
        $user = Auth::user();
        $productId = $request->route('id');
        $product = Product::find($productId);
        $photo = $request->file('photo') ?? null;
        $path = $photo->store('public/products') ?? null;
        $product->product_image = Storage::url($path) ?? $product->product_image;
        $product->rented_by = $user->id;
        $product->rental_started = $request->begin;
        $product->return_date = $request->end;
        $product->rentable = 0;
        $product->save();
        return response()->json([
            'product' => $product
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        $deleted = true;
        return response()->json([
            'deleted' => $deleted
        ], 200);
    }
}
