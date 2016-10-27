import test from 'ava';
import {mutations} from '../../../resources/assets/js/store/modules/notes';
import * as types from '../../../resources/assets/js/store/types/notes';
import {getDefaultState,makeNotes} from './_helpers';

// quick destructuring for easy access
const loadNotes = mutations[types.LOAD];
const clearNotes = mutations[types.CLEAR];
const createNote = mutations[types.CREATE];
const editNoteTitle = mutations[types.EDIT_TITLE];
const editNoteContent = mutations[types.EDIT_CONTENT];
const deleteNote = mutations[types.DELETE];
const setActiveNote = mutations[types.SET_ACTIVE];

test('load notes into state', t => {
    const state = getDefaultState(0);

    loadNotes(state, makeNotes(2));

    t.is(state.notes.length, 2);
    t.is(state.activeNote.title, 'New Note1');
    t.is(state.activeNote.content, 'Some Content');
});

test('clear notes from state', t => {
    const state = getDefaultState(4);

    t.is(state.notes.length, 4);

    clearNotes(state);

    t.is(state.notes.length, 0);
});

test('set note as active', t => {
    const state = getDefaultState(3);

    t.is(state.notes.length, 3);
    t.deepEqual(state.activeNote, state.notes[0]);

    setActiveNote(state, state.notes[1]);

    t.deepEqual(state.activeNote, state.notes[1]);
});

test('create new note', t => {
    const state = getDefaultState(0);

    createNote(state);

    t.is(state.notes.length, 1);
    t.is(state.notes[0].title, 'New Note');
    t.deepEqual(state.activeNote, state.notes[0]);
});

test('edit note title', t => {
    const state = getDefaultState(0);

    createNote(state);

    t.is(state.activeNote.title, 'New Note');

    editNoteTitle(state, 'Changed');

    t.is(state.activeNote.title, 'Changed');
});

test('edit note content', t => {
    const state = getDefaultState(0);

    createNote(state);

    t.is(state.activeNote.content, '');

    editNoteContent(state, 'Changed');

    t.is(state.activeNote.content, 'Changed');
});

test('delete note', t => {
    const state = getDefaultState(0);

    createNote(state);

    t.is(state.activeNote.title, 'New Note');

    deleteNote(state);

    t.deepEqual(state.activeNote, undefined);

    loadNotes(state, makeNotes(4));

    t.is(state.activeNote.title, state.notes[0].title);

    editNoteTitle(state, 'Note to Delete');
    deleteNote(state);

    t.is(state.notes.length, 3);
    t.deepEqual(state.activeNote, state.notes[0]);
});
