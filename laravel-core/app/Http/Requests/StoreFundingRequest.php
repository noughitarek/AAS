<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class StoreFundingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->Has_Permissions('create_funding');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'total_amount' => 'required|numeric',
            'products_percentage' => 'required|numeric|min:1|max:100',
            'advertising_percentage' => 'required|numeric|min:1|max:100',
            'workers_percentage' => 'required|numeric|min:1|max:100',
            'product_id' => 'required|numeric|exists:products,id',
            'desk_id' => 'required|numeric|exists:desks,id',
            'investor_id' => 'required|numeric|exists:investors,id',
            'type' => 'required|numeric|in:1,2',
            'investor_percentage' => 'required|numeric|min:1|max:100',
        ];
    }
}
