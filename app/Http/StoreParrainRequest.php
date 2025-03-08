<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreParrainRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Permettre à tout utilisateur d'effectuer cette requête
    }

    public function rules()
    {
        return [
            'num_carte_electeur' => 'required|string|unique:parrains,num_carte_electeur|max:255',
            'num_bureau_vote' => 'required|string|max:255',
            'telephone' => 'nullable|string|unique:parrains,telephone|max:20',
            'email' => 'nullable|email|unique:parrains,email|max:255',
        ];
    }
}


