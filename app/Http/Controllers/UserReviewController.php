<?php

namespace App\Http\Controllers;

use App\Models\Lending;
use App\Models\Product;
use App\Models\User;
use App\Models\UserReview;
use Illuminate\Http\Request;

class UserReviewController extends Controller
{

    public function index()
    {
        $reviews = UserReview::all();
        return response()->json([
            'reviews' => $reviews
        ], 200);
    }

    public function show($id)
    {
        $review = UserReview::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review niet gevonden'], 404);
        }

        return response()->json([
            'review' => $review
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $review = UserReview::find($id);

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
        $review = UserReview::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review niet gevonden'], 404);
        }

        $review->delete();

        return response()->json(['message' => 'Review verwijderd'], 200);
    }

    public function addReview(Request $request)
    {
        $rating = $request->rating;
        $comment = $request->comment;
        $renterId = $request->renter;
        $ownerId = $request->owner;
        $renter = User::find($renterId);
        $owner = User::find($ownerId);

        if (!$renter) {
            return response()->json(['message' => 'Renter niet gevonden'], 404);
        }
        if (!$owner) {
            return response()->json(['message' => 'Eigenaar niet gevonden'], 404);
        }

        $review = new UserReview();

        $review->review = $comment;
        $review->rating = $rating;
        $review->owner = $owner->id;
        $review->renter = $renter->id;

        $review->save();


        return response()->json(['message' => 'Review toegevoegd'], 200);
    }


    public function userReviews($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'Gebruiker niet gevonden'], 404);
        }

        $reviews = UserReview::where('user_id', $user->id)->get();

        return response()->json([
            'reviews' => $reviews
        ], 200);
    }

    public function requestReview(Request $request)
    {
        $productId = $request->route('id');
        $userId = auth()->user()->id;
        $rented = Lending::where('product_id', $productId)->where('returned', true)->where('borrower_id', $userId)->first();
        if ($rented) {
            return response()->json(['message' => 'je hebt dit product gehuurd', 'allowed' => true], 200);
        }
        return response()->json(['message' => 'je hebt dit product niet gehuurd', 'allowed' => false], 200);
    }
}
