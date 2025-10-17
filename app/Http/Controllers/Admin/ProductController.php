<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {

        return inertia('Admin/Products/Index', [
            'products' => Product::all(),
        ]);
    }

    public function store(Request $request) {}

    public function update(Request $request, Product $product) {}

    public function destroy(Product $product) {}
}