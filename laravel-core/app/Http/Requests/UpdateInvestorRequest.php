<?php

namespace App\Http\Requests;

use App\Models\Investor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateInvestorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->Has_Permissions('edit_investors');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $investorId = $this->route('investor');
        
        return [
            'name' => 'required|string|min:4|max:255',
            'email' => [
                'required',
                'string',
                'email',
                Rule::unique('investors')->ignore($investorId),
            ],
            'password' => 'nullable|string|min:8|max:255',
            'permissions' => 'nullable|array',
        ];
    }
}
