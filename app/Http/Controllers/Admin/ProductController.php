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

        $products = Product::with('category')->latest()->paginate(15);
        return inertia('Admin/Products/Index', [
            'products' => $products,
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request) {}

    public function update(Request $request, Product $product) {}

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}