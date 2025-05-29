<?php

namespace App\Http\Controllers;

use App\Models\Calculation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CalculatorController extends Controller
{
    public function calculate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'a' => 'required|numeric',
            'b' => 'required|numeric',
            'operation' => 'required|in:add,subtract,multiply,divide'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid input'], 400);
        }

        $a = $request->input('a');
        $b = $request->input('b');
        $operation = $request->input('operation');

        if ($operation === 'divide' && $b == 0) {
            return response()->json(['error' => 'Division by zero is not allowed'], 400);
        }

        $result = match($operation) {
            'add' => $a + $b,
            'subtract' => $a - $b,
            'multiply' => $a * $b,
            'divide' => $a / $b,
        };

        $calculation = Calculation::create([
            'a' => $a,
            'b' => $b,
            'operation' => $operation,
            'result' => $result
        ]);

        return response()->json([
            'id' => $calculation->id,
            'result' => $calculation->result
        ]);
    }

    public function show($id)
    {
        $calculation = Calculation::find($id);

        if (!$calculation) {
            return response()->json(['error' => 'Calculation not found'], 404);
        }

        return response()->json($calculation);
    }
}
