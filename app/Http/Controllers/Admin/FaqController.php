<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFaqRequest;
use App\Models\Faq;

class FaqController extends Controller
{
    public function index(): \Inertia\Response
    {
        return inertia('Admin/Faqs/Index', [
            'faqs' => Faq::orderBy('order')->orderBy('id')->get(),
        ]);
    }

    public function store(StoreFaqRequest $request): \Illuminate\Http\RedirectResponse
    {
        Faq::create($request->validated());

        return redirect()->route('faqs.index');
    }

    public function update(StoreFaqRequest $request, Faq $faq): \Illuminate\Http\RedirectResponse
    {
        $faq->update($request->validated());

        return redirect()->route('faqs.index');
    }

    public function destroy(Faq $faq): \Illuminate\Http\RedirectResponse
    {
        $faq->delete();

        return redirect()->route('faqs.index');
    }
}
