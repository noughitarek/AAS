<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDeskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->Has_Permissions('edit_desks');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $deskId = $this->route('desk');
        return [
            'name' => 'required|string|min:4|max:255',
            'reference' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('desks')->ignore($deskId),
            ],
            'from_stock' => 'boolean',
            'ecotrack_idf' => 'nullable|string|max:255',
            'ecotrack_token' => 'nullable|string|max:255',
        ];
    }
}
