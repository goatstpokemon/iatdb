<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use App\Models\UserReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;



class UserController extends Controller
{
    public function editUser(Request $request)
    {


        $id = $request->route('id');
        $user = User::find($id);
        $user->name = $request->name ?? $user->name;
        $user->email = $request->email ?? $user->email;
        if ($request->file('photo')) {
            $request->validate([
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif',
            ]);
            $photo = $request->file('photo');
            $path = $photo->store('public/users');
            $user->profile_image = Storage::url($path) ?? $user->profile_image;
        } else {
            $user->profile_image = $user->profile_image;
        }
        $user->username = $request->username ?? $user->username;
        $user->hasWarning = $request->hasWarning ?? $user->hasWarning;
        $user->isBanned = $request->isBanned ?? $user->isBanned;
        $user->save();
        return response()->json(['user' => $user, 'req' => $request, 'message' => 'User updated successfully', 200]);
    }

    public function editProfile(Request $request)
    {

        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        $user->name = $request->name ?? $user->name;
        $user->email = $request->email ?? $user->email;
        $user->username = $request->username ?? $user->username;
        if ($request->file('photo')) {
            $request->validate([
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif',
            ]);
            $photo = $request->file('photo');
            $path = $photo->store('public/users');
            $user->profile_image = Storage::url($path) ?? $user->profile_image;
        } else {
            $user->profile_image = $user->profile_image;
        }
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
        $reviews = UserReview::where('owner', $userId)->get();
        return response()->json(['user' => $user, 'products' => $products, 'reviews' => $reviews]);
    }


    public function destroy(Request $request)
    {
        $id = $request->id;
        $user = User::find($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
