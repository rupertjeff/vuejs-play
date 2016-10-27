<?php

use App\Models\Note;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\Response as Statuses;

/**
 * Class NotesTest
 */
class NotesTest extends AcceptanceTestCase
{
    use DatabaseMigrations;

    /**
     * @test
     */
    public function it_loads_notes()
    {
        /** @var \Illuminate\Database\Eloquent\Collection $notes */
        $notes = factory(Note::class, 4)->create()->map(function (Note $note) {
            return [
                'title'   => $note->title,
                'content' => $note->content,
            ];
        });

        $this->json('GET', route('api.notes.load'))
            ->assertResponseOk()
            ->seeJson([
                'data' => $notes->toArray(),
            ]);

        $this->json('GET', route('api.notes.load', [
            'limit' => 'badlimit',
        ]))->assertResponseOk()
            ->seeJson([
            'data' => $notes->toArray(),
        ]);

        $filteredNotes = $notes->slice(0, 2)->values();
        $this->json('GET', route('api.notes.load', [
            'limit' => 2,
        ]))->assertResponseOk()
            ->seeJson([
            'data' => $filteredNotes->toArray(),
        ]);

        $this->json('GET', route('api.notes.load', [
            'perPage' => 2,
        ]))->assertResponseOk()
            ->seeJson([
            'data' => $filteredNotes->toArray(),
        ]);

        $this->json('GET', route('api.notes.load', [
            'per_page' => 2,
        ]))->assertResponseOk()
            ->seeJson([
            'data' => $filteredNotes->toArray(),
        ]);

        $this->json('GET', route('api.notes.load', [
            'limit' => 2,
            'page'  => -3,
        ]))->assertResponseOk()
            ->seeJson([
            'data' => $filteredNotes->toArray(),
        ]);

        $this->json('GET', route('api.notes.load', [
            'limit' => 2,
            'page'  => 'badpage',
        ]))->assertResponseOk()
            ->seeJson([
            'data' => $filteredNotes->toArray(),
        ]);

        $filteredNotes = $notes->slice(1, 1)->values();
        $this->json('GET', route('api.notes.load', [
            'page'  => 2,
            'limit' => 1,
        ]))->assertResponseOk()
            ->seeJson([
            'data' => $filteredNotes->toArray(),
        ]);
    }

    /**
     * @test
     */
    public function it_creates_notes()
    {
        $noteData = factory(Note::class)->make()->toArray();
        $this->json('POST', route('api.notes.store'), $noteData)
            ->assertResponseOk()
            ->seeJson([
                'data' => $noteData,
            ])->seeInDatabase('notes', $noteData);

        $badNote = [
            'content' => $noteData['content'],
        ];
        $this->json('POST', route('api.notes.store'), $badNote)
            ->assertResponseStatus(Statuses::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @test
     */
    public function it_updates_a_note()
    {
        $note = factory(Note::class)->create();

        $newNoteData = [
            'title' => 'New Title',
            'content' => 'Note Content',
        ];
        $this->json('PUT', route('api.notes.update', [$note]), $newNoteData)
            ->assertResponseOk()
            ->seeJson([
                'data' => $newNoteData,
            ])->seeInDatabase('notes', $newNoteData);

        $badNoteData = [
            'title' => '',
            'content' => 'Note Content',
        ];
        $this->json('PUT', route('api.notes.update', [$note]), $badNoteData)
            ->assertResponseStatus(Statuses::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @test
     */
    public function it_deletes_a_note()
    {
        $note = factory(Note::class)->create();

        $this->json('DELETE', route('api.notes.destroy', [$note]))
            ->assertResponseStatus(Statuses::HTTP_NO_CONTENT);

        $this->json('DELETE', route('api.notes.destroy', 5))
            ->assertResponseStatus(Statuses::HTTP_NOT_FOUND);
    }
}
