<?php

namespace App\Http\Transformers;

use App\Models\Note as NoteModel;
use League\Fractal\TransformerAbstract;

/**
 * Class Note
 *
 * @package App\Http\Transformers
 */
class Note extends TransformerAbstract
{
    /**
     * @param NoteModel $note
     *
     * @return array
     */
    public function transform(NoteModel $note)
    {
        return [
            'title'   => $note->title,
            'content' => $note->content,
        ];
    }
}
