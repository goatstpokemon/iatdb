<?php

namespace App\Http\Controllers;

use App\Models\Lending;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LendingsController extends Controller
{
    //

    public function store(Request $request)
    {

        $userId = Auth::user()->id;
        $lending = new Lending;
        $lending->borrower_id = $userId;
        $lending->product_id = $request->product_id;
        $lending->lending_date = $request->lending_date;
        $lending->return_date = $request->return_date;


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
            return redirect()->back()->withErrors(['Je hebt dit product niet geleend']);
        }

        $lending->returned = true;
        $lending->save();

        return response()->response([
            'message' => 'Product is geretourneerd'
        ], 200);
    }
}
