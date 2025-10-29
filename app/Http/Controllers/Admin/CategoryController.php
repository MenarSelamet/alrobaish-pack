<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->get();
        return inertia('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'required|string|max:255|unique:categories,slug',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
            $validated['image'] = $imagePath;
        }

        Category::create($validated, $imagePath);

        return redirect()->route('categories.index');
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $category->id,
            'image' => 'nullable|image|max:2048',
        ]);

        $category->update($validated);

        return redirect()->route('categories.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}