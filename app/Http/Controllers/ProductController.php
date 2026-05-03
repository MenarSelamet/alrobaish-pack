<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        $allCategories = Category::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $featuredCategories = $allCategories
            ->where('is_featured', true)
            ->take(9)
            ->values();

        // Fall back to first 9 by sort_order if nothing is flagged yet
        // (covers the case where the migration hasn't run, or all are unflagged).
        if ($featuredCategories->isEmpty()) {
            $featuredCategories = $allCategories->take(9)->values();
        }

        // All active products with primary image_path; the lightbox uses these.
        $products = Product::query()
            ->with('category:id,name_en,name_ar')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return inertia('Products/Index', [
            'featuredCategories' => $featuredCategories,
            'categories'         => $allCategories,
            'products'           => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
    }

    public function showByCategory(Category $category)
    {
        $products = Product::query()
            ->where('category_id', $category->id)
            ->with(['category', 'images'])
            ->get();

        return inertia('Products/Show', [
            'category' => $category,
            'products' => $products
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product) {}



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}