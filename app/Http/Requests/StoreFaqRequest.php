<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreFaqRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, ValidationRule|array<mixed>|string> */
    public function rules(): array
    {
        return [
            'question_en' => ['required', 'string', 'max:500'],
            'question_ar' => ['required', 'string', 'max:500'],
            'answer_en'   => ['required', 'string'],
            'answer_ar'   => ['required', 'string'],
            'order'       => ['nullable', 'integer', 'min:0'],
        ];
    }
}
