<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
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
}
