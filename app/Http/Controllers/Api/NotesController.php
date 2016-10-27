<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Notes\Create as CreateRequest;
use App\Http\Requests\Api\Notes\Update as UpdateRequest;
use App\Http\Transformers\Note as NoteTransformer;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

/**
 * Class NotesController
 *
 * @package App\Http\Controllers\Api
 */
class NotesController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     */
    public function index(Request $request)
    {
        $paginator = Note::paginate($this->getPerPage($request));
        $notes     = $paginator->getCollection();

        return fractal($notes, new NoteTransformer)
            ->paginateWith(new IlluminatePaginatorAdapter($paginator))
            ->toArray();
    }

    /**
     * @param CreateRequest $request
     *
     * @return array
     */
    public function store(CreateRequest $request)
    {
        $note = Note::create($request->only(['title', 'content']));

        return fractal($note, new NoteTransformer)->toArray();
    }

    /**
     * @param UpdateRequest $request
     * @param Note          $note
     *
     * @return array
     */
    public function update(UpdateRequest $request, Note $note)
    {
        $note->title = $request->get('title');
        $note->content = $request->get('content');
        $note->save();

        return fractal($note, new NoteTransformer)->toArray();
    }

    public function destroy(Note $note)
    {
        $note->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @param Request $request
     *
     * @return int
     */
    protected function getPerPage(Request $request): int
    {
        $default = env('PAGINATION_PER_PAGE', 10);
        $perPage = $request->query(
            'limit',
            $request->query(
                'perPage',
                $request->query(
                    'per_page',
                    $default
                )
            )
        );

        if (0 >= (int)$perPage) {
            $perPage = $default;
        }

        return $perPage;
    }
}
