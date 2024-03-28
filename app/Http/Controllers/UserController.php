<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;



class UserController extends Controller
{
    public function editUser(Request $request)
    {

        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $id = $request->route('id');
        $user = User::find($id);
        $user->name = $request->name ?? $user->name;
        $user->email = $request->email;
        $photo = $request->file('photo');
        dd($photo);
        $path = $photo->store('public/users');
        $user->profile_image = Storage::url($path);
        $user->username = $request->username ?? $user->username;
        $user->save();
        return redirect('/');
    }

    public function editProfile(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);
        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        $user->name = $request->name ?? $user->name;
        $user->email = $request->email ?? $user->email;
        $user->username = $request->username ?? $user->username;
        $photo = $request->file('photo') ?? null;
        $path = $photo->store('public/users') ?? null;
        $user->profile_image = Storage::url($path) ?? $user->profile_image;
        $user->save();
        return response()->json(['user' => $user, 'message' => 'Profile updated successfully', 200]);
    }

    public function profile()
    {
        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        return response()->json(['user' => $user]);
    }

    public function index()
    {

        $users = User::all();


        return response()->json(['users' => $users]);
    }

    public function show(Request $request)
    {
        $userId = $request->route('id');
        $user = User::find($userId);
        $products = Product::where('user_id', $userId)->get();

        return response()->json(['user' => $user, 'products' => $products]);
    }
}
