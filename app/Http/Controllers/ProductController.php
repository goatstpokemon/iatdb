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
        return view('pages.products.index', [
            "products" => $products,
        ]);
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

    public function create()
    {
        return view('pages.products.createProduct');
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
        return redirect('/');
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
        return view('pages.products.show', [
            'product' => $product,
            'owner' => $owner,
            'rentee' => $rentee,
            'currentUser' => $currentUser
        ]);
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
        $product->category = $request->category;
        $product->name = $request->name ?? $product->name;
        $product->description = $request->description ?? $product->description;


        $product->save();

        if ($request->expectsJson()) {
            return response()->json([
                'updatedProduct' => $product
            ], 200);
        } else {
            return redirect('/products/' . $productId);
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
    public function filter(Request $request)
    {
        $category = $request->route('category');
        $products = Product::where('category', $category)->get();
        return view('pages.products.filter', ['products' => $products]);
    }

    public function borrowed()
    {
        $user =  Auth::user();
        $products = $user->products;


        return view('pages.products.borrowed', [
            "products" => $products,
            "user" => $user
        ]);
    }
    public function borrowing()
    {
        $user =  Auth::user();
        $rentedProducts = Product::where('rented_by', $user->id)->get();


        return view('pages.products.borrowing', [
            "products" => $rentedProducts,
            "user" => $user
        ]);
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
        return redirect('/');
    }



    public function borrow(Request $request)
    {
        $user = Auth::user();
        $productId = $request->route('id');
        $product = Product::find($productId);

        $product->rented_by = $user->id;
        $product->rental_started = $request->begin;
        $product->return_date = $request->end;
        $product->rentable = 0;
        $product->save();
        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {

        return $this->isNotAuthorised($product) ? $this->isNotAuthorised($product) :
            $product->delete();
    }

    public function search(Request $request)
    {
        $q = $request->input('q');
        $results = DB::table('products')
            ->where('name', 'like', '%' . $q . '%')
            ->orWhere('name', 'like', '%' . $q . '%')
            ->get();
        return view('pages.products.search', ['results' => $results]);
    }
}
