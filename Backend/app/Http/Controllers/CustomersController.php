<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;


class CustomersController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        try {

            $customer = Customer::where('user_id', $id)->first();

            return response()->json([
                "status"=> true,
                "data"=> $customer
            ], 200);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                "status"=> false,
                "error"=> "Customer no encontrado",
            ], 403);

        }catch (Exception $e) {

            return response()->json([
                "status"=> false,
                "error"=> $e->getMessage()
            ], 404);

        }
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

}