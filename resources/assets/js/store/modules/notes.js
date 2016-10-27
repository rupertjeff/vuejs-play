import * as types from '../types/notes';
import {hasLocalStorage} from '../plugins/localStorage';

export const STORAGE_KEY = 'vuex-notes';

const notes = hasLocalStorage() ?
    JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') :
    [];

let activeNote = {};
if (0 < notes.length) {
    activeNote = notes[0];
}

const state = {
    notes,
    activeNote
};

const getters = {
    // get all notes
    notes (state) {
        return state.notes;
    },
    // get active note
    activeNote (state) {
        return state.activeNote;
    }
};

export const mutations = {
    [types.LOAD] (state, notes) {
        state.notes = notes;
        state.activeNote = state.notes[0];
    },
    [types.CLEAR] (state) {
        state.notes = [];
    },
    [types.CREATE] (state) {
        state.activeNote = {
            content: '',
            title: 'New Note'
        };
        state.notes.push(state.activeNote);
    },
    [types.EDIT_TITLE] (state, title) {
        state.activeNote.title = title;
    },
    [types.EDIT_CONTENT] (state, content) {
        state.activeNote.content = content;
    },
    [types.SET_ACTIVE] (state, note) {
        state.activeNote = note;
    },
    [types.DELETE] (state) {
        state.notes = state.notes.filter((note) => note != state.activeNote);
        state.activeNote = state.notes[0];
    }
};

export const actions = {
    loadNotes ({ commit }, notes) {
        commit(types.LOAD, notes);
    },
    clearNotes ({ commit }) {
        commit(types.CLEAR);
    },
    createNote ({ commit }) {
        commit(types.CREATE);
    },
    editNoteTitle ({ commit }, e) {
        commit(types.EDIT_TITLE, e.target.value);
    },
    editNoteContent ({ commit }, e) {
        commit(types.EDIT_CONTENT, e.target.value);
    },
    openNote ({ commit }, note) {
        commit(types.SET_ACTIVE, note);
    },
    deleteNote ({ commit }) {
        commit(types.DELETE);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
