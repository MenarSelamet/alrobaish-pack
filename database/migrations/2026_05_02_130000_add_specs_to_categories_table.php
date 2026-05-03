<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            // Banner image used by the "featured rectangle" on the Products page.
            // (image_path remains the small thumbnail used by the honeycomb / mini-grid.)
            $table->string('banner_path')->nullable()->after('image_path');

            // Up to ~4 example images for the "Examples" tab.
            $table->json('gallery_paths')->nullable()->after('banner_path');

            // Spec lists for the "Sizes / Materials / Features" tabs.
            $table->json('sizes_en')->nullable();
            $table->json('sizes_ar')->nullable();
            $table->json('materials_en')->nullable();
            $table->json('materials_ar')->nullable();
            $table->json('features_en')->nullable();
            $table->json('features_ar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn([
                'banner_path',
                'gallery_paths',
                'sizes_en',
                'sizes_ar',
                'materials_en',
                'materials_ar',
                'features_en',
                'features_ar',
            ]);
        });
    }
};
