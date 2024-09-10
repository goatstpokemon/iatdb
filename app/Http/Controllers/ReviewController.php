<?php

namespace App\Http\Controllers;

use App\Models\Lending;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewController extends Controller
{

    public function index()
    {
        $reviews = Review::all();
        return response()->json([
            'reviews' => $reviews
        ], 200);
    }

    public function show($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review niet gevonden'], 404);
        }

        return response()->json([
            'review' => $review
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review niet gevonden'], 404);
        }

        $review->review = $request->review;
        $review->rating = $request->rating;

        $review->save();

        return response()->json([
            'review' => $review
        ], 200);
    }

    public function destroy($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review niet gevonden'], 404);
        }

        $review->delete();

        return response()->json(['message' => 'Review verwijderd'], 200);
    }

    public function addReview($rating, $review, $userId)
    {


        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'Gebruiker niet gevonden'], 404);
        }

        $review = new Review();

        $review->review = $review;
        $review->rating = $rating;
        $review->user_id = $user->id;

        $review->save();


        return response()->json(['message' => 'Review toegevoegd'], 200);
    }


    public function userReviews($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'Gebruiker niet gevonden'], 404);
        }

        $reviews = Review::where('user_id', $user->id)->get();

        return response()->json([
            'reviews' => $reviews
        ], 200);
    }

    public function requestReview(Request $request)
    {
        $productId = $request->route('id');
        $userId = auth()->user()->id;
        $rented = Lending::where('product_id', $productId)->where('retured', true)->where('borrower_id', $userId)->first();
        if ($rented) {
            return response()->json(['message' => 'je hebt dit product gehuurd'], 200);
        }
    }
}
