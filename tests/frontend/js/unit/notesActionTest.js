import test from 'ava';
import {actions} from '../../../resources/assets/js/store/modules/notes';
import * as types from '../../../resources/assets/js/store/types/notes';
import {testAction, getDefaultState, makeNotes} from './_helpers';

// quick destructuring for easy access
const {
    loadNotes,
    clearNotes,
    createNote,
    editNoteTitle,
    editNoteContent,
    deleteNote
} = actions;

test('load notes', t => {
    testAction(t, loadNotes, [], getDefaultState(0), [{
        type: types.LOAD,
        payload: makeNotes(3)
    }]);
});

test('clear notes', t => {
    testAction(t, clearNotes, [], getDefaultState(3), [{
        type: types.CLEAR
    }]);
});

test('create new note', t => {
    testAction(t, createNote, [], getDefaultState(3), [{
        type: types.CREATE
    }]);
});

test('edit note title', t => {
    testAction(t, editNoteTitle, [{target: {value: 'Changed'}}], getDefaultState(3), [{
        type: types.EDIT_TITLE,
        payload: 'Changed'
    }]);
});

test('edit note content', t => {
    testAction(t, editNoteContent, [{target: {value: 'Changed'}}], getDefaultState(3), [{
        type: types.EDIT_CONTENT,
        payload: 'Changed'
    }]);
});

test('delete note', t => {
    const state = getDefaultState(3);
    testAction(t, deleteNote, [state.notes[0]], getDefaultState(3), [{
        type: types.DELETE,
        payload: state.notes[0]
    }]);
});

