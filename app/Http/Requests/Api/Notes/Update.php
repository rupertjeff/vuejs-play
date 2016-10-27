<?php

namespace App\Http\Requests\Api\Notes;

use App\Http\Requests\Api\Json;

/**
 * Class Update
 *
 * @package App\Http\Requests\Api\Notes
 */
class Update extends Json
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
