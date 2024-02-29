<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class User extends Controller
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
        $user->save();
        return redirect('/');
    }

    public function editProfile(Request $request)
    {

        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $id = Auth::user()->id;
        $user = User::find($id);
        $user->name = $request->name ?? $user->name;
        $user->email = $request->email ?? $user->email;
        $photo = $request->file('photo');
        $path = $photo->store('public/users');
        $user->profile_image = Storage::url($path);
        $user->save();
        response(200, 'Profile updated successfully');
    }

    public function profile()
    {
        $user = Auth::user();

        return response()->json($user);
    }

    public function index()
    {

        $users = User::all();


        return response()->json($users);
    }

    public function show(Request $request)
    {
        $userId = $request->route('id');
        $user = User::find($userId);
        $products = Product::where('user_id', $userId)->get();

        return response()->json(['user' => $user, 'products' => $products]);
    }
}
}
