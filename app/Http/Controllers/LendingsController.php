<?php

namespace App\Http\Controllers;

use App\Models\Lending;
use App\Models\Product;
use App\Models\User;
use DateTime;
use DateTimeZone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LendingsController extends Controller
{
    //

    public function store(Request $request)
    {
        $returnDate = strtotime($request->return_date);
        $lendingDate = strtotime($request->lending_date);
        $lending = new Lending;
        $lending->borrower_id = $request->borrower_id;
        $lending->product_id = $request->product_id;
        $lending->return_date = date('Y-m-d H:i:s', $returnDate);
        $lending->lending_date = date('Y-m-d H:i:s', $lendingDate);
        $product = Product::find($request->product_id);
        $product->checked = false;
        $product->save();
        $lending->save();
        return response()->json([
            'lending' => $lending
        ], 200);
    }

    public function returnProduct(Request $request, $productId)
    {
        $userId = auth()->user()->id;
        $lending = Lending::where('borrower_id', $userId)
            ->where('product_id', $productId)
            ->where('returned', false)
            ->first();

        if (!$lending) {
            return response()->response([
                'message' => 'Product is niet uitgeleend'
            ], 404);
        }

        $lending->returned = true;
        $lending->save();

        return response()->response([
            'message' => 'Product is geretourneerd'
        ], 200);
    }

    public function getYourLendings()
    {
        $userId = auth()->user()->id;
        $lendings = Lending::where('borrower_id', $userId)->get();
        return response()->json([
            'lendings' => $lendings
        ], 200);
    }
    public function currentlyLentOut()
    {
        $userId = auth()->user()->id;
        $lentOut = Lending::where('returned', false)
            ->where('user_id', $userId)
            ->get();
        return response()->json([
            'lentOut' => $lentOut
        ], 200);
    }
    public function lendingRequests()
    {
        $userId = auth()->user()->id;
        $productOwned = Product::where('user_id', $userId)->pluck('id');

        $lendingRequests = Lending::where('accepted', false)
            ->whereIn('product_id', $productOwned)
            ->get();
        $lendingRequests->load('borrower', 'product');
        return response()->json([
            'lendingRequests' => $lendingRequests
        ], 200);
    }
    public function getLending($id)
    {
        $lending = Lending::find($id);
        return response()->json([
            'lending' => $lending
        ], 200);
    }
    public function acceptLendingRequest(Request $request)
    {


        $lending = Lending::find($request->id);

        $lending->accepted = true;
        $lending->save();
        return response()->json([
            'lending' => $lending
        ], 200);
    }

    public function test(Request $request)
    {
        dd($request->id);
    }

    public function destroy(Request $request)
    {
        $lendingId = $request->id;
        $lending = Lending::find($lendingId);
        $lending->delete();
        return response()->json([
            'message' => 'Lening verwijderd'
        ], 200);
    }
}
