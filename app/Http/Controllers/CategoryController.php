<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    //
    function index()
    {
        $categories = Category::all();
        return response()->json([
            'categories' => $categories
        ], 200);
    }

    function show(Request $request)
    {
        $categoryId = $request->route('id');
        $category = Category::find($categoryId);

        if (!$category) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }
        return response()->json([
            'category' => $category
        ], 200);
    }

    function store(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->description = $request->description;

        $photo = $request->file('photo');
        $path = $photo->store('public/categories');
        $category->category_image = Storage::url($path);

        $category->save();
        return response()->json([
            'category' => $category
        ], 200);
    }
    function edit(Request $request)
    {


        $categoryId = $request->route('id');
        $category = Category::find($categoryId);
        if ($request->file('photo')) {
            $photo = $request->file('photo');
            $path = $photo->store('public/products');
            $category->category_image = Storage::url($path) ?? $category->category_image;
        } else {
            $category->category_image = $category->category_image;
        }
        if (!$category) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }

        $category->name = $request->name ?? $category->name;
        $category->description = $request->description ?? $category->description;


        $category->save();
        return response()->json([
            'category' => $category
        ], 200);
    }
}
