<?php

namespace App\Http\Requests\Api\Notes;

use App\Http\Requests\Api\Json;

/**
 * Class Create
 *
 * @package App\Http\Requests\Api\Notes
 */
class Create extends Json
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required',
        ];
    }
}
