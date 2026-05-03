<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Fields that come from textareas (one item per line) but are stored as JSON arrays.
     */
    private const SPEC_LIST_FIELDS = [
        'sizes_en', 'sizes_ar',
        'materials_en', 'materials_ar',
        'features_en', 'features_ar',
    ];

    public function index()
    {
        $categories = Category::withCount('products')->latest()->get();

        return inertia('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateCategory($request);

        $validated['is_featured'] = $request->boolean('is_featured');

        $this->handleImageUploads($request, $validated, null);
        $this->normalizeSpecLists($validated);

        Category::create($validated);

        return redirect()->route('categories.index');
    }

    public function update(Request $request, Category $category)
    {
        $validated = $this->validateCategory($request);

        $validated['is_featured'] = $request->boolean('is_featured');

        $this->handleImageUploads($request, $validated, $category);
        $this->normalizeSpecLists($validated);

        $category->update($validated);

        return redirect()->route('categories.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validateCategory(Request $request): array
    {
        return $request->validate([
            'name_en'         => 'required|string|max:255',
            'name_ar'         => 'required|string|max:255',
            'description_en'  => 'nullable|string',
            'description_ar'  => 'nullable|string',
            'image_path'      => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
            'banner_path'     => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:8192',
            'gallery_files'   => 'nullable|array|max:8',
            'gallery_files.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:8192',
            'is_featured'     => 'nullable|boolean',
            'sizes_en'        => 'nullable|string',
            'sizes_ar'        => 'nullable|string',
            'materials_en'    => 'nullable|string',
            'materials_ar'    => 'nullable|string',
            'features_en'     => 'nullable|string',
            'features_ar'     => 'nullable|string',
        ]);
    }

    /**
     * Move uploaded files into storage; merge gallery onto existing array if requested.
     */
    private function handleImageUploads(Request $request, array &$validated, ?Category $existing): void
    {
        if ($request->hasFile('image_path')) {
            $validated['image_path'] = $request->file('image_path')->store('categories', 'public');
        }

        if ($request->hasFile('banner_path')) {
            $validated['banner_path'] = $request->file('banner_path')->store('categories', 'public');
        }

        if ($request->hasFile('gallery_files')) {
            $existingGallery = $existing?->gallery_paths ?? [];
            $newPaths = [];
            foreach ($request->file('gallery_files') as $file) {
                $newPaths[] = $file->store('categories/gallery', 'public');
            }
            $validated['gallery_paths'] = array_values(array_merge($existingGallery, $newPaths));
        }

        // Always remove the helper key from the data we'll persist.
        unset($validated['gallery_files']);
    }

    /**
     * Convert newline-separated textareas to clean JSON arrays.
     */
    private function normalizeSpecLists(array &$validated): void
    {
        foreach (self::SPEC_LIST_FIELDS as $field) {
            if (!array_key_exists($field, $validated)) {
                continue;
            }
            $raw = $validated[$field];
            if (is_string($raw)) {
                $items = array_values(array_filter(
                    array_map('trim', preg_split("/\r?\n/", $raw)),
                    fn ($line) => $line !== ''
                ));
                $validated[$field] = $items;
            }
        }
    }
}
